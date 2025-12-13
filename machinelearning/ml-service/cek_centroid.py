import joblib
import numpy as np
import pandas as pd

# 1. LOAD MODEL
print("Memuat model...")
try:
    model = joblib.load('kmeans_model_final.joblib')
    scaler = joblib.load('scaler_final.joblib')
except:
    print("❌ File model tidak ditemukan. Pastikan ada di folder ini.")
    exit()

# 2. AMBIL CENTROID (PUSAT CLUSTER)
# Ini adalah "prototipe" siswa untuk setiap kelompok menurut mesin
centroids_scaled = model.cluster_centers_

# 3. KEMBALIKAN KE ANGKA ASLI (INVERSE TRANSFORM)
centroids_real = scaler.inverse_transform(centroids_scaled)

# 4. TAMPILKAN HASILNYA
features = ['Speed (Modul/Hari)', 'Consistency (StdDev)', 'Enroll (Log)', 'Time Ratio (Log)']
df_centers = pd.DataFrame(centroids_real, columns=features)

# Kembalikan Log ke angka asli agar mudah dibaca manusia
df_centers['Enroll (Asli)'] = np.expm1(df_centers['Enroll (Log)']).round(1)
df_centers['Time Ratio (Asli)'] = np.expm1(df_centers['Time Ratio (Log)']).round(2)

# Rapikan tabel
df_final_view = df_centers[['Speed (Modul/Hari)', 'Consistency (StdDev)', 'Enroll (Asli)', 'Time Ratio (Asli)']]
df_final_view.index.name = "Cluster ID"

print("\n=== ISI OTAK MODEL KAMU (CENTROIDS) ===")
print(df_final_view.to_string())
print("\n" + "="*40)
print("Panduan Analisis:")
print("1. Cluster dengan 'Time Ratio' TINGGI (> 5.0)  -> REFLECTIVE")
print("2. Cluster dengan 'Speed' TERTINGGI             -> FAST")
print("3. Cluster SISANYA (Speed sedang, Std Kecil)  -> CONSISTENT")