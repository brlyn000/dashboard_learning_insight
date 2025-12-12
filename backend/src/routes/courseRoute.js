// File: backend/src/routes/courseRoute.js
// Respon-ID: pengecekan_file_8

import express from 'express';
import { getUserCourses, getCourseDetail } from '../controllers/courseController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Semua route courses membutuhkan authentication
router.use(verifyToken);

// GET /api/courses/:userId - Mendapatkan daftar kursus user
router.get('/:userId', getUserCourses);

// GET /api/courses/:courseId/detail - Mendapatkan detail kursus
router.get('/:courseId/detail', getCourseDetail);

export default router;
