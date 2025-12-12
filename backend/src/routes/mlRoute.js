/**
 * ML Routes
 * Routes for ML service integration
 */

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

// ML Service Health Check
router.get('/health', checkMLHealth);

// Persona Prediction (old)
router.post('/predict-persona/:userId', predictUserPersona);

// Persona Prediction from Weekly Reports (NEW)
router.post('/predict-persona-from-weekly/:userId', predictUserPersonaFromWeekly);

// Notification Generation
router.post('/notification', generateUserNotification);

// Get User Notifications
router.get('/notifications/:userId', getUserNotifications);

// Mark Notification as Read
router.patch('/notifications/:notificationId/read', markNotificationAsRead);

// Delete Single Notification
router.delete('/notifications/:notificationId', deleteNotification);

// Clear All Notifications
router.delete('/notifications/:userId/clear-all', clearAllNotifications);

// Weekly Insights
router.post('/insights', generateWeeklyInsights);

// Pomodoro Recommendation
router.post('/pomodoro/:userId', getPomodoroRecommendation);

export default router;
