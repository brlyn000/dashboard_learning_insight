import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


import apiRouter from './routes/route.js';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: '*',
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.options('*', cors());
app.use(express.json());
app.use(cookieParser());


app.use('/api', apiRouter);


app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    time: new Date().toISOString(),
    service: 'Learning Dashboard API'
  });
});


app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    available_routes: {
      auth: ['POST /api/auth/login', 'POST /api/auth/register', 'POST /api/auth/logout', 'GET /api/auth/refresh'],
      dashboard: ['GET /api/dashboard/:username'],
      courses: ['GET /api/courses/:userId', 'GET /api/courses/:id/detail'],
      pomodoro: ['POST /api/pomodoro/session', 'PUT /api/pomodoro/preference/:userId', 'GET /api/pomodoro/history/:userId'],
      weekly_reports: ['GET /api/weekly-reports/:userId/current'],
      ml: ['GET /api/ml/health', 'POST /api/ml/predict-persona/:userId'],
      notifications: ['GET /api/notifications/:userId', 'DELETE /api/notifications/:id', 'DELETE /api/notifications/user/:userId/clear', 'POST /api/notifications/generate/:userId']
    }
  });
});


app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  if (err.code && err.code.startsWith('P')) {
    return res.status(400).json({
      success: false,
      message: 'Database error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});


app.listen(PORT, () => {
  console.log(`\n✅ Server running at http://localhost:${PORT}`);
  console.log('='.repeat(60));
  console.log('📊 API ENDPOINTS:');
  console.log('='.repeat(60));
  console.log('🔐 AUTH:');
  console.log('   POST   /api/auth/login');
  console.log('   POST   /api/auth/register');
  console.log('   POST   /api/auth/logout');
  console.log('   GET    /api/auth/refresh');
  console.log('');
  console.log('📈 DASHBOARD:');
  console.log('   GET    /api/dashboard/:username');
  console.log('');
  console.log('📚 COURSES:');
  console.log('   GET    /api/courses/:userId');
  console.log('   GET    /api/courses/:id/detail');
  console.log('');
  console.log('⏱️  POMODORO:');
  console.log('   POST   /api/pomodoro/session');
  console.log('   PUT    /api/pomodoro/preference/:userId');
  console.log('   GET    /api/pomodoro/history/:userId');
  console.log('');
  console.log('📅 WEEKLY REPORTS:');
  console.log('   GET    /api/weekly-reports/:userId/current');
  console.log('');
  console.log('🤖 ML SERVICE:');
  console.log('   GET    /api/ml/health');
  console.log('   POST   /api/ml/predict-persona/:userId');
  console.log('');
  console.log('🔔 NOTIFICATIONS:');
  console.log('   GET    /api/notifications/:userId');
  console.log('   DELETE /api/notifications/:notificationId');
  console.log('   DELETE /api/notifications/user/:userId/clear');
  console.log('   PATCH  /api/notifications/:notificationId/read');
  console.log('   PATCH  /api/notifications/user/:userId/read-all');
  console.log('   POST   /api/notifications/generate/:userId');
  console.log('');
  console.log('🏥 HEALTH CHECK:');
  console.log('   GET    /health');
  console.log('='.repeat(60));
  console.log(`\n💡 Frontend: http://localhost:5173`);
  console.log(`🔧 ML Service: http://localhost:8000`);
  console.log('='.repeat(60));
});
