import requests
import json

url = 'http://127.0.0.1:5000/predict'

test_cases = [
    {
        "nama_tes": "Skenario A (Si Pengebut - REVISI)",
        "data": { 
            "avg_modules_per_day": 45.0,   # Kita naikkan agar tembus ke Cluster 0
            "consistency_std_dev": 20.0,   # Kita buat agak fluktuatif (khas Fast Learner di model ini)
            "enrolling_times": 1, 
            "time_ratio": 0.4 
        },
        "harapan": "Fast Learner"
    },
    {
        "nama_tes": "Skenario B (Si Perenung)",
        "data": { 
            "avg_modules_per_day": 2.0,
            "consistency_std_dev": 15.0, 
            "enrolling_times": 40, 
            "time_ratio": 800.0
            },
        "harapan": "Reflective Learner"
    },
    {
        "nama_tes": "Skenario C (Si Stabil - REVISI)",
        "data": { 
            "avg_modules_per_day": 3.5,   # Kita turunkan biar gak ketukar sama Fast
            "consistency_std_dev": 0.1,   # Sangat stabil
            "enrolling_times": 5, 
            "time_ratio": 1.0 
        },
        "harapan": "Consistent Learner"
    }
]

print(f"Mencoba menghubungi {url}...\n")

for case in test_cases:
    print(f"🧪 Testing: {case['nama_tes']}")
    try:
        response = requests.post(url, json=case['data'])
        if response.status_code == 200:
            hasil = response.json()
            prediksi = hasil['result']['learning_style']
            cluster_id = hasil['result']['cluster_id']
            
            status = "✅ BENAR" if prediksi == case['harapan'] else "❌ SALAH"
            print(f"   --> Cluster ID: {cluster_id}")
            print(f"   --> Prediksi:   {prediksi} {status}")
        else:
            print("   ❌ Error Server:", response.text)
    except Exception as e:
        print(f"   ❌ Gagal konek: {e}")
    print("-" * 30)