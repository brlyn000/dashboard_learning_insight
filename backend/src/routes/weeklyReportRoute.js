
import express from 'express';
import { getCurrentWeeklyReport } from '../controllers/weeklyReportController.js';

const router = express.Router();


router.get('/:userId/current', getCurrentWeeklyReport);

export default router;