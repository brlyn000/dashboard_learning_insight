

import express from 'express';
import {
  predictUserPersona,
  predictUserPersonaFromWeekly,
  generateUserNotification,
  generateWeeklyInsights,
  getPomodoroRecommendation,
  checkMLHealth,
  getUserNotifications,
  markNotificationAsRead,
  clearAllNotifications,
  deleteNotification
} from '../controllers/mlController.js';

const router = express.Router();


router.get('/health', checkMLHealth);


router.post('/predict-persona/:userId', predictUserPersona);


router.post('/predict-persona-from-weekly/:userId', predictUserPersonaFromWeekly);


router.post('/notification', generateUserNotification);


router.get('/notifications/:userId', getUserNotifications);


router.patch('/notifications/:notificationId/read', markNotificationAsRead);


router.delete('/notifications/:notificationId', deleteNotification);


router.delete('/notifications/:userId/clear-all', clearAllNotifications);


router.post('/insights', generateWeeklyInsights);


router.post('/pomodoro/:userId', getPomodoroRecommendation);

export default router;
