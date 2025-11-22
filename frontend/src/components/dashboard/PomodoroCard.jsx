import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const PomodoroCard = () => {
  // Ambil data dari Layout (Context)
  const { timeLeft, isActive, setIsActive, mode, sessionCount, handleResetTime, handleResetSession } = useOutletContext();
  const [showResetMenu, setShowResetMenu] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`p-6 rounded-2xl text-white text-center shadow-lg transition-colors duration-500 relative ${mode === 'focus' ? 'bg-primary shadow-green-200' : 'bg-blue-500 shadow-blue-200'}`}>
        <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-lg">Pomodoro</span>
            <div className="bg-black/20 rounded-full px-3 py-1 text-xs font-bold">#{sessionCount}</div>
        </div>
        <div className="bg-black/10 inline-flex rounded-full p-1 mb-6 w-full max-w-[200px] relative">
            <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full transition-all duration-300 ${mode === 'focus' ? 'left-1' : 'left-[calc(50%+4px)]'}`}></div>
            <button className={`flex-1 relative z-10 text-xs font-bold py-1.5 rounded-full transition-colors ${mode === 'focus' ? 'text-primary' : 'text-white opacity-70'}`}>Focus</button>
            <button className={`flex-1 relative z-10 text-xs font-bold py-1.5 rounded-full transition-colors ${mode !== 'focus' ? 'text-blue-500' : 'text-white opacity-70'}`}>Rest</button>
        </div>
        <div className="text-6xl font-bold mb-2 font-mono tracking-tighter">{formatTime(timeLeft)}</div>
        <p className="text-sm opacity-90 mb-8 font-medium">{mode === 'focus' ? 'Time to focus!' : 'Take a break'}</p>
        <div className="flex justify-center gap-3 items-center relative">
            <button onClick={() => setIsActive(!isActive)} className="bg-white text-primary font-bold px-6 py-2 rounded-xl hover:bg-green-50 transition shadow-sm w-24" style={{ color: mode === 'focus' ? '#2ebf91' : '#3b82f6' }}>{isActive ? 'Pause' : 'Start'}</button>
            <div className="relative">
                <button onClick={() => setShowResetMenu(!showResetMenu)} className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-xl transition"><ChevronDown size={20} className={`transition-transform ${showResetMenu ? 'rotate-180' : ''}`} /></button>
                {showResetMenu && (
                    <div className="absolute bottom-full right-0 mb-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 text-left text-gray-700">
                        <button onClick={() => { handleResetTime(); setShowResetMenu(false); }} className="w-full px-4 py-2 hover:bg-gray-50 text-sm">Reset Time</button>
                        <button onClick={() => { handleResetSession(); setShowResetMenu(false); }} className="w-full px-4 py-2 hover:bg-gray-50 text-sm text-red-500">Reset Session</button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default PomodoroCard;