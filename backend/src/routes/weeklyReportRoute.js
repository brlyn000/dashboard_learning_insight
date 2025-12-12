// File: backend/src/routes/weeklyReportRoute.js
import express from 'express';
import { getCurrentWeeklyReport } from '../controllers/weeklyReportController.js';

const router = express.Router();

// GET /api/weekly-reports/:userId/current
router.get('/:userId/current', getCurrentWeeklyReport);

export default router;