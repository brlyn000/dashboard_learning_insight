<div align="center">

# 🎯 Dashboard Learning Insight

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=6366F1&center=true&vCenter=true&width=600&lines=AI-Powered+Learning+Analytics;Personalized+Study+Insights;Smart+Pomodoro+Timer;Machine+Learning+Integration" alt="Typing SVG" />

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Powered by Node.js](https://img.shields.io/badge/Powered%20by-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![ML with Python](https://img.shields.io/badge/ML%20with-Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![Database PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)

---

### 🌟 **Aplikasi web revolusioner yang mengintegrasikan AI & Machine Learning untuk memberikan wawasan pembelajaran yang dipersonalisasi**

*Transformasi cara belajar Anda dengan teknologi terdepan: React, Node.js, dan Python ML*

</div>

---

## ✨ Fitur Unggulan

<table>
<tr>
<td width="50%">

### 📊 **Smart Analytics**
- 🎯 **Dashboard Pembelajaran** - Visualisasi progress real-time
- 📈 **Statistik Mendalam** - Analytics pembelajaran komprehensif
- 🔮 **Prediksi AI** - Forecasting performa belajar

</td>
<td width="50%">

### 🤖 **AI-Powered Features**
- ⏰ **Pomodoro AI** - Timer dengan rekomendasi cerdas
- 🎭 **Persona Prediction** - Analisis pola belajar ML
- 🔔 **Smart Notifications** - Notifikasi yang dipersonalisasi

</td>
</tr>
<tr>
<td width="50%">

### 📚 **Learning Management**
- 📖 **Course Tracking** - Monitor progress kursus
- 📝 **Material Management** - Organisasi materi belajar
- 🎓 **Achievement System** - Gamifikasi pembelajaran

</td>
<td width="50%">

### 📋 **Reporting & Insights**
- 📊 **Weekly Reports** - Laporan mingguan otomatis
- 💡 **Learning Insights** - Wawasan berbasis data
- 🎯 **Goal Tracking** - Pelacakan target belajar

</td>
</tr>
</table>

## 🏗️ Arsitektur Sistem

<div align="center">

```mermaid
graph TB
    subgraph "🎨 Frontend Layer"
        A["⚛️ React 19<br/>📦 Vite + Tailwind"]
    end
    
    subgraph "🔧 Backend Layer"
        B["🟢 Node.js + Express<br/>🗄️ Prisma ORM"]
    end
    
    subgraph "🤖 ML Layer"
        C["🐍 Python + FastAPI<br/>🧠 Scikit-learn + XGBoost"]
    end
    
    subgraph "💾 Database Layer"
        D["🐘 PostgreSQL<br/>📊 Structured Data"]
    end
    
    A -->|"🔗 API Calls"| B
    B -->|"🤖 ML Requests"| C
    B -->|"💾 Data Operations"| D
    C -->|"📈 Predictions"| B
    
    style A fill:#61DAFB,stroke:#333,stroke-width:2px,color:#000
    style B fill:#339933,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#3776AB,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#336791,stroke:#333,stroke-width:2px,color:#fff
```

</div>

### 📁 **Struktur Proyek**
```bash
📦 dashboard_learning_insight/
├── 🎨 frontend/          # React + Vite + Tailwind CSS
├── 🔧 backend/           # Node.js + Express + Prisma
├── 🤖 ml-service/        # Python + FastAPI + Scikit-learn
└── 📖 README.md
```

## 📋 Prerequisites

<div align="center">

### 🛠️ **Requirement Sistem**

</div>

| Teknologi | Versi Minimum | Status | Download |
|-----------|---------------|--------|-----------|
| 🟢 **Node.js** | v18+ | ![Node](https://img.shields.io/badge/Required-Critical-red) | [Download](https://nodejs.org/) |
| 🐍 **Python** | v3.8+ | ![Python](https://img.shields.io/badge/Required-Critical-red) | [Download](https://python.org/) |
| 🐘 **PostgreSQL** | v13+ | ![PostgreSQL](https://img.shields.io/badge/Required-Critical-red) | [Download](https://postgresql.org/) |
| 📦 **npm/yarn** | Latest | ![NPM](https://img.shields.io/badge/Required-Critical-red) | Included with Node.js |
| 🐍 **pip** | Latest | ![PIP](https://img.shields.io/badge/Required-Critical-red) | Included with Python |

> ⚠️ **Penting**: Pastikan semua requirement di atas terinstall sebelum melanjutkan!

## 🚀 Quick Start Guide

<div align="center">

### 🎯 **Siap untuk memulai? Mari setup dalam 4 langkah mudah!**

</div>

### 🔥 **Step 1: Clone Repository**

```bash
# 📥 Clone the awesome project
git clone <repository-url>
cd dashboard_learning_insight

# 🎉 You're in! Let's build something amazing!
echo "🚀 Welcome to Dashboard Learning Insight!"
```

### 🔧 **Step 2: Setup Backend**

```bash
# 🏃‍♂️ Navigate to backend
cd backend

# 📦 Install all the goodies
npm install

# ⚙️ Setup your environment
cp .env.example .env
# ✏️ Edit .env with your database config

# 🗄️ Setup database magic
npm run migrate
npm run seed

# 🚀 Launch backend server
npm run dev
```

<details>
<summary>🔧 <strong>Backend Environment Configuration</strong></summary>

```env
# 🔐 JWT Secrets (Change these!)
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-secret-key

# 🗄️ Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
DIRECT_URL="postgresql://username:password@localhost:5432/database_name"

# 🌍 Environment Settings
NODE_ENV=development
PORT=5000

# 🤖 ML Service Connection
ML_SERVICE_URL=http://localhost:8000
```

</details>

### 🤖 **Step 3: Setup ML Service**

```bash
# 🧠 Navigate to ML service
cd ml-service

# 🐍 Install Python dependencies
pip install -r requirements.txt

# ⚙️ Configure ML environment
cp .env.example .env
# ✏️ Customize your ML settings

# 🚀 Launch the AI brain
python run.py
```

<details>
<summary>🤖 <strong>ML Service Environment Configuration</strong></summary>

```env
# 🏷️ Application Identity
APP_NAME="Nexalar ML Service"
ENVIRONMENT="development"

# 🌐 Server Configuration
HOST="0.0.0.0"
PORT=8000

# 🔐 Security Settings
API_KEY="your-super-secret-api-key"
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:5173"
```

</details>

### 🎨 **Step 4: Setup Frontend**

```bash
# 🎨 Navigate to frontend
cd frontend

# 📦 Install UI dependencies
npm install

# 🎉 Launch the beautiful interface
npm run dev
```

<div align="center">

### 🎊 **Congratulations! Your app is ready!**

![Success](https://img.shields.io/badge/Status-Ready%20to%20Rock!-success?style=for-the-badge&logo=rocket)

</div>

## 🎮 Development Mode

<div align="center">

### 🚀 **Triple Terminal Power!**
*Run these commands in separate terminals*

</div>

<table>
<tr>
<td width="33%" align="center">

### 🤖 **Terminal 1: ML Service**
```bash
cd ml-service
python run.py
```
![ML Service](https://img.shields.io/badge/Port-8000-blue?style=flat-square&logo=python)

</td>
<td width="33%" align="center">

### 🔧 **Terminal 2: Backend**
```bash
cd backend
npm run dev
```
![Backend](https://img.shields.io/badge/Port-5000-green?style=flat-square&logo=node.js)

</td>
<td width="33%" align="center">

### 🎨 **Terminal 3: Frontend**
```bash
cd frontend
npm run dev
```
![Frontend](https://img.shields.io/badge/Port-5173-orange?style=flat-square&logo=react)

</td>
</tr>
</table>

---

### 🌐 **Access Points**

| Service | URL | Description | Status |
|---------|-----|-------------|--------|
| 🎨 **Frontend** | [http://localhost:5173](http://localhost:5173) | Main Application UI | ![Status](https://img.shields.io/badge/Status-Active-success) |
| 🔧 **Backend API** | [http://localhost:5000](http://localhost:5000) | REST API Server | ![Status](https://img.shields.io/badge/Status-Active-success) |
| 🤖 **ML Service** | [http://localhost:8000](http://localhost:8000) | AI/ML Endpoints | ![Status](https://img.shields.io/badge/Status-Active-success) |
| 📚 **API Docs** | [http://localhost:8000/docs](http://localhost:8000/docs) | Interactive API Documentation | ![Status](https://img.shields.io/badge/Status-Active-success) |

## 🛣️ API Reference

<div align="center">

### 📡 **Complete API Endpoints Guide**

</div>

<details>
<summary>🔐 <strong>Authentication Endpoints</strong></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/login` | 🔑 User login | ❌ |
| `POST` | `/api/auth/register` | 👤 Register new user | ❌ |
| `POST` | `/api/auth/logout` | 🚪 User logout | ✅ |
| `GET` | `/api/auth/refresh` | 🔄 Refresh JWT token | ✅ |

</details>

<details>
<summary>📊 <strong>Dashboard Endpoints</strong></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/dashboard/:username` | 📈 Get user dashboard data | ✅ |

</details>

<details>
<summary>⏰ <strong>Pomodoro Endpoints</strong></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/pomodoro/session` | 💾 Save pomodoro session | ✅ |
| `PUT` | `/api/pomodoro/preference/:userId` | ⚙️ Update user preferences | ✅ |
| `GET` | `/api/pomodoro/history/:userId` | 📜 Get session history | ✅ |

</details>

<details>
<summary>📚 <strong>Course Management</strong></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/courses/:userId` | 📖 Get user courses | ✅ |
| `GET` | `/api/courses/:courseId/detail` | 🔍 Get course details | ✅ |

</details>

<details>
<summary>🤖 <strong>Machine Learning</strong></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/ml/insights` | 💡 Generate AI insights | ✅ |
| `POST` | `/api/ml/predict-persona/:userId` | 🎭 Predict learning persona | ✅ |
| `POST` | `/api/ml/pomodoro/:userId` | 🎯 Get pomodoro recommendations | ✅ |
| `GET` | `/api/ml/health` | ❤️ ML service health check | ❌ |

</details>

<details>
<summary>🔔 <strong>Notifications</strong></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/notifications/:userId` | 📋 Get user notifications | ✅ |
| `DELETE` | `/api/notifications/:notificationId` | 🗑️ Delete notification | ✅ |
| `PATCH` | `/api/notifications/:notificationId/read` | ✅ Mark as read | ✅ |

</details>

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

## 🛠️ Tech Stack

<div align="center">

### 🚀 **Powered by Modern Technologies**

</div>

<table>
<tr>
<td width="33%" align="center">

### 🎨 **Frontend**
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React-Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-Viz-8884D8?style=for-the-badge)
![Lucide](https://img.shields.io/badge/Lucide-Icons-F56565?style=for-the-badge)

</td>
<td width="33%" align="center">

### 🔧 **Backend**
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-Framework-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-Security-4A90E2?style=for-the-badge)

</td>
<td width="33%" align="center">

### 🤖 **ML Service**
![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Framework-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Scikit-learn](https://img.shields.io/badge/Scikit--learn-ML-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-Data-150458?style=for-the-badge&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-Computing-013243?style=for-the-badge&logo=numpy&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-Gradient-FF6600?style=for-the-badge)

</td>
</tr>
</table>

## 🚀 Deployment

Untuk deployment production, lihat file `DEPLOY_GUIDE.md` yang berisi panduan lengkap deployment ke berbagai platform.

## 🚨 Troubleshooting Guide

<div align="center">

### 🔧 **Common Issues & Solutions**

</div>

<details>
<summary>🗄️ <strong>Database Connection Error</strong></summary>

**Symptoms:** `Connection refused` or `Database not found`

**Solutions:**
- ✅ Ensure PostgreSQL is running
- ✅ Check `DATABASE_URL` in `.env`
- ✅ Run migrations: `npm run migrate`
- ✅ Verify database credentials

```bash
# Quick fix commands
cd backend
npm run reset  # Reset and reseed database
npm run studio # Open Prisma Studio to verify
```

</details>

<details>
<summary>🤖 <strong>ML Service Not Responding</strong></summary>

**Symptoms:** `ML service unavailable` or `Port 8000 error`

**Solutions:**
- ✅ Install Python dependencies: `pip install -r requirements.txt`
- ✅ Check port 8000 availability
- ✅ Verify Python version (3.8+)
- ✅ Check ML service logs

```bash
# Debug ML service
cd ml-service
python -c "import fastapi; print('FastAPI OK')"
python run.py --reload
```

</details>

<details>
<summary>🎨 <strong>Frontend Build Error</strong></summary>

**Symptoms:** `Build failed` or `Module not found`

**Solutions:**
- ✅ Clear node_modules: `rm -rf node_modules && npm install`
- ✅ Check Node.js version (18+)
- ✅ Verify environment variables
- ✅ Clear Vite cache: `npm run dev -- --force`

```bash
# Fresh install
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

</details>

### 📊 **Debug Commands**

```bash
# 🔍 Check all services status
echo "🔧 Backend:" && curl -s http://localhost:5000/health || echo "❌ Down"
echo "🤖 ML Service:" && curl -s http://localhost:8000/health || echo "❌ Down"
echo "🎨 Frontend:" && curl -s http://localhost:5173 || echo "❌ Down"
```

## 🤝 Contributing

<div align="center">

### 🌟 **Join Our Amazing Community!**

[![Contributors](https://img.shields.io/badge/Contributors-Welcome-brightgreen?style=for-the-badge&logo=github)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge&logo=git)]()
[![Code Style](https://img.shields.io/badge/Code%20Style-Prettier-ff69b4?style=for-the-badge&logo=prettier)]()

</div>

### 🚀 **Quick Contribution Steps**

```bash
# 1️⃣ Fork & Clone
git clone https://github.com/yourusername/dashboard_learning_insight.git

# 2️⃣ Create Feature Branch
git checkout -b feature/AmazingFeature

# 3️⃣ Make Your Magic ✨
# ... code your awesome feature ...

# 4️⃣ Commit with Style
git commit -m "✨ Add some AmazingFeature"

# 5️⃣ Push & Create PR
git push origin feature/AmazingFeature
```

---

## 📄 License

<div align="center">

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**Distributed under the MIT License. See `LICENSE` for more information.**

</div>

---

## 💬 Support & Community

<div align="center">

### 🆘 **Need Help? We're Here!**

[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-red?style=for-the-badge&logo=github)](https://github.com/yourusername/dashboard_learning_insight/issues)
[![Discussions](https://img.shields.io/badge/GitHub-Discussions-blue?style=for-the-badge&logo=github)](https://github.com/yourusername/dashboard_learning_insight/discussions)
[![Documentation](https://img.shields.io/badge/Read-Documentation-green?style=for-the-badge&logo=gitbook)]()

**🐛 Found a bug?** [Create an Issue](https://github.com/yourusername/dashboard_learning_insight/issues/new)

**💡 Have an idea?** [Start a Discussion](https://github.com/yourusername/dashboard_learning_insight/discussions)

**❓ Need help?** Check our [Documentation]() or ask in [Discussions]()

---

### 🌟 **Show Your Support**

If this project helped you, please consider giving it a ⭐!

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/dashboard_learning_insight&type=Date)](https://star-history.com/#yourusername/dashboard_learning_insight&Date)

---

**Made with ❤️ by the Dashboard Learning Insight Team**

</div>




## Link Model AI/ML
https://drive.google.com/drive/folders/1lNuX1PeghKcplOTI5ueAxCwGluL61l69?usp=drive_link
