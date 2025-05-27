from flask import Flask, jsonify, render_template, request
import pickle
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from transformers import AutoTokenizer, TFBertModel
import re
import nltk
import logging
from functools import lru_cache
import traceback
from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Cache untuk mapping files
@lru_cache(maxsize=None)
def load_mapping_files():
    try:
        with open('Mapping/klasifikasi_perkara_mapping.pkl', 'rb') as f:
            klasifikasi_perkara_mapping = pickle.load(f)
        with open('Mapping/penuntut_umum_mapping.pkl', 'rb') as f:
            penuntut_umum_mapping = pickle.load(f)
        with open('Mapping/hakim_mapping.pkl', 'rb') as f:
            hakim_mapping = pickle.load(f)
        with open('Mapping/pasal_mapping.pkl', 'rb') as f:
            pasal_mapping = pickle.load(f)
        
        return {
            "klasifikasi_perkara_mapping": klasifikasi_perkara_mapping,
            "hakim_mapping": hakim_mapping,
            "penuntut_umum_mapping": penuntut_umum_mapping,
            "pasal_mapping": pasal_mapping
        }
    
    except Exception as e:
        logger.error(f"Error loading mapping files: {str(e)}")
        raise

class MCDropout(tf.keras.layers.Dropout):
    def call(self, inputs, training=None):
        return super().call(inputs, training=True)
    
def apply_mc_dropout(model):
    def convert_layer(layer):
        if isinstance(layer, tf.keras.layers.Dropout):
            config = layer.get_config()
            return MCDropout.from_config(config)
        return layer

    new_model = tf.keras.models.clone_model(model, clone_function=convert_layer)
    new_model.set_weights(model.get_weights())
    return new_model

def init_lstm():
    stopword_factory = StopWordRemoverFactory()
    stop_words = set(stopword_factory.get_stop_words())

    lstm_model_scenario_name = "BiLSTM_12"
    lstm_model_save_path = f'Model/{lstm_model_scenario_name}'
    tokenizer_save_path = f'Model/{lstm_model_scenario_name}_tokenizer.pkl'
    lstm_max_len = 1024
    
    # Load model
    lstm_model = tf.keras.models.load_model(lstm_model_save_path)
    
    with open(tokenizer_save_path, 'rb') as handle:
        lstm_tokenizer = pickle.load(handle)
    
    return lstm_model, lstm_tokenizer, lstm_max_len, stop_words

# Inisialisasi model saat startup
lstm_model, lstm_tokenizer, lstm_max_len, stop_words = init_lstm()
mc_model = apply_mc_dropout(lstm_model)


def clean_text(text):
    text = re.sub(r'[^A-Za-z0-9\s\(\)]', '', text)
    cleaned_text = re.sub(r'\s+', ' ', text).strip()

    return cleaned_text

def lstm_text_preprocessing(text, stop_words):
    # Normalisasi Teks
    text = text.lower()

    # Stopword Removal
    words = text.split()
    text = ' '.join([word for word in words if word not in stop_words])

    return text

@tf.function
def lstm_predict(text_tensor, numerical_tensor, model):
    return model([text_tensor, numerical_tensor], training=False)

def mc_dropout_prediction(model, x_input, n_iter=100, z=3.470):
    preds = [model(x_input, training=False).numpy() for _ in range(n_iter)]
    preds = np.array(preds)
    
    mean = np.mean(preds, axis=0).squeeze()
    std = np.std(preds, axis=0).squeeze()
    
    ci_lower = mean - z * std
    ci_upper = mean + z * std
    return (ci_lower, ci_upper)

def lstm_inference(inference_numerical_tensor, inference_text, tokenizer=lstm_tokenizer, model=lstm_model, max_len=lstm_max_len, mc_model=mc_model):
    new_sequences = tokenizer.texts_to_sequences([inference_text])
    inference_text_padded = tf.keras.preprocessing.sequence.pad_sequences(
        new_sequences, maxlen=max_len, padding='post', truncating='post'
    )
    
    print(f'Predicting Result...')
    predictions = lstm_predict(inference_text_padded, inference_numerical_tensor, model)
    
    # x_text = np.expand_dims(inference_text_padded, axis=0)
    # x_numerical = np.expand_dims(inference_numerical_tensor, axis=0)
    x = [inference_text_padded, inference_numerical_tensor]
    print(f'Predicting Confidence Interval...')
    ci = mc_dropout_prediction(mc_model, x)
    print(f'Bi-LSTM Prediction : {predictions[0][0]}')
    print(f'Confidence Interval (80%) : {ci}')
    
    return float(predictions[0][0]), ci

@app.route('/data')
def data():
    try:
        response_data = load_mapping_files()
        return jsonify(response_data)
    except Exception as e:
        logger.error(f"Error in /data endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print(data)
        
        try:
            klasifikasi_perkara_encoded = int(data.get('klasifikasiPerkara'))
            penuntut_umum_encoded = int(data.get('penuntutUmum'))
            hakim_encoded = int(data.get('hakim'))
            jumlah_saksi = int(data.get('jumlahSaksi'))
            maks_penjara_berdasarkan_pasal = int(data.get('pasal'))
        except (ValueError, TypeError) as e:
            return jsonify({"error": f"Invalid input: {str(e)}"}), 400
        
        terdakwa = data.get('terdakwa')
        dakwaan = data.get('dakwaan')
        
        if not terdakwa or not dakwaan:
            return jsonify({"error": "Missing terdakwa or dakwaan"}), 400
        
        print(klasifikasi_perkara_encoded, penuntut_umum_encoded, hakim_encoded, jumlah_saksi, maks_penjara_berdasarkan_pasal, flush=True)
        
        # Buat numerical tensor
        inference_numerical_tensor = tf.constant(
            [[klasifikasi_perkara_encoded, penuntut_umum_encoded, hakim_encoded, jumlah_saksi, maks_penjara_berdasarkan_pasal]], 
            dtype=tf.float32
        )
        
        # Text preprocessing
        text_data = f"{terdakwa}. {dakwaan}"
        text_data = clean_text(text_data)
        text_data_lstm = lstm_text_preprocessing(text_data, stop_words)
        
        # Predictions
        lstm_prediction, ci = lstm_inference(inference_numerical_tensor, text_data_lstm)
        # print(predictions)

        return jsonify(lstm_prediction, ci)
    
    except Exception as e:
        print(e)
        logger.error(f"Error in prediction: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=False, threaded=True)