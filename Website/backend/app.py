from flask import Flask, jsonify
import pickle
from flask_cors import CORS  # ✅ Correct import

app = Flask(__name__)
CORS(app)  # ✅ Apply CORS properly

# Function to load pickle data
def load_pickle(file_path):
    with open(file_path, 'rb') as f:
        return pickle.load(f)

@app.route('/data')
def data():
    try:
        with open('Mapping/klasifikasi_perkara_mapping.pkl', 'rb') as f:
            klasifikasi_perkara_mapping = pickle.load(f)

        with open('Mapping/penuntut_umum_mapping.pkl', 'rb') as f:
            penuntut_umum_mapping = pickle.load(f)

        with open('Mapping/hakim_mapping.pkl', 'rb') as f:
            hakim_mapping = pickle.load(f)

        # Ensure data is JSON serializable
        response_data = {
            "klasifikasi_perkara_mapping": klasifikasi_perkara_mapping,
            "hakim_mapping": hakim_mapping,
            "penuntut_umum_mapping": penuntut_umum_mapping
        }
        
        return jsonify(response_data)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Return error if loading fails

@app.route('/predict', methods=['POST'])
def predict():
    return jsonify({"message": "PREDICT!"})

if __name__ == '__main__':
    app.run(debug=True)
