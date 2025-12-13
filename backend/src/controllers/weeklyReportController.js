import prisma from '../utils/prisma.js';
import { 
  getLatestWeeklyReport, 
  calculateCurrentWeekMetrics 
} from '../services/weeklyReportService.js';

// Using singleton prisma from utils


export const getCurrentWeeklyReport = async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log('\n========================================');
    console.log(`📊 [WeeklyReportController] REQUEST RECEIVED`);
    console.log(`📊 User ID: ${userId}`);
    console.log(`📊 URL: ${req.originalUrl}`);
    console.log(`📊 Time: ${new Date().toISOString()}`);
    console.log('========================================\n');


    let report = await getLatestWeeklyReport(userId);
    

    if (!report) {
      console.log(`📊 No report in DB, calculating from raw data`);
      const metrics = await calculateCurrentWeekMetrics(userId);
      
      report = {
        week_number: Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7)),
        week_start_date: metrics.week_start_date,
        week_end_date: metrics.week_end_date,
        total_study_time_hours: metrics.total_study_time_hours,

        total_pomodoro_sessions: metrics.pomodoro_sessions,
        quizzes_completed: metrics.quizzes_completed,
        modules_finished: metrics.modules_finished,
        recommended_pomodoro_break: 20,
        engagement_score: 0,
        avg_performance_score: 0,
        completion_rate: 0
      };
    }


    const responseData = {
      week_number: report.week_number || 0,
      week_start_date: report.week_start_date ? 
        new Date(report.week_start_date).toISOString() : new Date().toISOString(),
      week_end_date: report.week_end_date ? 
        new Date(report.week_end_date).toISOString() : new Date().toISOString(),
      total_study_time_hours: report.total_study_time_hours || 0,

      pomodoro_sessions: report.total_pomodoro_sessions || report.pomodoro_sessions || 0,
      quizzes_completed: report.quizzes_completed || 0,
      modules_finished: report.modules_finished || 0,
      avg_performance_score: report.avg_performance_score || 0,
      completion_rate: report.completion_rate || 0,
      recommended_pomodoro_break: report.recommended_pomodoro_break || 20
    };

    console.log('\n========================================');
    console.log(`📊 [WeeklyReportController] RESPONSE DATA`);
    console.log(`📊 Total Study Hours: ${responseData.total_study_time_hours}`);
    console.log(`📊 Pomodoro Sessions: ${responseData.pomodoro_sessions}`);
    console.log(`📊 Quizzes Completed: ${responseData.quizzes_completed}`);
    console.log(`📊 Modules Finished: ${responseData.modules_finished}`);
    console.log('========================================\n');

    res.json({
      success: true,
      data: responseData
    });

  } catch (error) {
    console.error('\n========================================');
    console.error('❌ [Get Weekly Report Error]:', error);
    console.error('========================================\n');
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch weekly report',
      error: error.message
    });
  }
};