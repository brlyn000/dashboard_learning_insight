# 🚀 PANDUAN DEPLOY LENGKAP

## 📋 OVERVIEW
- **Frontend**: Vercel
- **Backend**: Vercel
- **ML Service**: Railway
- **Database**: Supabase

---

## 1️⃣ DEPLOY ML SERVICE (Railway)

### A. Persiapan
```bash
cd ml-service
# Pastikan semua file ada:
# - Dockerfile
# - requirements.txt
# - railway.json
# - app/main.py
```

### B. Deploy ke Railway
1. **Login Railway**: https://railway.app
2. **New Project** → Deploy from GitHub repo
3. **Select repository**: `dashboard_learning_insight`
4. **Root directory**: `/ml-service`
5. **Add variables** (Settings → Variables):
   ```
   PORT=8000
   ENVIRONMENT=production
   ```
6. **Deploy** → Tunggu build selesai (5-10 menit)
7. **Copy URL**: Contoh: `https://ml-service-production.up.railway.app`

### C. Test ML Service
```bash
curl https://your-ml-service.railway.app/health
# Expected: {"status": "healthy"}
```

---

## 2️⃣ SETUP DATABASE (Supabase)

### A. Run SQL Script
1. **Login Supabase**: https://supabase.com
2. **Pilih project** Anda
3. **SQL Editor** (sidebar kiri)
4. **Copy isi file**: `backend/setup-database.sql`
5. **Paste** ke editor
6. **Run** (Ctrl+Enter)
7. **Verify**: Cek Tables di Database → Tables

### B. Get Connection String
1. **Settings** → Database
2. **Connection string** → URI
3. **Copy** URL (ganti [YOUR-PASSWORD] dengan: `NexalarDB@123`)

---

## 3️⃣ DEPLOY BACKEND (Vercel)

### A. Environment Variables
1. **Login Vercel**: https://vercel.com
2. **Pilih project backend**: `dashboard-learning-insight-kyzb`
3. **Settings** → Environment Variables
4. **Add variables**:

```env
DATABASE_URL=postgresql://postgres.irmmkclzprcedtueekzd:NexalarDB%40123@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres?schema=public&pgbouncer=true

DIRECT_URL=postgresql://postgres.irmmkclzprcedtueekzd:NexalarDB%40123@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres

JWT_SECRET=123QWEasd

JWT_REFRESH_SECRET=asdQWE123

NODE_ENV=production

ML_SERVICE_URL=https://your-ml-service.railway.app

FRONTEND_URL=https://dashboard-learning-insight.vercel.app
```

5. **Save** semua variables

### B. Redeploy
1. **Deployments** tab
2. **Latest deployment** → **...** → **Redeploy**
3. **Tunggu** deploy selesai (2-3 menit)

### C. Test Backend
```bash
# Health check
curl https://dashboard-learning-insight-kyzb.vercel.app/health

# Login test
curl -X POST https://dashboard-learning-insight-kyzb.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"bujang@nexalar.com","password":"123"}'
```

---

## 4️⃣ DEPLOY FRONTEND (Vercel)

### A. Environment Variables
1. **Pilih project frontend**: `dashboard-learning-insight`
2. **Settings** → Environment Variables
3. **Add variable**:

```env
VITE_API_BASE_URL=https://dashboard-learning-insight-kyzb.vercel.app/api
```

4. **Save**

### B. Redeploy
1. **Deployments** tab
2. **Latest deployment** → **...** → **Redeploy**
3. **Tunggu** deploy selesai (2-3 menit)

---

## 5️⃣ VERIFIKASI KONEKSI

### Test Flow Lengkap:
```bash
# 1. Test ML Service
curl https://your-ml-service.railway.app/health

# 2. Test Backend
curl https://dashboard-learning-insight-kyzb.vercel.app/health

# 3. Test Backend → Database
curl https://dashboard-learning-insight-kyzb.vercel.app/api/dashboard/Bujang

# 4. Test Backend → ML Service
curl -X POST https://dashboard-learning-insight-kyzb.vercel.app/api/ml/insights \
  -H "Content-Type: application/json" \
  -d '{"userId":"9c613fdf-c1fd-4345-b35e-6da2fc398faa"}'
```

### Test di Browser:
1. **Buka**: https://dashboard-learning-insight.vercel.app
2. **Login**: `bujang@nexalar.com` / `123`
3. **Cek Dashboard**: Data harus load dari database
4. **Cek My Courses**: Courses harus muncul
5. **Cek Notifications**: Notifications harus ada

---

## 🔗 DIAGRAM KONEKSI

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│    Frontend     │ (Vercel)
│  React + Vite   │
└────────┬────────┘
         │ API Calls
         ▼
┌─────────────────┐
│     Backend     │ (Vercel)
│  Node + Express │
└────┬───────┬────┘
     │       │
     │       └──────────┐
     ▼                  ▼
┌──────────┐    ┌──────────────┐
│ Database │    │  ML Service  │
│ Supabase │    │   Railway    │
└──────────┘    └──────────────┘
```

---

## 📝 CHECKLIST DEPLOY

### ML Service (Railway):
- [ ] Repository connected
- [ ] Root directory set to `/ml-service`
- [ ] Environment variables set
- [ ] Build successful
- [ ] Health endpoint working
- [ ] URL copied

### Database (Supabase):
- [ ] SQL script executed
- [ ] Tables created (12 tables)
- [ ] Sample data inserted
- [ ] Connection string copied

### Backend (Vercel):
- [ ] All environment variables set (7 variables)
- [ ] ML_SERVICE_URL points to Railway
- [ ] DATABASE_URL points to Supabase
- [ ] Redeployed
- [ ] Health endpoint working
- [ ] Login endpoint working

### Frontend (Vercel):
- [ ] VITE_API_BASE_URL set
- [ ] Redeployed
- [ ] Can access login page
- [ ] Can login successfully
- [ ] Dashboard loads data

---

## 🐛 TROUBLESHOOTING

### Frontend tidak bisa login:
```bash
# Cek CORS di backend
# Pastikan FRONTEND_URL di backend env vars benar
```

### Backend error 500:
```bash
# Cek DATABASE_URL
# Test koneksi: node backend/test-supabase.js
```

### ML Service tidak tersambung:
```bash
# Cek ML_SERVICE_URL di backend
# Test: curl https://your-ml-service.railway.app/health
```

### Data tidak muncul:
```bash
# Cek apakah SQL script sudah dijalankan
# Verify di Supabase: Table Editor → users
```

---

## ✅ SELESAI!

Setelah semua langkah di atas, aplikasi Anda akan:
- ✅ Frontend bisa diakses
- ✅ Login berfungsi
- ✅ Dashboard load data real dari database
- ✅ ML features berfungsi (persona, insights, notifications)
- ✅ Courses tampil
- ✅ Semua fitur terintegrasi

**URL Production:**
- Frontend: https://dashboard-learning-insight.vercel.app
- Backend: https://dashboard-learning-insight-kyzb.vercel.app
- ML Service: https://your-ml-service.railway.app
