import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const PomodoroCard = ({ user }) => {
  const { timeLeft, isActive, setIsActive, mode, sessionCount, setTimeLeft, setMode, setSessionCount } = useOutletContext();
  const [showResetMenu, setShowResetMenu] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Reset Logic using User Data
  const handleLocalResetTime = () => {
    setIsActive(false);
    if (mode === 'focus') {
        setTimeLeft(user.pomodoro.focusTime * 60);
    } else {
        setTimeLeft(user.pomodoro.restTime * 60);
    }
    setShowResetMenu(false);
  };

  const handleLocalResetSession = () => {
    setIsActive(false);
    setMode('focus');
    setSessionCount(1);
    setTimeLeft(user.pomodoro.focusTime * 60);
    setShowResetMenu(false);
  };

  return (
    <div className={`h-full rounded-2xl text-white text-center shadow-lg relative flex flex-col justify-center transition-colors duration-500 ${mode === 'focus' ? 'bg-[#2ebf91] shadow-green-200' : 'bg-blue-500 shadow-blue-200'}`}>
        
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-0">
             <div className="absolute right-[-10px] top-[-10px] w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
             <div className="absolute left-[-10px] bottom-[-10px] w-24 h-24 bg-white opacity-5 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 p-6">
            <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-lg">Adaptive Pomodoro</span>
                <div className="bg-black/20 rounded-full px-3 py-1 text-xs font-bold">
                    {mode === 'focus' ? `#${sessionCount}` : 'Rest'}
                </div>
            </div>

            <div className="bg-black/10 inline-flex rounded-full p-1 mb-6 w-full max-w-[200px] mx-auto relative">
                <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full transition-all duration-300 ${mode === 'focus' ? 'left-1' : 'left-[calc(50%+4px)]'}`}></div>
                <div className={`flex-1 text-xs font-bold py-1.5 rounded-full transition-colors z-10 ${mode === 'focus' ? 'text-[#2ebf91]' : 'text-white opacity-70'}`}>Focus</div>
                <div className={`flex-1 text-xs font-bold py-1.5 rounded-full transition-colors z-10 ${mode !== 'focus' ? 'text-blue-500' : 'text-white opacity-70'}`}>Rest</div>
            </div>

            <div className="text-6xl font-bold mb-2 font-mono tracking-tighter">
                {formatTime(timeLeft)}
            </div>

            <p className="text-[10px] opacity-90 mb-8 px-2 font-medium min-h-[20px]">
                ✨ {user?.pomodoro?.suggestion}
            </p>

            <div className="flex justify-center gap-3 items-center">
                <button onClick={() => setIsActive(!isActive)} className="bg-white font-bold px-6 py-2 rounded-xl hover:bg-white/90 transition shadow-sm w-32" style={{ color: mode === 'focus' ? '#2ebf91' : '#3b82f6' }}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                
                <div className="relative">
                    <button 
                        onClick={() => setShowResetMenu(!showResetMenu)} 
                        className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-xl transition"
                    >
                        <ChevronDown size={20} className={`transition-transform ${showResetMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {showResetMenu && (
                        <div className="absolute bottom-full right-0 mb-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 text-left animate-fade-in-up">
                            <button onClick={handleLocalResetTime} className="w-full px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-100 transition-colors">
                                Reset Time
                            </button>
                            <button onClick={handleLocalResetSession} className="w-full px-4 py-3 hover:bg-red-50 text-sm text-red-500 font-medium transition-colors">
                                Reset Session
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default PomodoroCard;