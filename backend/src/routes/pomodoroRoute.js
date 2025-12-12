// File: backend/src/routes/pomodoroRoute.js
import express from 'express';
import { 
  savePomodoroSession, 
  updatePomodoroPreference, 
  getPomodoroHistory 
} from '../controllers/pomodoroController.js';

const router = express.Router();

// Simpan sesi pomodoro
router.post('/session', savePomodoroSession);

// Update preferensi pomodoro (terima/tolak rekomendasi ML)
router.put('/preference/:userId', updatePomodoroPreference);

// Get history pomodoro
router.get('/history/:userId', getPomodoroHistory);

export default router;