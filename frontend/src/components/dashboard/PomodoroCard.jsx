import React, { useState, useEffect } from 'react';
import { ChevronDown, AlertTriangle, Clock } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { pomodoroService } from '../../services/api';

const DEFAULT_TIMER = { focusTime: 25, restTime: 5, longRestTime: 15 };

const PERSONA_RECOMMENDATIONS = {
  'fast_learner': { focusTime: 30, restTime: 7, longRestTime: 20 },
  'consistent_learner': { focusTime: 30, restTime: 5, longRestTime: 15 },
  'reflective_learner': { focusTime: 35, restTime: 10, longRestTime: 30 },
  'new_learner': { focusTime: 20, restTime: 5, longRestTime: 15 }
};

const PomodoroCard = ({ user }) => {
  const {
    timeLeft, isActive, setIsActive, mode, sessionCount,
    setTimeLeft, setMode, setSessionCount
  } = useOutletContext();

  const [showResetMenu, setShowResetMenu] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [useRecommended, setUseRecommended] = useState(false);
  const [isLongRest, setIsLongRest] = useState(false);

  const getRecommendedTimer = () => {
    const personaType = user?.persona?.type || 'consistent_learner';
    return PERSONA_RECOMMENDATIONS[personaType] || PERSONA_RECOMMENDATIONS['consistent_learner'];
  };

  const getCurrentTimer = () => useRecommended ? getRecommendedTimer() : DEFAULT_TIMER;


  const shouldBeLongRest = (session) => session > 0 && session % 4 === 0;


  const getRestTime = (timer, session) => {
    if (shouldBeLongRest(session)) {
      return timer.longRestTime;
    }
    return timer.restTime;
  };

  useEffect(() => {
    if (user?.pomodoro?.useRecommended !== undefined) {
      setUseRecommended(user.pomodoro.useRecommended);
    }
  }, [user?.pomodoro?.useRecommended]);

  useEffect(() => {
    if (!isActive) {
      const timer = getCurrentTimer();
      if (mode === 'focus') {
        setTimeLeft(timer.focusTime * 60);
      } else {
        const restDuration = getRestTime(timer, sessionCount);
        setTimeLeft(restDuration * 60);
        setIsLongRest(shouldBeLongRest(sessionCount));
      }
    }
  }, [useRecommended]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      setIsActive(false);
      savePomodoroSession();
      const timer = getCurrentTimer();

      if (mode === 'focus') {

        const isLong = shouldBeLongRest(sessionCount);
        const restDuration = isLong ? timer.longRestTime : timer.restTime;
        
        setIsLongRest(isLong);

        if (Notification.permission === 'granted') {
          new Notification('Focus Complete!', {
            body: isLong 
              ? `Great job! Time for a ${restDuration}min long break!` 
              : `Time for a ${restDuration}min short break!`,
            icon: '/favicon.ico'
          });
        }

        setTimeout(() => {
          setMode('rest');
          setTimeLeft(restDuration * 60);
        }, 1000);
      } else {

        if (Notification.permission === 'granted') {
          new Notification('Break Over!', {
            body: 'Ready for next focus session?',
            icon: '/favicon.ico'
          });
        }

        setTimeout(() => {
          setMode('focus');
          setSessionCount(prev => prev + 1);
          setTimeLeft(timer.focusTime * 60);
          setIsLongRest(false);
        }, 1000);
      }
    }
  }, [timeLeft, isActive]);

  const savePomodoroSession = async () => {
    if (!user?.id) return;
    try {
      const timer = getCurrentTimer();
      let duration;
      if (mode === 'focus') {
        duration = timer.focusTime;
      } else {
        duration = isLongRest ? timer.longRestTime : timer.restTime;
      }
      
      await pomodoroService.saveSession({
        userId: user.id,
        durationMinutes: duration,
        journeyId: null
      });
    } catch (error) {
      console.error('Failed to save pomodoro session:', error);
    }
  };

  const handleToggleChange = async () => {
    if (isActive) return;
    const newValue = !useRecommended;
    setUseRecommended(newValue);
    try {
      if (user?.id) {
        const timer = newValue ? getRecommendedTimer() : DEFAULT_TIMER;
        await pomodoroService.updatePreference(user.id, {
          useRecommended: newValue, ...timer
        });
      }
    } catch (error) {
      console.error('Failed to save preference:', error);
    }
  };

  const handleResetClick = (actionType) => {
    setPendingAction(actionType);
    setShowConfirmModal(true);
    setShowResetMenu(false);
  };

  const confirmAction = () => {
    const timer = getCurrentTimer();
    if (pendingAction === 'resetTime') {
      setIsActive(false);
      if (mode === 'focus') {
        setTimeLeft(timer.focusTime * 60);
      } else {
        const restDuration = getRestTime(timer, sessionCount);
        setTimeLeft(restDuration * 60);
      }
    } else if (pendingAction === 'resetSession') {
      setIsActive(false);
      setMode('focus');
      setSessionCount(1);
      setTimeLeft(timer.focusTime * 60);
      setIsLongRest(false);
    }
    setShowConfirmModal(false);
    setPendingAction(null);
  };


  const handleModeClick = (newMode) => {
    if (isActive) return;
    const timer = getCurrentTimer();
    setMode(newMode);
    if (newMode === 'focus') {
      setTimeLeft(timer.focusTime * 60);
    } else {
      const restDuration = getRestTime(timer, sessionCount);
      setTimeLeft(restDuration * 60);
      setIsLongRest(shouldBeLongRest(sessionCount));
    }
  };

  const timer = getCurrentTimer();
  const recommendedTimer = getRecommendedTimer();

  const currentRestTime = mode === 'rest' 
    ? (isLongRest ? timer.longRestTime : timer.restTime)
    : timer.restTime;


  const getModeLabel = () => {
    if (mode === 'focus') {
      return `Focus: ${timer.focusTime} min`;
    }
    if (isLongRest) {
      return `Long Rest: ${timer.longRestTime} min`;
    }
    return `Rest: ${timer.restTime} min`;
  };

  return (
    <>

      <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg h-full flex flex-col justify-between">
        

        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">Adaptive Pomodoro</h3>
          <div className="flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-full text-xs">
            <Clock size={12} />
            <span>Session #{sessionCount}</span>
          </div>
        </div>


        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/90">
            {useRecommended ? `Recommended (${recommendedTimer.focusTime}min)` : 'Default (25min)'}
          </span>
          
          <button
            onClick={handleToggleChange}
            disabled={isActive}
            className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
              isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } ${useRecommended ? 'bg-yellow-400' : 'bg-white/30'}`}
            title={isActive ? 'Stop timer to change' : 'Toggle timer mode'}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
              useRecommended ? 'left-8' : 'left-1'
            }`} />
          </button>
        </div>


        <div className="flex bg-white/20 rounded-xl p-1 mb-3">
          <button
            onClick={() => handleModeClick('focus')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'focus' 
                ? 'bg-white text-emerald-600 shadow'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Focus
          </button>
          <button
            onClick={() => handleModeClick('rest')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'rest' 
                ? 'bg-white text-emerald-600 shadow'
                : 'text-white/80 hover:text-white'
            }`}
          >
            {shouldBeLongRest(sessionCount) ? 'Long Rest' : 'Rest'}
          </button>
        </div>


        <div className="text-center flex-grow flex flex-col justify-center">
          <div className="text-5xl font-bold tracking-wider">{formatTime(timeLeft)}</div>
          <p className="text-white/70 text-sm mt-1">{getModeLabel()}</p>
          

          {mode === 'rest' && isLongRest && (
            <p className="text-yellow-300 text-xs mt-1">🎉 Long break earned!</p>
          )}
        </div>


        <p className="text-center text-xs text-white/60 mb-3">
          ✨ {useRecommended 
            ? `${timer.focusTime}-${timer.restTime}-${timer.longRestTime} optimized for ${user?.persona?.title || 'you'}` 
            : 'Toggle for personalized timer'}
        </p>


        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setIsActive(!isActive)}
            className="w-32 bg-white text-emerald-600 py-2.5 rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg"
          >

            {isActive ? 'Pause' : 'Start'}
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowResetMenu(!showResetMenu)}
              className="bg-white/20 p-2.5 rounded-xl hover:bg-white/30 transition-all"
            >
              <ChevronDown size={18} />
            </button>
            {showResetMenu && (
              <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl overflow-hidden min-w-[140px] z-10">
                <button onClick={() => handleResetClick('resetTime')} className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 text-sm">
                  Reset Time
                </button>
                <button onClick={() => handleResetClick('resetSession')} className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 text-sm border-t">
                  Reset Session
                </button>
              </div>
            )}
          </div>
        </div>
      </div>


      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-5 max-w-xs mx-4 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-yellow-100 rounded-full">
                <AlertTriangle className="text-yellow-600" size={20} />
              </div>
              <h3 className="font-semibold text-gray-800">
                {pendingAction === 'resetTime' ? 'Reset Timer?' : 'Reset Session?'}
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {pendingAction === 'resetTime'
                ? 'Timer will be reset to initial time.'
                : 'Session count will return to 1.'}
            </p>
            <div className="flex gap-2">
              <button onClick={() => { setShowConfirmModal(false); setPendingAction(null); }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
                Cancel
              </button>
              <button onClick={confirmAction}
                className="flex-1 px-3 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm">

                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PomodoroCard;