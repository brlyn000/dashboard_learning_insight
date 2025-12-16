# Troubleshooting: Time Spent Learning Chart Kosong

## 🔍 Masalah
Diagram "Time Spent Learning" tidak menampilkan data meskipun ada data di database.

## 🎯 Penyebab Umum

### 1. **Data Pomodoro Sessions Kosong**
Chart ini mengambil data dari tabel `pomodoro_sessions` untuk minggu berjalan (Monday - Sunday).

**Cek data di database:**
```sql
-- Cek apakah ada pomodoro sessions
SELECT * FROM pomodoro_sessions 
WHERE user_id = 1 
ORDER BY completed_at DESC 
LIMIT 10;

-- Cek data minggu ini
SELECT 
  DATE(completed_at) as date,
  SUM(duration_minutes) as total_minutes
FROM pomodoro_sessions 
WHERE user_id = 1 
  AND completed_at >= DATE_TRUNC('week', CURRENT_DATE)
GROUP BY DATE(completed_at);
```

### 2. **Data Belum Di-seed**
Jika database baru atau belum ada data pomodoro sessions.

**Solusi: Seed data**
```bash
cd backend
npm run seed
# atau
npm run reset  # Reset dan seed ulang
```

### 3. **Week Calculation Issue**
Backend menghitung minggu dari Monday (hari ke-1) sampai Sunday (hari ke-0).

**Cek di backend console:**
```
Pomodoro sessions found: 0  # <- Jika 0, berarti tidak ada data
Daily minutes: [0, 0, 0, 0, 0, 0, 0]
TimeSpent chart data: [...]
```

## ✅ Solusi

### Solusi 1: Seed Database dengan Data Sample
```bash
cd backend
npm run reset
```

### Solusi 2: Tambah Data Manual via Prisma Studio
```bash
cd backend
npm run studio
```

Kemudian tambahkan data di tabel `pomodoro_sessions`:
- `user_id`: ID user yang login
- `duration_minutes`: 25 (atau durasi lain)
- `completed_at`: Tanggal dalam minggu ini
- `session_type`: 'focus'

### Solusi 3: Gunakan Pomodoro Timer di Aplikasi
1. Login ke aplikasi
2. Gunakan Pomodoro Timer di dashboard
3. Selesaikan beberapa sesi
4. Data akan otomatis tersimpan dan muncul di chart

## 🔧 Debug Steps

### 1. Cek Console Browser (Frontend)
Buka Developer Tools → Console, cari:
```
Raw userData from API: {...}
Charts data from API: {...}
TimeSpent data: [...]
TimeSpentChart received data: [...]
```

### 2. Cek Console Backend
Lihat terminal backend, cari:
```
Fetching dashboard for user: Bujang
User found: Bujang ID: 1
Pomodoro sessions found: X
Daily minutes: [...]
TimeSpent chart data: [...]
```

### 3. Cek Network Tab
- Buka Developer Tools → Network
- Refresh halaman dashboard
- Cari request ke `/api/dashboard/:username`
- Lihat Response → `user.charts.timeSpent`

## 📊 Format Data yang Benar

Backend mengirim data dalam format:
```json
{
  "success": true,
  "user": {
    "charts": {
      "timeSpent": [
        { "name": "M", "fullName": "Monday", "hours": 2.5 },
        { "name": "T", "fullName": "Tuesday", "hours": 3.0 },
        { "name": "W", "fullName": "Wednesday", "hours": 1.5 },
        { "name": "T", "fullName": "Thursday", "hours": 4.0 },
        { "name": "F", "fullName": "Friday", "hours": 2.0 },
        { "name": "S", "fullName": "Saturday", "hours": 0.5 },
        { "name": "S", "fullName": "Sunday", "hours": 1.0 }
      ]
    }
  }
}
```

## 🎨 Fallback UI
Jika data kosong, chart akan menampilkan:
- Icon bar chart abu-abu
- Pesan: "No learning data available"
- Sub-pesan: "Start learning to see your progress"

## 📝 Catatan Penting

1. **Week Start**: Minggu dimulai dari Monday (bukan Sunday)
2. **Timezone**: Pastikan timezone server dan database sama
3. **Data Range**: Hanya data minggu berjalan yang ditampilkan
4. **Minimum Data**: Minimal 1 pomodoro session untuk muncul di chart

## 🚀 Quick Fix

Jika ingin langsung melihat data tanpa menunggu:

```bash
# 1. Reset database dengan seed data
cd backend
npm run reset

# 2. Restart backend
npm run dev

# 3. Refresh browser
# Data sample akan muncul di chart
```

## 📞 Masih Bermasalah?

Jika setelah seed data masih kosong:
1. Cek console browser untuk error
2. Cek console backend untuk error
3. Pastikan user yang login ada di database
4. Pastikan API endpoint `/api/dashboard/:username` berjalan
5. Cek Network tab untuk melihat response API
