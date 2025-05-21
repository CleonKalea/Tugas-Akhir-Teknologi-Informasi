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

app = Flask(__name__)
CORS(app)

# Konfigurasi logging untuk error tracking yang lebih baik
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

# def init_bert():
#     bert_tokenizer = AutoTokenizer.from_pretrained("indolem/indobert-base-uncased")
    
#     class BERTRegressor(tf.keras.Model):
#         def __init__(self):
#             super(BERTRegressor, self).__init__()
#             self.bert = TFBertModel.from_pretrained("indolem/indobert-base-uncased", from_pt=True)
#             for layer in self.bert.layers:
#                 layer.trainable = False
#             self.regressor = tf.keras.layers.Dense(1)
        
#         def call(self, inputs):
#             input_ids = inputs['input_ids']
#             attention_mask = inputs['attention_mask']
#             numerical_features = inputs['numerical_feature']
#             bert_output = self.bert(input_ids=input_ids, attention_mask=attention_mask)
#             pooled_output = bert_output.pooler_output
#             combined_output = tf.concat([pooled_output, numerical_features], axis=1)
#             return self.regressor(combined_output)
    
#     bert_model_scenario_name = "indolem_indobert-base-uncased_TransferLearning"
#     bert_model_save_path = f'Model/{bert_model_scenario_name}'
#     bert_model = tf.keras.models.load_model(bert_model_save_path, custom_objects={'BERTRegressor': BERTRegressor})
#     return bert_model, bert_tokenizer

def init_lstm():
    try:
        nltk.data.find('corpora/stopwords')
    except LookupError:
        nltk.download('stopwords')
    
    stemmer = nltk.stem.PorterStemmer()
    lstm_model_scenario_name = "BiLSTM_13"
    lstm_model_save_path = f'Model/{lstm_model_scenario_name}'
    tokenizer_save_path = f'Model/{lstm_model_scenario_name}_tokenizer.pkl'
    lstm_max_len = 1024
    
    # Load model dengan optimasi
    lstm_model = tf.keras.models.load_model(lstm_model_save_path, compile=False)
    lstm_model.compile(optimizer='adam', loss='mse')  # Compile manual untuk performa lebih baik
    
    with open(tokenizer_save_path, 'rb') as handle:
        lstm_tokenizer = pickle.load(handle)
    
    return lstm_model, lstm_tokenizer, stemmer, lstm_max_len

# Inisialisasi model saat startup
# bert_model, bert_tokenizer = init_bert()
lstm_model, lstm_tokenizer, stemmer, lstm_max_len = init_lstm()

# Compile regex patterns sekali saja
CLEAN_TEXT_PATTERNS = {
    'alphanumeric': re.compile(r'[^a-zA-Z0-9., /\\()\"\'\n-]+'),
    'dashes': re.compile(r'-{2,}'),
    'spaces': re.compile(r' +'),
    'newlines': re.compile(r'\n'),
    'dots_space': re.compile(r' \.'),
    'whitespace': re.compile(r'\s+'),
    'dots': re.compile(r'\.{2,}')
}

LSTM_TEXT_PATTERNS = {
    'non_alpha': re.compile(r'[^a-z\s]'),
    'whitespace': re.compile(r'\s+')
}

# Cache untuk stopwords
STOP_WORDS = set(nltk.corpus.stopwords.words('indonesian'))

def clean_text(text):
    """Optimized text cleaning dengan compiled regex patterns"""
    cleaned_text = CLEAN_TEXT_PATTERNS['alphanumeric'].sub('', text)
    cleaned_text = CLEAN_TEXT_PATTERNS['dashes'].sub('-', cleaned_text)
    cleaned_text = CLEAN_TEXT_PATTERNS['spaces'].sub(' ', cleaned_text)
    cleaned_text = CLEAN_TEXT_PATTERNS['newlines'].sub('. ', cleaned_text)
    cleaned_text = CLEAN_TEXT_PATTERNS['dots_space'].sub('. ', cleaned_text)
    cleaned_text = CLEAN_TEXT_PATTERNS['whitespace'].sub(' ', cleaned_text)
    cleaned_text = CLEAN_TEXT_PATTERNS['dots'].sub('.', cleaned_text)
    return cleaned_text

def lstm_text_preprocessing(text, stemmer):
    """Optimized LSTM text preprocessing"""
    # Normalisasi Teks
    text = text.lower()
    text = LSTM_TEXT_PATTERNS['non_alpha'].sub('', text)
    text = LSTM_TEXT_PATTERNS['whitespace'].sub(' ', text).strip()
    
    # Stopword Removal - menggunakan list comprehension untuk performa lebih baik
    words = text.split()
    text = ' '.join([word for word in words if word not in STOP_WORDS])
    
    # Stemming - menggunakan list comprehension
    text = ' '.join([stemmer.stem(word) for word in text.split()])
    return text

@tf.function
def lstm_predict(text_tensor, numerical_tensor, model):
    """Optimized prediction dengan tf.function decorator"""
    return model([text_tensor, numerical_tensor], training=False)

# @tf.function
# def bert_predict(input_dict, model):
#     """Optimized BERT prediction dengan tf.function decorator"""
#     return model(input_dict, training=False)

# def bert_inference(inference_numerical_tensor, inference_text, tokenizer=bert_tokenizer, model=bert_model):
#     """Optimized BERT inference"""
#     inputs = tokenizer(inference_text, padding=True, truncation=True, return_tensors='tf', max_length=512)
    # 
    # input_dict = {
    #     'input_ids': inputs['input_ids'],
    #     'attention_mask': inputs['attention_mask'],
    #     'numerical_feature': inference_numerical_tensor
    # }
    
    # # Gunakan tf.function untuk prediksi
    # predictions = bert_predict(input_dict, model)
    # predictions_np = predictions.numpy()
    # pred_log = predictions_np[0].astype(float)
    # predictions = np.expm1(pred_log)
    # return float(predictions[0])

def lstm_inference(inference_numerical_tensor, inference_text, tokenizer=lstm_tokenizer, model=lstm_model, max_len=lstm_max_len):
    new_sequences = tokenizer.texts_to_sequences([inference_text])
    inference_text_padded = tf.keras.preprocessing.sequence.pad_sequences(
        new_sequences, maxlen=max_len, padding='post', truncating='post'
    )
    
    # Convert ke tensor untuk performa lebih baik
    text_tensor = tf.constant(inference_text_padded, dtype=tf.int32)
    
    # Gunakan tf.function untuk prediksi
    predictions = lstm_predict(text_tensor, inference_numerical_tensor, model)
    
    return float(predictions[0][0])

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
        
        # Parse input dengan error handling
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
        text_data_lstm = lstm_text_preprocessing(text_data, stemmer)
        
        # Predictions
        # bert_prediction = bert_inference(inference_numerical_tensor, text_data)
        lstm_prediction = lstm_inference(inference_numerical_tensor, text_data_lstm)
        
        predictions = {
            # "bert_prediction": bert_prediction,
            "lstm_prediction": lstm_prediction
        }
        
        print(predictions)
        
        return jsonify(lstm_prediction)
    
    except Exception as e:
        print(e)
        logger.error(f"Error in prediction: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=False, threaded=True)