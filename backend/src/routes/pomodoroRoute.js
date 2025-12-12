
import express from 'express';
import { 
  savePomodoroSession, 
  updatePomodoroPreference, 
  getPomodoroHistory 
} from '../controllers/pomodoroController.js';

const router = express.Router();


router.post('/session', savePomodoroSession);


router.put('/preference/:userId', updatePomodoroPreference);


router.get('/history/:userId', getPomodoroHistory);

export default router;