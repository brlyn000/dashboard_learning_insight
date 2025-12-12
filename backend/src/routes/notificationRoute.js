// File: backend/src/routes/notificationRoute.js
// Respon-ID: pengecekan_file_30

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

// GET - Ambil semua notifikasi user
router.get('/:userId', getNotifications);

// DELETE - Hapus satu notifikasi
router.delete('/:notificationId', deleteNotification);

// DELETE - Hapus semua notifikasi user
router.delete('/user/:userId/clear', clearAllNotifications);

// PATCH - Tandai satu notifikasi sudah dibaca
router.patch('/:notificationId/read', markAsRead);

// PATCH - Tandai semua notifikasi sudah dibaca
router.patch('/user/:userId/read-all', markAllAsRead);

// POST - Generate notifikasi personal dari ML
router.post('/generate/:userId', generatePersonalNotification);

export default router;
