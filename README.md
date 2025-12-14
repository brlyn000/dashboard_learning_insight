# Dashboard Learning Insight

Dashboard Learning Insight adalah aplikasi web yang mengintegrasikan machine learning untuk memberikan wawasan pembelajaran yang dipersonalisasi. Aplikasi ini terdiri dari tiga komponen utama: frontend React, backend Node.js, dan layanan machine learning Python.

## 🚀 Fitur Utama

- **Dashboard Pembelajaran**: Visualisasi progress dan statistik belajar
- **Pomodoro Timer**: Timer produktivitas dengan rekomendasi AI
- **Prediksi Persona**: Analisis pola belajar menggunakan machine learning
- **Notifikasi Cerdas**: Sistem notifikasi yang dipersonalisasi
- **Laporan Mingguan**: Insight pembelajaran berbasis data
- **Manajemen Kursus**: Tracking progress kursus dan materi

## 🏗️ Arsitektur Sistem

```
dashboard_learning_insight/
├── frontend/          # React + Vite + Tailwind CSS
├── backend/           # Node.js + Express + Prisma
├── ml-service/        # Python + FastAPI + Scikit-learn
└── README.md
```

## 📋 Prerequisites

Pastikan sistem Anda memiliki:

- **Node.js** (v18 atau lebih baru)
- **Python** (v3.8 atau lebih baru)
- **PostgreSQL** (v13 atau lebih baru)
- **npm** atau **yarn**
- **pip** (Python package manager)

## 🛠️ Instalasi dan Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd dashboard_learning_insight
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dengan konfigurasi database dan JWT secrets

# Setup database
npm run migrate
npm run seed

# Jalankan backend
npm run dev
```

**Konfigurasi Environment Backend (.env):**
```env
# JWT Secrets
JWT_SECRET=your-jwt-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
DIRECT_URL="postgresql://username:password@localhost:5432/database_name"

# Environment
NODE_ENV=development
PORT=5000

# ML Service
ML_SERVICE_URL=http://localhost:8000
```

### 3. Setup ML Service

```bash
cd ml-service

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env sesuai kebutuhan

# Jalankan ML service
python run.py
```

**Konfigurasi Environment ML Service (.env):**
```env
APP_NAME="Nexalar ML Service"
ENVIRONMENT="development"
HOST="0.0.0.0"
PORT=8000
API_KEY="your-api-key"
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:5173"
```

### 4. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Jalankan frontend
npm run dev
```

## 🚀 Menjalankan Aplikasi

### Development Mode

1. **Jalankan ML Service** (Terminal 1):
```bash
cd ml-service
python run.py
```

2. **Jalankan Backend** (Terminal 2):
```bash
cd backend
npm run dev
```

3. **Jalankan Frontend** (Terminal 3):
```bash
cd frontend
npm run dev
```

### Akses Aplikasi

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **ML Service**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/refresh` - Refresh token

### Dashboard
- `GET /api/dashboard/:username` - Data dashboard user

### Pomodoro
- `POST /api/pomodoro/session` - Simpan sesi pomodoro
- `PUT /api/pomodoro/preference/:userId` - Update preferensi
- `GET /api/pomodoro/history/:userId` - Riwayat sesi

### Courses
- `GET /api/courses/:userId` - Daftar kursus user
- `GET /api/courses/:courseId/detail` - Detail kursus

### Machine Learning
- `POST /api/ml/insights` - Generate insights
- `POST /api/ml/predict-persona/:userId` - Prediksi persona
- `POST /api/ml/pomodoro/:userId` - Rekomendasi pomodoro
- `GET /api/ml/health` - Health check ML service

### Notifications
- `GET /api/notifications/:userId` - Daftar notifikasi
- `DELETE /api/notifications/:notificationId` - Hapus notifikasi
- `PATCH /api/notifications/:notificationId/read` - Tandai dibaca

## 🗄️ Database Schema

Aplikasi menggunakan PostgreSQL dengan Prisma ORM. Schema utama meliputi:

- **Users**: Data pengguna dan autentikasi
- **Courses**: Informasi kursus dan progress
- **PomodoroSessions**: Riwayat sesi pomodoro
- **Notifications**: Sistem notifikasi
- **WeeklyReports**: Laporan mingguan

### Migrasi Database

```bash
cd backend

# Buat migrasi baru
npx prisma migrate dev --name migration_name

# Reset database
npm run reset

# Prisma Studio (GUI database)
npm run studio
```

## 🤖 Machine Learning Models

ML Service menggunakan beberapa model:

1. **Persona Prediction**: Klasifikasi pola belajar user
2. **Pomodoro Recommendation**: Rekomendasi durasi optimal
3. **Insight Generator**: Generate wawasan pembelajaran
4. **Notification Engine**: Personalisasi notifikasi

### Model Training

```bash
cd ml-service

# Recreate models (jika diperlukan)
python recreate_models.py
```

## 🔧 Scripts Tersedia

### Backend
```bash
npm run dev          # Development mode
npm run start        # Production mode
npm run migrate      # Jalankan migrasi database
npm run seed         # Seed database
npm run reset        # Reset dan seed database
npm run studio       # Buka Prisma Studio
```

### Frontend
```bash
npm run dev          # Development server
npm run build        # Build untuk production
npm run preview      # Preview build
npm run lint         # Linting code
```

### ML Service
```bash
python run.py        # Jalankan service
python recreate_models.py  # Recreate ML models
```

## 🔐 Keamanan

- JWT-based authentication dengan refresh tokens
- CORS configuration untuk cross-origin requests
- Input validation dan sanitization
- Environment variables untuk sensitive data
- API key protection untuk ML service

## 📱 Teknologi Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Routing
- **Recharts** - Data visualization
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Prisma** - ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### ML Service
- **Python** - Programming language
- **FastAPI** - Web framework
- **Scikit-learn** - Machine learning
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **XGBoost** - Gradient boosting

## 🚀 Deployment

Untuk deployment production, lihat file `DEPLOY_GUIDE.md` yang berisi panduan lengkap deployment ke berbagai platform.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Pastikan PostgreSQL berjalan
   - Periksa DATABASE_URL di .env
   - Jalankan migrasi: `npm run migrate`

2. **ML Service Not Responding**
   - Pastikan Python dependencies terinstall
   - Periksa port 8000 tidak digunakan aplikasi lain
   - Cek log error di terminal ML service

3. **Frontend Build Error**
   - Hapus node_modules dan install ulang
   - Pastikan Node.js versi kompatibel
   - Periksa environment variables

### Logs dan Debugging

```bash
# Backend logs
cd backend && npm run dev

# ML Service logs
cd ml-service && python run.py

# Frontend logs
cd frontend && npm run dev
```

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

Jika mengalami masalah atau memiliki pertanyaan, silakan buat issue di repository ini.