from flask import Flask, jsonify, render_template, request
import pickle
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from transformers import AutoTokenizer, TFBertModel

app = Flask(__name__)
CORS(app)

@app.route('/data')
def data():
    try:
        with open('Mapping/klasifikasi_perkara_mapping.pkl', 'rb') as f:
            klasifikasi_perkara_mapping = pickle.load(f)

        with open('Mapping/penuntut_umum_mapping.pkl', 'rb') as f:
            penuntut_umum_mapping = pickle.load(f)

        with open('Mapping/hakim_mapping.pkl', 'rb') as f:
            hakim_mapping = pickle.load(f)

        response_data = {
            "klasifikasi_perkara_mapping": klasifikasi_perkara_mapping,
            "hakim_mapping": hakim_mapping,
            "penuntut_umum_mapping": penuntut_umum_mapping
        }
        
        return jsonify(response_data)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def bert_inference(inference_numerical_tensor, inference_text):
    tokenizer = AutoTokenizer.from_pretrained("indolem/indobert-base-uncased")

    class BERTRegressor(tf.keras.Model):
        def __init__(self):
            super(BERTRegressor, self).__init__()
            self.bert = TFBertModel.from_pretrained("indolem/indobert-base-uncased", from_pt=True)
            for layer in self.bert.layers:
                layer.trainable = False
            self.regressor = tf.keras.layers.Dense(1)

        def call(self, inputs):
            input_ids = inputs['input_ids']
            attention_mask = inputs['attention_mask']
            numerical_features = inputs['numerical_feature']

            bert_output = self.bert(input_ids=input_ids, attention_mask=attention_mask)
            pooled_output = bert_output.pooler_output
            combined_output = tf.concat([pooled_output, numerical_features], axis=1)

            return self.regressor(combined_output)

    bert_model = tf.keras.models.load_model('Model/dummy_run_BERT', custom_objects={'BERTRegressor': BERTRegressor})
    inputs = tokenizer(inference_text, padding=True, truncation=True, return_tensors='tf', max_length=512)

    input_dict = {
        'input_ids': inputs['input_ids'],
        'attention_mask': inputs['attention_mask'],
        'numerical_feature': inference_numerical_tensor
    }

    predictions = bert_model(input_dict)
    predictions_np = predictions.numpy()

    return predictions_np[0][0]

def lstm_inference(inference_numerical_tensor, inference_text):
    lstm_model = tf.keras.models.load_model('Model/LSTM dummy run')

    with open('Model/LSTM tokenizer.pkl', 'rb') as handle:
        tokenizer = pickle.load(handle)

    new_sequences = tokenizer.texts_to_sequences([inference_text])  # Wrap in a list
    inference_text = tf.keras.preprocessing.sequence.pad_sequences(new_sequences, maxlen=800, padding='post')

    predictions = lstm_model.predict([inference_text, inference_numerical_tensor])

    return float(predictions[0][0])
    

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        klasifikasi_perkara_encoded = data.get('klasifikasiPerkara')
        penuntut_umum_encoded = data.get('penuntutUmum')
        hakim_encoded = data.get('hakim')
        jumlah_saksi = data.get('jumlahSaksi')
        barang_bukti = data.get('barangBukti')
        # pasal = data.get('pasal')
        dakwaan = data.get('dakwaan')

        klasifikasi_perkara_encoded = int(klasifikasi_perkara_encoded)
        penuntut_umum_encoded = int(penuntut_umum_encoded)
        hakim_encoded = int(hakim_encoded)
        jumlah_saksi = int(jumlah_saksi)

        inference_numerical_tensor = tf.constant([[klasifikasi_perkara_encoded, penuntut_umum_encoded, hakim_encoded, jumlah_saksi]], dtype=tf.float32)

        text_data = ". ".join([barang_bukti, dakwaan])
        bert_prediction = bert_inference(inference_numerical_tensor, text_data)
        lstm_prediction = lstm_inference(inference_numerical_tensor, text_data)

        predictions = {
            "bert_prediction": float(bert_prediction),
            "lstm_prediction": lstm_prediction
        }

        return jsonify(predictions)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
