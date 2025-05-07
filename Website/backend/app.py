from flask import Flask, jsonify, render_template, request
import pickle
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from transformers import AutoTokenizer, TFBertModel
import re
import nltk

app = Flask(__name__)
CORS(app)

def init_bert():
    bert_tokenizer = AutoTokenizer.from_pretrained("indolem/indobert-base-uncased")
    class BERTRegressor(tf.keras.Model):
        def __init__(self):
            super(BERTRegressor, self).__init__()
            self.bert = TFBertModel.from_pretrained("indolem/indobert-base-uncased", from_pt=True)
            for layer in self.bert.layers:
                    layer.trainable = False

            # for i in range(12):
            #     layer = self.bert.bert.encoder.layer[i]
            #     layer.trainable = i >= 6
                
            self.regressor = tf.keras.layers.Dense(1)

        def call(self, inputs):
            input_ids = inputs['input_ids']
            attention_mask = inputs['attention_mask']
            numerical_features = inputs['numerical_feature']

            bert_output = self.bert(input_ids=input_ids, attention_mask=attention_mask)
            pooled_output = bert_output.pooler_output
            combined_output = tf.concat([pooled_output, numerical_features], axis=1)

            return self.regressor(combined_output)

    bert_model_scenario_name = "indolem_indobert-base-uncased_FineTuning_TransferLearning_LogTransform_TargetOnly"
    bert_model_save_path = f'Model/{bert_model_scenario_name}'

    bert_model = tf.keras.models.load_model(bert_model_save_path, custom_objects={'BERTRegressor': BERTRegressor})

    return bert_model, bert_tokenizer

def init_lstm():
    nltk.download('stopwords')
    stemmer = nltk.stem.PorterStemmer()

    lstm_model_scenario_name = "LSTM_12"
    lstm_model_save_path = f'Model/{lstm_model_scenario_name}'
    tokenizer_save_path = f'Model/{lstm_model_scenario_name}_tokenizer.pkl'
    lstm_max_len = 1600

    lstm_model = tf.keras.models.load_model(lstm_model_save_path)

    with open(tokenizer_save_path, 'rb') as handle:
        lstm_tokenizer = pickle.load(handle)

    return lstm_model, lstm_tokenizer, stemmer, lstm_max_len

bert_model, bert_tokenizer = init_bert()
lstm_model, lstm_tokenizer, stemmer, lstm_max_len = init_lstm()

def clean_text(text):
    cleaned_text = re.sub(r'[^a-zA-Z0-9., /\\()\"\'\n-]+', '', text)
    cleaned_text = re.sub(r'-{2,}', '-', cleaned_text)
    cleaned_text = re.sub(r' +', ' ', cleaned_text)
    cleaned_text = re.sub(r'\n', '. ', cleaned_text)
    cleaned_text = re.sub(r' \.', '. ', cleaned_text)
    cleaned_text = re.sub(r'\s+', ' ', cleaned_text)
    cleaned_text = re.sub(r'\.{2,}', '.', cleaned_text)

    return cleaned_text

def lstm_text_preprocessing(text, stemmer):
    # Normalisasi Teks
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()

    # Stopword Removal
    stop_words = set(nltk.corpus.stopwords.words('indonesian'))
    text = ' '.join([word for word in text.split() if word not in stop_words])

    # Stemming
    text = ' '.join([stemmer.stem(word) for word in text.split()])

    return text

def bert_inference(inference_numerical_tensor, inference_text, tokenizer=bert_tokenizer, model=bert_model):
    inputs = tokenizer(inference_text, padding=True, truncation=True, return_tensors='tf', max_length=512)
    

    input_dict = {
        'input_ids': inputs['input_ids'],
        'attention_mask': inputs['attention_mask'],
        'numerical_feature': inference_numerical_tensor
    }

    predictions = model(input_dict)
    predictions_np = predictions.numpy()
    # print(predictions_np[0])

    pred_log = predictions_np[0].astype(float)  # Log transformation
    # print(pred_log)
    predictions = np.expm1(pred_log)
    # print(predictions)  

    return predictions[0]

def lstm_inference(inference_numerical_tensor, inference_text, tokenizer=lstm_tokenizer, model=lstm_model, max_len=lstm_max_len):
    new_sequences = tokenizer.texts_to_sequences([inference_text])
    inference_text = tf.keras.preprocessing.sequence.pad_sequences(new_sequences, maxlen=max_len, padding='post')

    predictions = model.predict([inference_text, inference_numerical_tensor])

    # pred_log = predictions[0].astype(float)  # Log transformation
    # predictions = np.expm1(pred_log)  

    return float(predictions[0][0])

@app.route('/data')
def data():
    try:
        with open('Mapping/klasifikasi_perkara_mapping.pkl', 'rb') as f:
            klasifikasi_perkara_mapping = pickle.load(f)

        with open('Mapping/penuntut_umum_mapping.pkl', 'rb') as f:
            penuntut_umum_mapping = pickle.load(f)

        with open('Mapping/hakim_mapping.pkl', 'rb') as f:
            hakim_mapping = pickle.load(f)

        with open('Mapping/pasal_mapping.pkl', 'rb') as f:
            pasal_mapping = pickle.load(f)

        response_data = {
            "klasifikasi_perkara_mapping": klasifikasi_perkara_mapping,
            "hakim_mapping": hakim_mapping,
            "penuntut_umum_mapping": penuntut_umum_mapping,
            "pasal_mapping": pasal_mapping
        }
        
        return jsonify(response_data)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print(data)

        klasifikasi_perkara_encoded = data.get('klasifikasiPerkara')
        penuntut_umum_encoded = data.get('penuntutUmum')
        hakim_encoded = data.get('hakim')
        jumlah_saksi = data.get('jumlahSaksi')
        # barang_bukti = data.get('barangBukti')
        terdakwa = data.get('terdakwa')
        maks_penjara_berdasarkan_pasal = data.get('pasal')
        dakwaan = data.get('dakwaan')

        klasifikasi_perkara_encoded = int(klasifikasi_perkara_encoded)
        penuntut_umum_encoded = int(penuntut_umum_encoded)
        hakim_encoded = int(hakim_encoded)
        jumlah_saksi = int(jumlah_saksi)
        maks_penjara_berdasarkan_pasal = int(maks_penjara_berdasarkan_pasal)

        print(klasifikasi_perkara_encoded, penuntut_umum_encoded, hakim_encoded, jumlah_saksi, maks_penjara_berdasarkan_pasal)

        inference_numerical_tensor = tf.constant([[klasifikasi_perkara_encoded, penuntut_umum_encoded, hakim_encoded, jumlah_saksi, maks_penjara_berdasarkan_pasal]], dtype=tf.float32)
        text_data = ". ".join([terdakwa, dakwaan])
        text_data = clean_text(text_data)

        text_data_lstm = lstm_text_preprocessing(text_data, stemmer)
        
        bert_prediction = bert_inference(inference_numerical_tensor, text_data)
        lstm_prediction = lstm_inference(inference_numerical_tensor, text_data_lstm)

        predictions = {
            "bert_prediction": float(bert_prediction),
            "lstm_prediction": lstm_prediction
        }

        print(predictions)

        return jsonify(predictions)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
