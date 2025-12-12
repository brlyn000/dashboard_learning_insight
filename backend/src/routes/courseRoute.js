import express from 'express';
import { getUserCourses, getCourseDetail } from '../controllers/courseController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();


router.use(verifyToken);


router.get('/:userId', getUserCourses);


router.get('/:courseId/detail', getCourseDetail);

export default router;
