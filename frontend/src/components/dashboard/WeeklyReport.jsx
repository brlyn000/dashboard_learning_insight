import React, { useState } from 'react';
import { TrendingUp, Clock, CheckCircle, FileText, Layers, ChevronRight, X, Sparkles } from 'lucide-react';

const WeeklyReport = ({ user }) => {
  const stats = user.weeklyStats || {
      dateRange: "No Data", totalStudy: "0h", studyTrend: "0", pomodoroCompleted: 0, pomodoroTarget: 0, quizTaken: 0, quizTarget: 0, modulesCompleted: 0
  };

  // --- STATE UNTUK MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);

  const handleOpenModal = (insight) => {
    setSelectedInsight(insight);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Cegah scroll background
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInsight(null);
    document.body.style.overflow = 'unset';
  };

  // Helper Warna
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
                  <span className="text-xs font-semibold text-gray-400">Period: {stats.dateRange}</span>
              </p>
          </div>

          {/* METRICS (4 KARTU STATISTIK) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
               <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group"><div className="relative z-10"><p className="text-emerald-800 font-bold text-sm mb-1">Total Study Time</p><h3 className="text-3xl font-extrabold text-emerald-600">{stats.totalStudy}</h3></div><div className="relative z-10 flex items-center gap-1 text-xs font-bold text-emerald-700"><TrendingUp size={14} /><span>{stats.studyTrend}</span></div><Clock className="absolute right-[-10px] bottom-[-10px] w-20 h-20 text-emerald-200 opacity-20 rotate-12" /></div>
               <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group"><div className="relative z-10"><p className="text-blue-800 font-bold text-sm mb-1">Pomodoro Sessions</p><div className="flex items-baseline gap-1"><h3 className="text-3xl font-extrabold text-blue-600">{stats.pomodoroCompleted}</h3><span className="text-blue-400 font-bold text-sm">/{stats.pomodoroTarget}</span></div></div><div className="relative z-10 text-xs text-blue-700 font-medium">Target Recommended</div><CheckCircle className="absolute right-[-10px] bottom-[-10px] w-20 h-20 text-blue-200 opacity-20 rotate-12" /></div>
               <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group"><div className="relative z-10"><p className="text-orange-800 font-bold text-sm mb-1">Quizzes Completed</p><h3 className="text-3xl font-extrabold text-orange-600">{stats.quizTaken}</h3></div><div className="relative z-10 text-xs text-orange-700 font-medium">Target: {stats.quizTarget}</div><FileText className="absolute right-[-10px] bottom-[-10px] w-20 h-20 text-orange-200 opacity-20 rotate-12" /></div>
               <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group"><div className="relative z-10"><p className="text-purple-800 font-bold text-sm mb-1">Modules Finished</p><h3 className="text-3xl font-extrabold text-purple-600">{stats.modulesCompleted || 0}</h3></div><div className="relative z-10 text-xs text-purple-700 font-medium">Keep progressing!</div><Layers className="absolute right-[-10px] bottom-[-10px] w-20 h-20 text-purple-200 opacity-20 rotate-12" /></div>
          </div>

          {/* INSIGHTS SECTION (DENGAN TOMBOL SAY MORE) */}
          <div className="mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-primary" />
              <h3 className="text-xl font-bold text-gray-800">AI Learning Insights</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.insights && user.insights.map((insight, index) => {
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
                                <h4 className={`font-bold text-base capitalize text-gray-800 ${getTextHoverColor(insight.color)} transition-colors`}>{insight.title}</h4>
                                {insight.category && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${getIconStyle(insight.color)} bg-opacity-20`}>{insight.category}</span>}
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed">{insight.desc}</p>
                          </div>
                      </div>
                      
                      {/* TOMBOL SAY MORE */}
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
      </div>

      {/* --- MODAL DETAIL INSIGHT (PERBAIKAN Z-INDEX & POSISI) --- */}
      {isModalOpen && selectedInsight && (
        // Wrapper Utama: fixed, menutupi seluruh layar, z-index SANGAT TINGGI
        <div className="fixed top-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center p-4 animate-fade-in">
          
          {/* Overlay Gelap: fixed, menutupi seluruh layar di belakang modal */}
          <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-sm cursor-pointer" onClick={handleCloseModal}></div>
          
          {/* Konten Modal: relative agar berada di atas overlay */}
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-[100000] overflow-hidden animate-scale-in max-h-[85vh] flex flex-col">
              
              {/* Header Modal */}
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
              
              {/* Body Modal (Scrollable) */}
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