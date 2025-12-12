// File: backend/src/controllers/dashboardController.js
// Respon-ID: revisi_warna_persona_calm

import { PrismaClient } from '@prisma/client';
import * as mlService from '../services/mlService.js';

const prisma = new PrismaClient();

// Mapping persona untuk frontend (SESUAI DENGAN iconMap.js di frontend)
const PERSONA_MAPPING = {
  'consistent_learner': {
    title: 'Consistent Learner',
    desc: 'You have regular study habits with steady progress. You benefit from consistent, moderate-length sessions.',
    icon: 'TrendingUp',
    themeColor: '#3b82f6'  // Biru Tenang (Tailwind blue-500) - Profesional & Konsisten
  },
  'fast_learner': {
    title: 'Fast Learner',
    desc: 'You grasp concepts quickly and complete tasks efficiently. Short, intensive sessions work best for you.',
    icon: 'Zap',
    themeColor: '#eab308'  // Kuning/Oranye Lembut (Tailwind yellow-500) - Berenergi tapi tidak mencolok
  },
  'new_learner': {
    title: 'New Learner',
    desc: 'You are building your learning habits. Start with shorter sessions and gradually increase focus time.',
    icon: 'Star',
    themeColor: '#64748b'  // Abu-abu Biru Tenang (Tailwind slate-500) - Netral & Modern
  },
  'reflective_learner': {
    title: 'Reflective Learner',
    desc: 'You prefer deep thinking and thorough understanding. Longer sessions with ample reflection time suit you.',
    icon: 'Brain',
    themeColor: '#8b5cf6'  // Ungu Tenang (Tailwind violet-500) - Dalam & Bijaksana
  }
};

// Default pomodoro configuration
const DEFAULT_POMODORO = {
// ... sisa kode di bawah ini tetap sama seperti file asli ...
  focusTime: 25,
  restTime: 5,
  longRestTime: 15,
  useRecommended: false,
  suggestion: "Using default Pomodoro timer (25-5-15)"
};

const getMondayOfWeek = (weekOffset = 0) => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today);
  monday.setDate(diff - (weekOffset * 7));
  monday.setHours(0, 0, 0, 0);
  return monday;
};

const getSundayOfWeek = (monday) => {
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return sunday;
};

const getWeeklyQuizAverages = async (userId) => {
  const weeklyData = [];
  
  for (let weekOffset = 3; weekOffset >= 0; weekOffset--) {
    const weekStart = getMondayOfWeek(weekOffset);
    const weekEnd = getSundayOfWeek(weekStart);
    const weekNumber = 4 - weekOffset; // Week 1, 2, 3, 4
    
    // Query exam results for this user in this week
    const examResults = await prisma.exam_results.findMany({
      where: {
        exam_registration: {
          examinees_id: userId,
          exam_finished_at: {
            gte: weekStart,
            lte: weekEnd
          }
        }
      },
      select: {
        score: true
      }
    });
    
    let avgScore = 0;
    if (examResults.length > 0) {
      const totalScore = examResults.reduce((sum, result) => sum + result.score, 0);
      avgScore = Math.round(totalScore / examResults.length);
    }
    
    weeklyData.push({
      name: `Week ${weekNumber}`,
      score: avgScore,
      quizCount: examResults.length
    });
  }
  
  return weeklyData;
};

