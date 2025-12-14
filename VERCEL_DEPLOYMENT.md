# 🚀 Vercel Deployment Guide

## 📋 Deployment URLs

- **Frontend**: https://brlyn000-dashboardlearninginsight-e.vercel.app/
- **Backend**: https://brlyn000-dashboardlearninginsight.vercel.app
- **ML Service**: https://nexalar-machine-learning-production.up.railway.app/

---

## 🎨 Frontend Deployment

### 1. Push ke GitHub
```bash
cd frontend
git add .
git commit -m "Configure for Vercel deployment"
git push
```

### 2. Vercel Dashboard Setup
1. Login ke [Vercel](https://vercel.com)
2. Import project dari GitHub
3. Select `frontend` folder sebagai root directory
4. Framework Preset: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`

### 3. Environment Variables (Vercel Dashboard)
```
VITE_API_BASE_URL=https://brlyn000-dashboardlearninginsight.vercel.app/api
```

### 4. Deploy
- Klik **Deploy**
- Vercel akan auto-deploy setiap push ke main branch

---

## 🔧 Backend Deployment

### 1. Push ke GitHub
```bash
cd backend
git add .
git commit -m "Configure for Vercel deployment"
git push
```

### 2. Vercel Dashboard Setup
1. Import project dari GitHub
2. Select `backend` folder sebagai root directory
3. Framework Preset: **Other**
4. Build Command: (kosongkan)
5. Output Directory: (kosongkan)

### 3. Environment Variables (Vercel Dashboard)
```
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-production
DATABASE_URL=postgresql://username:password@host:port/database
DIRECT_URL=postgresql://username:password@host:port/database
ML_SERVICE_URL=https://nexalar-machine-learning-production.up.railway.app/
```

### 4. Deploy
- Klik **Deploy**
- Backend akan tersedia di: https://brlyn000-dashboardlearninginsight.vercel.app

---

## 🗄️ Database Setup (Railway/Supabase)

### Option 1: Railway PostgreSQL
1. Login ke [Railway](https://railway.app)
2. Create New Project → PostgreSQL
3. Copy connection string
4. Paste ke Vercel Environment Variables

### Option 2: Supabase PostgreSQL
1. Login ke [Supabase](https://supabase.com)
2. Create New Project
3. Go to Settings → Database
4. Copy connection string (Transaction & Session mode)
5. Paste ke Vercel Environment Variables

### Database Migration
```bash
# Local - push schema ke production database
cd backend
npx prisma db push

# Seed data (optional)
npx prisma db seed
```

---

## ✅ Verification Checklist

### Frontend
- [ ] Build berhasil di Vercel
- [ ] Environment variable `VITE_API_BASE_URL` sudah diset
- [ ] Bisa akses https://brlyn000-dashboardlearninginsight-e.vercel.app/
- [ ] Login page muncul dengan benar
- [ ] API calls ke backend berhasil (cek Network tab)

### Backend
- [ ] Deploy berhasil di Vercel
- [ ] Environment variables sudah diset semua
- [ ] Database connection berhasil
- [ ] Health check endpoint: https://brlyn000-dashboardlearninginsight.vercel.app/health
- [ ] CORS sudah dikonfigurasi untuk frontend URL

### Integration Test
```bash
# Test backend health
curl https://brlyn000-dashboardlearninginsight.vercel.app/health

# Test ML service health
curl https://nexalar-machine-learning-production.up.railway.app/health

# Test frontend (buka di browser)
https://brlyn000-dashboardlearninginsight-e.vercel.app/
```

---

## 🔧 Troubleshooting

### Frontend tidak bisa connect ke Backend
**Problem**: CORS error atau 404

**Solution**:
1. Cek `VITE_API_BASE_URL` di Vercel environment variables
2. Pastikan backend URL benar (tanpa trailing slash)
3. Redeploy frontend setelah update env variables

### Backend Error 500
**Problem**: Database connection failed

**Solution**:
1. Cek `DATABASE_URL` dan `DIRECT_URL` di Vercel
2. Pastikan database accessible dari internet
3. Test connection dengan Prisma Studio
4. Cek logs di Vercel Dashboard

### ML Service tidak respond
**Problem**: Timeout atau 503

**Solution**:
1. Cek ML service masih running di Railway
2. Test endpoint: `curl https://nexalar-machine-learning-production.up.railway.app/health`
3. Backend punya fallback, aplikasi tetap jalan tanpa ML

---

## 🔄 Auto Deployment

Vercel akan auto-deploy ketika:
- Push ke `main` branch (production)
- Push ke branch lain (preview deployment)

Disable auto-deploy:
- Vercel Dashboard → Settings → Git → Disable

---

## 📊 Monitoring

### Vercel Dashboard
- **Analytics**: Traffic, performance metrics
- **Logs**: Runtime logs, errors
- **Deployments**: History, rollback

### Check Logs
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# View logs
vercel logs [deployment-url]
```

---

## 🎯 Production Checklist

- [x] Frontend deployed ke Vercel
- [x] Backend deployed ke Vercel
- [x] ML Service deployed ke Railway
- [x] Database setup (Railway/Supabase)
- [x] Environment variables configured
- [x] CORS configured
- [x] API endpoints tested
- [x] Frontend-Backend integration tested
- [ ] Custom domain (optional)
- [ ] SSL certificate (auto by Vercel)

---

## 🔐 Security Notes

1. **Never commit `.env` files** - Use Vercel Environment Variables
2. **Use strong JWT secrets** in production
3. **Enable CORS whitelist** for production (already configured)
4. **Use HTTPS only** (Vercel provides by default)
5. **Rotate secrets regularly**

---

## 📝 Quick Commands

```bash
# Redeploy frontend
cd frontend
git add .
git commit -m "Update frontend"
git push

# Redeploy backend
cd backend
git add .
git commit -m "Update backend"
git push

# Database migration
cd backend
npx prisma db push

# View production logs
vercel logs --follow
```

---

**🎉 Deployment Complete!**

Your application is now live:
- Frontend: https://brlyn000-dashboardlearninginsight-e.vercel.app/
- Backend: https://brlyn000-dashboardlearninginsight.vercel.app
- ML Service: https://nexalar-machine-learning-production.up.railway.app/
