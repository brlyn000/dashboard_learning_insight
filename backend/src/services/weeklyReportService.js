import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get latest weekly report untuk user dengan mapping field yang benar
 */
export const getLatestWeeklyReport = async (userId) => {
  try {
    console.log(`[WeeklyReportService] Fetching for userId: ${userId}`);
    
    // Cari weekly report terbaru berdasarkan week_number
    const latest = await prisma.weekly_reports.findFirst({
      where: { 
        user_id: userId 
      },
      orderBy: { 
        week_number: 'desc' 
      },
    });

    if (!latest) {
      console.log(`[WeeklyReportService] No report found for user ${userId}`);
      return null;
    }

    console.log(`[WeeklyReportService] Found report from DB:`, {
      week_number: latest.week_number,
      total_study_time_hours: latest.total_study_time_hours,
      total_pomodoro_sessions: latest.total_pomodoro_sessions,
      total_activities: latest.total_activities
    });

    // Hitung data yang tidak ada di database dari tabel lain
    const currentWeekData = await calculateCurrentWeekMetrics(userId);
    
    // Return data dalam format yang diharapkan frontend
    // Mapping: total_pomodoro_sessions -> pomodoro_sessions
    return {
      week_number: latest.week_number,
      week_start_date: latest.week_start_date,
      week_end_date: latest.week_end_date,
      total_study_time_hours: latest.total_study_time_hours || 0,
      // MAPPING: Gunakan total_pomodoro_sessions dari DB
      pomodoro_sessions: latest.total_pomodoro_sessions || 0,
      // Data quiz dan modules ambil dari kalkulasi real-time
      quizzes_completed: currentWeekData.quizzes_completed || 0,
      modules_finished: currentWeekData.modules_finished || 0,
      // Default values untuk field yang tidak ada
      recommended_pomodoro_break: 20,
      engagement_score: latest.engagement_score || 0,
      avg_performance_score: 0,
      completion_rate: 0,
      total_activities: latest.total_activities || 0,
      avg_session_duration: latest.avg_session_duration || 0
    };
  } catch (error) {
    console.error('[WeeklyReportService Error]:', error);
    return null;
  }
};

/**
 * Calculate real-time weekly metrics dari data mentah
 */
export const calculateCurrentWeekMetrics = async (userId) => {
  try {
    console.log(`[Calculate Metrics] Calculating for user: ${userId}`);
    
    // Tentukan tanggal minggu ini (Senin - Minggu)
    const today = new Date();
    const day = today.getDay(); // 0 = Minggu, 1 = Senin, ...
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    
    const weekStart = new Date(today);
    weekStart.setDate(diff);
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    console.log(`[Calculate Metrics] Week range: ${weekStart.toISOString()} to ${weekEnd.toISOString()}`);
    
    // 1. Hitung total study time dari pomodoro sessions minggu ini
    const pomodoroSessions = await prisma.pomodoro_sessions.findMany({
      where: {
        user_id: userId,
        completed_at: {
          gte: weekStart,
          lte: weekEnd
        }
      }
    });
    
    const totalStudyHours = pomodoroSessions.reduce((total, session) => {
      return total + (session.duration_minutes / 60);
    }, 0);
    
    console.log(`[Calculate Metrics] Found ${pomodoroSessions.length} pomodoro sessions`);
    
    // 2. Hitung quizzes completed minggu ini
    const quizzes = await prisma.exam_results.findMany({
      where: {
        exam_registration: {
          examinees_id: userId
        },
        created_at: {
          gte: weekStart,
          lte: weekEnd
        }
      }
    });
    
    console.log(`[Calculate Metrics] Found ${quizzes.length} quizzes completed`);
    
    // 3. Hitung modules finished minggu ini
    const modules = await prisma.developer_journey_trackings.findMany({
      where: {
        developer_id: userId,
        status: 1, // Completed
        completed_at: {
          gte: weekStart,
          lte: weekEnd
        }
      }
    });
    
    console.log(`[Calculate Metrics] Found ${modules.length} modules finished`);
    
    const result = {
      total_study_time_hours: parseFloat(totalStudyHours.toFixed(2)),
      pomodoro_sessions: pomodoroSessions.length,
      quizzes_completed: quizzes.length,
      modules_finished: modules.length,
      week_start_date: weekStart,
      week_end_date: weekEnd
    };
    
    console.log('[Calculate Metrics] Final result:', result);
    return result;
  } catch (error) {
    console.error('[Calculate Metrics Error]:', error);
    return {
      total_study_time_hours: 0,
      pomodoro_sessions: 0,
      quizzes_completed: 0,
      modules_finished: 0,
      week_start_date: new Date(),
      week_end_date: new Date()
    };
  }
};