const getDashboard = async (req, res) => {
  try {
    const { username } = req.params;

    console.log('Fetching dashboard for user:', username);

    // 1. Cari user berdasarkan nama (case insensitive)
    const user = await prisma.users.findFirst({
      where: {
        name: {
          equals: username,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        user_role: true,
        ml_predicted_persona: true,
        ai_persona: true,
        pomodoro_config: true,
        ml_confidence: true,
        ml_last_prediction_at: true,
        personalized_insight: true,
        learning_recommendation: true,
        image_path: true
      },
    });

    if (!user) {
      console.log('User not found:', username);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('User found:', user.name, 'ID:', user.id);

    // 2. Persona Data
    const personaType = user.ml_predicted_persona || 'new_learner';
    const personaData = PERSONA_MAPPING[personaType] || PERSONA_MAPPING['new_learner'];

    // 3. Pomodoro Configuration
    let pomodoroConfig = DEFAULT_POMODORO;
    if (user.pomodoro_config) {
      try {
        const parsedConfig = typeof user.pomodoro_config === 'string' 
          ? JSON.parse(user.pomodoro_config) 
          : user.pomodoro_config;
        pomodoroConfig = { ...pomodoroConfig, ...parsedConfig };
      } catch (e) {
        console.error('Error parsing pomodoro_config:', e);
      }
    }

    // 4. Weekly Report Data
    const weekStart = getMondayOfWeek(0);
    const weeklyReport = await prisma.weekly_reports.findFirst({
      where: {
        user_id: user.id,
        week_start_date: { gte: weekStart }
      },
      orderBy: { created_at: 'desc' },
    });

    // 5. Course Status Calculation
    const journeys = await prisma.developer_journeys.findMany({
      include: {
        tutorials: { select: { id: true } },
      },
    });

    const trackings = await prisma.developer_journey_trackings.findMany({
      where: {
        developer_id: user.id,
        status: 1,
      },
      select: {
        journey_id: true,
        tutorial_id: true,
      },
    });

    const doneMap = {};
    trackings.forEach((t) => {
      if (!doneMap[t.journey_id]) {
        doneMap[t.journey_id] = new Set();
      }
      doneMap[t.journey_id].add(t.tutorial_id);
    });

    let completedCount = 0;
    let inProgressCount = 0;
    let notStartedCount = 0;
    let notCompletedCount = 0;
    const now = new Date();

    journeys.forEach((j) => {
      const totalModules = j.tutorials.length;
      const doneModules = doneMap[j.id] ? doneMap[j.id].size : 0;
      const progress = totalModules > 0 ? Math.round((doneModules / totalModules) * 100) : 0;
      const deadline = j.deadline ? new Date(j.deadline) : null;

      if (progress >= 100) {
        completedCount++;
      } else if (deadline && deadline < now && progress < 100) {
        notCompletedCount++;
      } else if (progress > 0) {
        inProgressCount++;
      } else {
        notStartedCount++;
      }
    });

    const completionChartData = [
      { name: 'Completed', count: completedCount },
      { name: 'In Progress', count: inProgressCount },
      { name: 'Not Started', count: notStartedCount },
      { name: 'Not Completed', count: notCompletedCount },
    ];

    // 6. Time Spent Data
    const weekEnd = getSundayOfWeek(weekStart);
    const pomodoroSessions = await prisma.pomodoro_sessions.findMany({
      where: {
        user_id: user.id,
        completed_at: {
          gte: weekStart,
          lte: weekEnd
        }
      },
      select: {
        duration_minutes: true,
        completed_at: true
      }
    });

    const dailyMinutes = [0, 0, 0, 0, 0, 0, 0]; // Sun to Sat

    pomodoroSessions.forEach((session) => {
      const dayIndex = new Date(session.completed_at).getDay();
      dailyMinutes[dayIndex] += session.duration_minutes;
    });

    const timeSpentChartData = [
      { name: 'M', fullName: 'Monday', hours: parseFloat((dailyMinutes[1] / 60).toFixed(1)) },
      { name: 'T', fullName: 'Tuesday', hours: parseFloat((dailyMinutes[2] / 60).toFixed(1)) },
      { name: 'W', fullName: 'Wednesday', hours: parseFloat((dailyMinutes[3] / 60).toFixed(1)) },
      { name: 'T', fullName: 'Thursday', hours: parseFloat((dailyMinutes[4] / 60).toFixed(1)) },
      { name: 'F', fullName: 'Friday', hours: parseFloat((dailyMinutes[5] / 60).toFixed(1)) },
      { name: 'S', fullName: 'Saturday', hours: parseFloat((dailyMinutes[6] / 60).toFixed(1)) },
      { name: 'S', fullName: 'Sunday', hours: parseFloat((dailyMinutes[0] / 60).toFixed(1)) },
    ];

    // 7. Quiz Data
    const quizChartData = await getWeeklyQuizAverages(user.id);
    console.log('Quiz chart data:', quizChartData);

    // 8. Notifications
    const notificationsData = await prisma.notifications.findMany({
      where: { user_id: user.id },
      orderBy: [
        { is_read: 'asc' },
        { created_at: 'desc' }
      ],
      take: 10
    });

    const notifications = notificationsData.map((n, index) => ({
      id: n.id,
      title: n.title,
      message: n.message,
      priority: n.priority || 'info',
      time: formatTimeAgo(n.created_at),
      isRead: n.is_read,
      icon: n.priority === 'high' ? 'AlertTriangle' : 'Bell',
      color: n.is_read ? 'bg-gray-100' : 'bg-blue-100'
    }));

    // 9. Insights
    const insights = [
      {
        id: 1,
        title: 'Learning Pattern',
        message: user.personalized_insight || `You are a ${personaData.title}`,
        icon: 'Lightbulb',
        color: 'bg-purple-100'
      },
      {
        id: 2,
        title: 'Recommendation',
        message: user.learning_recommendation || pomodoroConfig.suggestion,
        icon: 'Target',
        color: 'bg-yellow-100'
      }
    ];

    // 10. Response
    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.user_role || 'student',
        avatar: user.image_path || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=10B981&color=fff`,
        persona: {
          title: personaData.title,
          desc: personaData.desc,
          icon: personaData.icon,
          themeColor: personaData.themeColor,
          type: personaType,
          confidence: user.ml_confidence || 0.85,
          lastUpdated: user.ml_last_prediction_at || new Date()
        },
        pomodoro: {
          focusTime: pomodoroConfig.focusTime || 25,
          restTime: pomodoroConfig.restTime || 5,
          longRestTime: pomodoroConfig.longRestTime || 15,
          suggestion: pomodoroConfig.suggestion || "Using default timer"
        },
        charts: {
          timeSpent: timeSpentChartData,
          quiz: quizChartData,
          completion: completionChartData,
        },
        insights: insights,
        weeklyStats: weeklyReport ? {
          totalStudyTime: `${Math.floor(weeklyReport.total_study_time_hours || 0)}h`,
          pomodoroSessions: weeklyReport.total_pomodoro_sessions || 0,
          quizzesCompleted: weeklyReport.quizzes_completed || 0,
          modulesFinished: weeklyReport.modules_finished || 0,
          engagementScore: weeklyReport.engagement_score || 0
        } : {
          totalStudyTime: "0h",
          pomodoroSessions: 0,
          quizzesCompleted: 0,
          modulesFinished: 0,
          engagementScore: 0
        },
        notifications: notifications
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

const formatTimeAgo = (date) => {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return new Date(date).toLocaleDateString();
};

export { getDashboard };