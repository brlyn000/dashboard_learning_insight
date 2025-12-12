import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, CheckCircle, FileText, Layers, ChevronRight, X, Sparkles, Loader, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';
import { mlService, weeklyReportService } from '../../services/api';

const WeeklyReport = ({ user }) => {
  // --- STATE MANAGEMENT ---
  const [weeklyStats, setWeeklyStats] = useState({
    dateRange: "No Data",
    totalStudy: "0h 0m",
    studyTrend: "+0%",
    pomodoroCompleted: 0,
    pomodoroTarget: 20,
    quizTaken: 0,
    quizTarget: 5,
    modulesCompleted: 0
  });

  const [statsLoading, setStatsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [mlInsights, setMlInsights] = useState(null);
  const [mlLoading, setMlLoading] = useState(false);
  const [mlError, setMlError] = useState(null);
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  // --- FETCH REAL DATA ON MOUNT ---
  useEffect(() => {
    console.log('📊 WeeklyReport useEffect triggered');
    console.log('📊 User object:', user);
    console.log('📊 User ID:', user?.id);
    
    if (user?.id) {
      console.log('📊 Starting data fetch...');
      
      // Fetch ML insights terlebih dahulu karena sudah terbukti bekerja
      fetchMLInsights();
      
      // Coba fetch weekly stats, jika gagal akan menggunakan data dari ML insights
      fetchWeeklyStats();
    } else {
      console.log('❌ User ID not found, skipping fetch');
    }
  }, [user?.id]);

  // --- FETCH WEEKLY STATS FROM DATABASE ---
  const fetchWeeklyStats = async () => {
    console.log('🚀 fetchWeeklyStats called');
    setStatsLoading(true);
    try {
      const response = await weeklyReportService.getCurrentWeeklyReport(user.id);
      console.log('✅ Weekly stats API response:', response);
      
      if (response.success && response.data) {
        const data = response.data;
        console.log('📊 Weekly report data from API:', data);
        
        updateWeeklyStats(data);
      } else {
        console.warn('⚠️ Weekly stats API response not successful:', response);
        
        // Fallback: Coba gunakan data dari ML insights jika ada
        if (mlInsights?.metrics) {
          console.log('🔄 Using data from ML insights as fallback');
          const fallbackData = {
            total_study_time_hours: mlInsights.metrics.study_time || 0,
            pomodoro_sessions: mlInsights.metrics.pomodoro || 0,
            quizzes_completed: mlInsights.metrics.quizzes || 0,
            modules_finished: mlInsights.metrics.modules || 0,
            recommended_pomodoro_break: 20
          };
          updateWeeklyStats(fallbackData);
        }
      }
    } catch (error) {
      console.error('❌ [Fetch Weekly Stats Error]:', error);
      console.error('❌ Error details:', error.response?.data || error.message);
      
      // Fallback ke data ML insights jika error
      if (mlInsights?.metrics) {
        console.log('🔄 Fallback to ML insights data due to error');
        const fallbackData = {
          total_study_time_hours: mlInsights.metrics.study_time || 0,
          pomodoro_sessions: mlInsights.metrics.pomodoro || 0,
          quizzes_completed: mlInsights.metrics.quizzes || 0,
          modules_finished: mlInsights.metrics.modules || 0,
          recommended_pomodoro_break: 20
        };
        updateWeeklyStats(fallbackData);
      }
    } finally {
      setStatsLoading(false);
    }
  };

  // --- HELPER: Update weekly stats state ---
  const updateWeeklyStats = (data) => {
    // Format tanggal
    const startDate = data.week_start_date 
      ? new Date(data.week_start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : '';
    const endDate = data.week_end_date
      ? new Date(data.week_end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '';
    
    // Format study time (convert dari hours ke "Xh Ym")
    const hours = Math.floor(data.total_study_time_hours || 0);
    const minutes = Math.round(((data.total_study_time_hours || 0) - hours) * 60);
    
    // Calculate study trend (compare to target 40 hours/week)
    const trendPercentage = data.total_study_time_hours > 0 
      ? Math.round((data.total_study_time_hours / 40) * 100) 
      : 0;
    
    const newStats = {
      dateRange: startDate && endDate ? `${startDate} - ${endDate}` : 'Last 7 Days',
      totalStudy: `${hours}h ${minutes}m`,
      studyTrend: `+${trendPercentage}%`,
      pomodoroCompleted: data.pomodoro_sessions || 0,
      pomodoroTarget: data.recommended_pomodoro_break || 20,
      quizTaken: data.quizzes_completed || 0,
      quizTarget: 5,
      modulesCompleted: data.modules_finished || 0
    };

    console.log('📊 Setting weeklyStats to:', newStats);
    setWeeklyStats(newStats);
  };

  // --- FETCH ML INSIGHTS ---
  const fetchMLInsights = async () => {
    setMlLoading(true);
    setMlError(null);
    
    try {
      const response = await mlService.generateInsights(user.id);
      
      if (response.success) {
        console.log('[ML Insights] ✅ Received:', response.data);
        
        // Format data untuk konsistensi
        const formattedData = {
          // Prioritasi: performance_level dari ML, lalu dari data
          performance_level: response.data.performance_level || 
                            (response.data.engagement_score >= 90 ? 'Excellent' : 
                             response.data.engagement_score >= 70 ? 'Good' : 
                             response.data.engagement_score >= 50 ? 'Average' : 'Needs Improvement'),
          
          // Gunakan summary atau message (tidak keduanya)
          summary: response.data.summary || response.data.message,
          message: undefined, // Kosongkan message karena sudah di summary
          
          // Metrics breakdown
          metrics: response.data.metrics || {
            study_time: response.data.study_time || 0,
            pomodoro: response.data.pomodoro || 0,
            quizzes: response.data.quizzes || 0,
            modules: response.data.modules || 0
          },
          
          // Persona
          persona: response.data.persona || response.data.learning_style,
          
          // Engagement score
          engagement_score: response.data.engagement_score || 
                           (response.data.metrics ? 
                             Math.min(100, Math.round(
                               ((response.data.metrics.pomodoro || 0) * 0.3 +
                                (response.data.metrics.quizzes || 0) * 0.3 +
                                (response.data.metrics.modules || 0) * 0.4) * 10
                             )) : 75),
          
          // Recommendations
          recommendations: response.data.recommendations || 
                          (response.data.recommendation ? [response.data.recommendation] : [])
        };
        
        setMlInsights(formattedData);
        
        // Jika weekly stats masih 0, coba update dari ML insights
        if (weeklyStats.pomodoroCompleted === 0 && formattedData.metrics) {
          console.log('🔄 Updating weekly stats from ML insights');
          const mlData = {
            total_study_time_hours: formattedData.metrics.study_time || 0,
            pomodoro_sessions: formattedData.metrics.pomodoro || 0,
            quizzes_completed: formattedData.metrics.quizzes || 0,
            modules_finished: formattedData.metrics.modules || 0,
            recommended_pomodoro_break: 20
          };
          updateWeeklyStats(mlData);
        }
      } else {
        setMlError('Failed to generate insights');
      }
    } catch (err) {
      console.error('[ML Insights Error]:', err);
      setMlError(err.response?.data?.message || 'Network error');
    } finally {
      setMlLoading(false);
    }
  };

  // --- REFRESH ALL DATA ---
  const handleRefresh = () => {
    fetchWeeklyStats();
    fetchMLInsights();
  };

  const handleOpenModal = (insight) => {
    setSelectedInsight(insight);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInsight(null);
    document.body.style.overflow = 'unset';
  };

  // --- HELPER FUNCTIONS ---
  const getIconStyle = (color) => {
    switch(color) {
      case 'emerald': return 'bg-emerald-100 text-emerald-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      case 'red': return 'bg-red-100 text-red-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getBorderColor = (color) => {
    switch(color) {
      case 'emerald': return 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/50';
      case 'blue': return 'border-blue-200 bg-blue-50/50 hover:bg-blue-100/50';
      case 'purple': return 'border-purple-200 bg-purple-50/50 hover:bg-purple-100/50';
      case 'orange': return 'border-orange-200 bg-orange-50/50 hover:bg-orange-100/50';
      case 'red': return 'border-red-200 bg-red-50/50 hover:bg-red-100/50';
      default: return 'border-gray-200 bg-gray-50 hover:bg-gray-100';
    }
  };

  const getTextHoverColor = (color) => {
    switch(color) {
      case 'emerald': return 'group-hover:text-emerald-700';
      case 'blue': return 'group-hover:text-blue-700';
      case 'purple': return 'group-hover:text-purple-700';
      case 'orange': return 'group-hover:text-orange-700';
      default: return 'group-hover:text-gray-800';
    }
  };

  return (
    <>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative z-10">
          
          {/* HEADER */}
          <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Weekly Learning Report</h2>
              <p className="text-gray-500 mt-1 text-sm">
                  Summary of your progress and AI-driven insights for this week.
                  <br/>
                  <span className="text-xs font-semibold text-gray-400">
                    Period: {weeklyStats.dateRange}
                  </span>
              </p>
          </div>

          {/* METRICS (4 KARTU STATISTIK) - Real Data dari Database */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
               {/* Total Study Time Card */}
               <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group">
                 <div className="relative z-10">
                   <p className="text-emerald-800 font-bold text-sm mb-1">Total Study Time</p>
                   <h3 className="text-3xl font-extrabold text-emerald-600">
                     {statsLoading ? '...' : weeklyStats.totalStudy}
                   </h3>
                 </div>
                 <div className="relative z-10 flex items-center gap-1 text-xs font-bold text-emerald-700">
                   <TrendingUp size={14} />
                   <span>{weeklyStats.studyTrend}</span>
                 </div>
                 <Clock className="absolute right-[-10px] bottom-[-10px] w-20 h-20 text-emerald-200 opacity-20 rotate-12" />
               </div>

               {/* Pomodoro Sessions Card */}
               <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group">
                 <div className="relative z-10">
                   <p className="text-blue-800 font-bold text-sm mb-1">Pomodoro Sessions</p>
                   <div className="flex items-baseline gap-1">
                     <h3 className="text-3xl font-extrabold text-blue-600">
                       {statsLoading ? '...' : weeklyStats.pomodoroCompleted}
                     </h3>
                     <span className="text-blue-400 font-bold text-sm">
                       /{weeklyStats.pomodoroTarget}
                     </span>
                   </div>
                 </div>
                 <div className="relative z-10 text-xs text-blue-700 font-medium">Target Recommended</div>
                 <CheckCircle className="absolute right-[-10px] bottom-[-10px] w-20 h-20 text-blue-200 opacity-20 rotate-12" />
               </div>

               {/* Quizzes Completed Card */}
               <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group">
                 <div className="relative z-10">
                   <p className="text-orange-800 font-bold text-sm mb-1">Quizzes Completed</p>
                   <h3 className="text-3xl font-extrabold text-orange-600">
                     {statsLoading ? '...' : weeklyStats.quizTaken}
                   </h3>
                 </div>
                 <div className="relative z-10 text-xs text-orange-700 font-medium">
                   Target: {weeklyStats.quizTarget}
                 </div>
                 <FileText className="absolute right-[-10px] bottom-[-10px] w-20 h-20 text-orange-200 opacity-20 rotate-12" />
               </div>

               {/* Modules Finished Card */}
               <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group">
                 <div className="relative z-10">
                   <p className="text-purple-800 font-bold text-sm mb-1">Modules Finished</p>
                   <h3 className="text-3xl font-extrabold text-purple-600">
                     {statsLoading ? '...' : weeklyStats.modulesCompleted}
                   </h3>
                 </div>
                 <div className="relative z-10 text-xs text-purple-700 font-medium">Keep progressing!</div>
                 <Layers className="absolute right-[-10px] bottom-[-10px] w-20 h-20 text-purple-200 opacity-20 rotate-12" />
               </div>
          </div>

          {/* AI LEARNING INSIGHTS SECTION */}
          <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-primary" />
                <h3 className="text-xl font-bold text-gray-800">AI Learning Insights</h3>
              </div>
              
              <button
                onClick={handleRefresh}
                disabled={mlLoading || statsLoading}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh all data"
              >
                <RefreshCw size={18} className={`text-gray-600 ${(mlLoading || statsLoading) ? 'animate-spin' : ''}`} />
              </button>
          </div>

          {/* ML INSIGHTS CONTENT */}
          <div className="mb-8">
            {/* Loading State */}
            {mlLoading && (
              <div className="flex items-center justify-center py-12 bg-blue-50 rounded-2xl border border-blue-100">
                <Loader className="w-6 h-6 text-blue-500 animate-spin mr-3" />
                <span className="text-blue-700 font-medium">Generating AI insights...</span>
              </div>
            )}

            {/* Error State */}
            {mlError && !mlLoading && (
              <div className="p-6 bg-red-50 rounded-2xl border border-red-200">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-700 font-medium">{mlError}</p>
                </div>
                <button
                  onClick={fetchMLInsights}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Success State - ML Insights */}
            {mlInsights && !mlLoading && !mlError && (
              <div className="space-y-4">
                {/* Main Insight Card */}
                <div className="p-6 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-blue-500 rounded-xl flex-shrink-0 shadow-md">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg text-gray-900">
                          {mlInsights.performance_level 
                            ? `${mlInsights.performance_level} Performance` 
                            : 'Weekly Progress Summary'}
                        </h4>
                        {mlInsights.performance_level && (
                          <span className="text-[10px] font-bold px-2 py-1 rounded-full uppercase bg-blue-500 text-white">
                            {mlInsights.performance_level}
                          </span>
                        )}
                      </div>
                      
                      {/* Tampilkan hanya SATU teks, prioritaskan summary */}
                      <p className="text-gray-700 leading-relaxed text-base">
                        {mlInsights.summary || 'Pick a course to begin your journey!'}
                      </p>
                    </div>
                  </div>

                  {/* SAY MORE BUTTON - hanya tampilkan jika ada metrics atau persona */}
                  {(mlInsights.metrics || mlInsights.persona) && (
                    <button
                      onClick={() => setDetailsExpanded(!detailsExpanded)}
                      className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group"
                    >
                      <MessageSquare size={16} />
                      <span>Say More</span>
                      <ChevronRight size={16} className={`transition-transform ${detailsExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  )}

                  {/* Detailed Analysis (Collapsible) */}
                  {detailsExpanded && (
                    <div className="mt-4 pt-4 border-t border-blue-200 animate-fade-in">
                      <div className="bg-white rounded-xl p-4 space-y-3">
                        {mlInsights.metrics && (
                          <div>
                            <h5 className="font-bold text-sm text-gray-700 mb-2">📊 Metrics Breakdown</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• Study Time: {mlInsights.metrics.study_time || 0} hours</li>
                              <li>• Pomodoro Sessions: {mlInsights.metrics.pomodoro || 0}</li>
                              <li>• Quizzes Completed: {mlInsights.metrics.quizzes || 0}</li>
                              <li>• Modules Finished: {mlInsights.metrics.modules || 0}</li>
                            </ul>
                          </div>
                        )}
                        
                        {mlInsights.persona && (
                          <div>
                            <h5 className="font-bold text-sm text-gray-700 mb-2">🎯 Your Learning Style</h5>
                            <p className="text-sm text-gray-600 capitalize">{mlInsights.persona.replace('_', ' ')}</p>
                          </div>
                        )}

                        {mlInsights.engagement_score !== undefined && (
                          <div>
                            <h5 className="font-bold text-sm text-gray-700 mb-2">⚡ Engagement Score</h5>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full transition-all"
                                  style={{ width: `${mlInsights.engagement_score}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-bold text-gray-700">{mlInsights.engagement_score}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Recommendations Card - hanya tampilkan jika ada rekomendasi */}
                {(mlInsights.recommendations && mlInsights.recommendations.length > 0) && (
                  <div className="p-6 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-emerald-500 rounded-xl flex-shrink-0 shadow-md">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-emerald-900 mb-3">
                          🎯 RECOMMENDED ACTIONS
                        </h4>
                        {Array.isArray(mlInsights.recommendations) ? (
                          <ul className="text-emerald-800 leading-relaxed space-y-2">
                            {mlInsights.recommendations.map((rec, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-emerald-600 font-bold">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-emerald-800 leading-relaxed">
                            {mlInsights.recommendation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Fallback: Static Insights (if no ML data) */}
            {!mlInsights && !mlLoading && !mlError && user.insights && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.insights.map((insight, index) => {
                      const IconComponent = insight.icon;
                      return (
                      <div 
                          key={index} 
                          className={`p-6 rounded-2xl border flex flex-col items-start gap-4 transition-all duration-300 group ${getBorderColor(insight.color)}`}
                      >
                          <div className="flex items-start gap-4 w-full">
                              <div className={`p-3 rounded-full flex-shrink-0 shadow-sm ${getIconStyle(insight.color)}`}>
                                  {IconComponent && <IconComponent size={24} />}
                              </div>
                              <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className={`font-bold text-base capitalize text-gray-800 ${getTextHoverColor(insight.color)} transition-colors`}>
                                      {insight.title}
                                    </h4>
                                    {insight.category && (
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${getIconStyle(insight.color)} bg-opacity-20`}>
                                        {insight.category}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 leading-relaxed">{insight.desc}</p>
                              </div>
                          </div>
                          
                          <div className="w-full flex justify-end mt-2">
                            <button 
                                onClick={() => handleOpenModal(insight)}
                                className={`flex items-center gap-1 text-xs font-bold transition-all duration-300 group/btn ${getIconStyle(insight.color).split(' ')[1]} hover:underline`}
                            >
                                Say More <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                            </button>
                          </div>
                      </div>
                  )})}
              </div>
            )}
          </div>
      </div>

      {/* MODAL for Static Insights */}
      {isModalOpen && selectedInsight && (
        <div className="fixed top-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center p-4 animate-fade-in">
          <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-sm cursor-pointer" onClick={handleCloseModal}></div>
          
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-[100000] overflow-hidden animate-scale-in max-h-[85vh] flex flex-col">
              <div className={`p-6 flex justify-between items-start border-b ${getBorderColor(selectedInsight.color)} bg-opacity-30 flex-shrink-0`}>
                  <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full flex-shrink-0 shadow-sm bg-white ${getIconStyle(selectedInsight.color).split(' ')[1]}`}>
                          {selectedInsight.icon && <selectedInsight.icon size={28} />}
                      </div>
                      <div>
                          <h3 className="text-2xl font-bold text-gray-900">{selectedInsight.title}</h3>
                          <span className={`text-xs font-bold uppercase tracking-wider ${getIconStyle(selectedInsight.color).split(' ')[1]}`}>
                              AI Analysis • {selectedInsight.category}
                          </span>
                      </div>
                  </div>
                  <button onClick={handleCloseModal} className="p-2 bg-white rounded-full hover:bg-gray-100 transition text-gray-500">
                      <X size={20} />
                  </button>
              </div>
              
              <div className="p-8 overflow-y-auto">
                  <div className="flex items-center gap-2 mb-4 font-bold text-gray-800">
                      <Sparkles size={18} />
                      <h4>Detailed Analysis</h4>
                  </div>
                  
                  <div className="text-gray-700 leading-relaxed space-y-4 text-[15px]">
                    {selectedInsight.detailedAnalysis ? 
                        selectedInsight.detailedAnalysis.split('\n\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        )) 
                        : 
                        <p className="text-gray-400 italic">No detailed analysis generated for this insight yet.</p>
                    }
                  </div>

                  {selectedInsight.action && (
                       <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
                           <div className={`p-2 rounded-full ${getIconStyle(selectedInsight.color)} bg-opacity-20`}>
                               {selectedInsight.icon && <selectedInsight.icon size={18}/>}
                           </div>
                           <div>
                               <span className="text-xs font-bold text-gray-500 uppercase">Recommended Action</span>
                               <p className="font-bold text-gray-800">{selectedInsight.action}</p>
                           </div>
                       </div>
                  )}
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeeklyReport;