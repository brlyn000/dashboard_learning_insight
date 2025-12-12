// File: backend/src/controllers/pomodoroController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Simpan sesi pomodoro ke database
const savePomodoroSession = async (req, res) => {
  try {
    const { userId, durationMinutes, journeyId } = req.body;
    
    if (!userId || !durationMinutes) {
      return res.status(400).json({
        success: false,
        message: 'userId and durationMinutes are required'
      });
    }
    
    // Simpan sesi ke database
    const session = await prisma.pomodoro_sessions.create({
      data: {
        user_id: userId,
        journey_id: journeyId || null,
        duration_minutes: durationMinutes,
        completed_at: new Date()
      }
    });
    
    // Update weekly report
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const weekStart = new Date(today);
    weekStart.setDate(diff);
    weekStart.setHours(0, 0, 0, 0);
    
    // Cari atau buat weekly report
    let weeklyReport = await prisma.weekly_reports.findFirst({
      where: {
        user_id: userId,
        week_start_date: { gte: weekStart }
      }
    });
    
    if (weeklyReport) {
      // Update existing report
      await prisma.weekly_reports.update({
        where: { id: weeklyReport.id },
        data: {
          total_pomodoro_sessions: (weeklyReport.total_pomodoro_sessions || 0) + 1,
          total_study_time_hours: (weeklyReport.total_study_time_hours || 0) + (durationMinutes / 60),
          updated_at: new Date()
        }
      });
    } else {
      // Create new weekly report
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      await prisma.weekly_reports.create({
        data: {
          user_id: userId,
          week_number: Math.ceil((today.getDate() + 6) / 7),
          week_start_date: weekStart,
          week_end_date: weekEnd,
          total_pomodoro_sessions: 1,
          total_study_time_hours: durationMinutes / 60,
          total_activities: 1
        }
      });
    }
    
    return res.json({
      success: true,
      message: 'Pomodoro session saved',
      data: session
    });
    
  } catch (error) {
    console.error('Save pomodoro session error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update pomodoro preference (terima/tolak rekomendasi ML)
const updatePomodoroPreference = async (req, res) => {
  try {
    const { userId } = req.params;
    const { useRecommended, focusTime, restTime, longRestTime } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      });
    }
    
    // Cari user
    const user = await prisma.users.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Parse existing config
    let pomodoroConfig = {};
    if (user.pomodoro_config && typeof user.pomodoro_config === 'string') {
      try {
        pomodoroConfig = JSON.parse(user.pomodoro_config);
      } catch (e) {
        console.error('Error parsing pomodoro_config:', e);
      }
    }
    
    // Update config
    const updatedConfig = {
      ...pomodoroConfig,
      focusTime: focusTime !== undefined ? focusTime : (pomodoroConfig.focusTime || 25),
      restTime: restTime !== undefined ? restTime : (pomodoroConfig.restTime || 5),
      longRestTime: longRestTime !== undefined ? longRestTime : (pomodoroConfig.longRestTime || 15),
      useRecommended: useRecommended !== undefined ? useRecommended : (pomodoroConfig.useRecommended || false),
      lastUpdated: new Date().toISOString()
    };
    
    // Simpan ke database
    await prisma.users.update({
      where: { id: userId },
      data: {
        pomodoro_config: JSON.stringify(updatedConfig)
      }
    });
    
    return res.json({
      success: true,
      message: useRecommended ? 'Using ML recommendation' : 'Using default timer',
      data: updatedConfig
    });
    
  } catch (error) {
    console.error('Update pomodoro preference error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get pomodoro history
const getPomodoroHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 20 } = req.query;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      });
    }
    
    const sessions = await prisma.pomodoro_sessions.findMany({
      where: { user_id: userId },
      orderBy: { completed_at: 'desc' },
      take: parseInt(limit),
      include: {
        journey: {
          select: { name: true }
        }
      }
    });
    
    // Hitung statistik
    const totalSessions = sessions.length;
    const totalMinutes = sessions.reduce((sum, session) => sum + session.duration_minutes, 0);
    const avgSessionLength = totalSessions > 0 ? totalMinutes / totalSessions : 0;
    
    // Group by day (last 7 days)
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    
    const recentSessions = sessions.filter(s => 
      new Date(s.completed_at) >= last7Days
    );
    
    const dailyStats = {};
    recentSessions.forEach(session => {
      const date = new Date(session.completed_at).toLocaleDateString();
      if (!dailyStats[date]) {
        dailyStats[date] = { sessions: 0, minutes: 0 };
      }
      dailyStats[date].sessions++;
      dailyStats[date].minutes += session.duration_minutes;
    });
    
    return res.json({
      success: true,
      data: {
        sessions,
        statistics: {
          totalSessions,
          totalMinutes,
          avgSessionLength: Math.round(avgSessionLength),
          dailyStats
        }
      }
    });
    
  } catch (error) {
    console.error('Get pomodoro history error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export { savePomodoroSession, updatePomodoroPreference, getPomodoroHistory };