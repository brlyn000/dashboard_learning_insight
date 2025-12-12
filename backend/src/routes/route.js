import express from 'express';


import authRoute from './authRoute.js';
import dashboardRoute from './dashboardRoute.js';
import courseRoute from './courseRoute.js';
import pomodoroRoute from './pomodoroRoute.js';
import weeklyReportRoute from './weeklyReportRoute.js';
import mlRoute from './mlRoute.js';
import notificationRoute from './notificationRoute.js';

const router = express.Router();


router.use('/auth', authRoute);
router.use('/dashboard', dashboardRoute);
router.use('/courses', courseRoute);
router.use('/pomodoro', pomodoroRoute);
router.use('/weekly-reports', weeklyReportRoute);
router.use('/ml', mlRoute);
router.use('/notifications', notificationRoute);

export default router;
