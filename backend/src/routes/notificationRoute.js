import express from 'express';
import {
  getNotifications,
  deleteNotification,
  clearAllNotifications,
  markAsRead,
  markAllAsRead,
  generatePersonalNotification
} from '../controllers/notificationController.js';

const router = express.Router();


router.get('/:userId', getNotifications);


router.delete('/:notificationId', deleteNotification);


router.delete('/user/:userId/clear', clearAllNotifications);


router.patch('/:notificationId/read', markAsRead);


router.patch('/user/:userId/read-all', markAllAsRead);


router.post('/generate/:userId', generatePersonalNotification);

export default router;
