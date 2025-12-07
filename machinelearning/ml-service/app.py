from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)

# LOAD MODEL & SCALER

print("Sedang memuat model...")
try:
    # Load model dan scaler yang sudah kamu export
    model = joblib.load('ml-service\kmeans_model_final.joblib')

    scaler = joblib.load('ml-service\scaler_final.joblib')
    
    print("✅ Model & Scaler berhasil dimuat!")
except Exception as e:
    print(f"❌ Error memuat file joblib: {e}")
    print("Pastikan file .joblib ada di folder yang sama dengan app.py")


# DEFINISI LABEL 

LABEL_MAPPING = {
    0: 'Fast Learner',        # Speed tertinggi (38.6)
    1: 'Reflective Learner',  # Enroll & Time Ratio tertinggi
    2: 'Consistent Learner'   # Consistency (StdDev) terendah (1.05)
}

@app.route('/', methods=['GET'])
def home():
    return "ML Service is Running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Ambil data JSON yang dikirim oleh Express/Postman
        data = request.json
        
        required_fields = ['avg_modules_per_day', 'consistency_std_dev', 'enrolling_times', 'time_ratio']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Field {field} is missing'}), 400

        # Ambil nilai raw
        avg_modules = float(data['avg_modules_per_day'])
        consistency = float(data['consistency_std_dev'])
        enrolling = float(data['enrolling_times'])
        time_ratio = float(data['time_ratio'])

        
        # 3. PRE-PROCESSING (SAMA DENGAN SAAT TRAINING)
        
        enrolling_log = np.log1p(enrolling)
        time_ratio_log = np.log1p(time_ratio)

        # Susun array fitur (Urutan harus: Avg, Std, Enroll_Log, Time_Log)
        # Bentuknya harus 2D array [[...]]
        features_raw = np.array([[avg_modules, consistency, enrolling_log, time_ratio_log]])

        # Scaling
        features_scaled = scaler.transform(features_raw)

        # 4. PREDIKSI
        cluster_id = model.predict(features_scaled)[0]
        prediction_label = LABEL_MAPPING[int(cluster_id)]

        # Kembalikan hasil ke Express
        return jsonify({
            'status': 'success',
            'input_data': data,
            'result': {
                'cluster_id': int(cluster_id),
                'learning_style': prediction_label
            }
        })

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    # Jalankan server di port 5000
    app.run(port=5000, debug=True)