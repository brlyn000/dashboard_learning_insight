// backend/src/routes/dashboardRoute.js
import express from 'express';
import { getDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

// sebelumnya: router.get('/:username', getDashboardData);
router.get('/:username', getDashboard);

export default router;
