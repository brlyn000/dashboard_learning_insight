import React, { useState, useEffect } from 'react';
import { LayoutDashboard, BookOpen, Bell, ChevronDown, LogOut } from 'lucide-react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Perhatikan titik dua (..) karena naik satu folder

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // --- 1. LOGIKA POMODORO (GLOBAL) ---
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('pomo_time');
    return saved ? parseInt(saved) : 25 * 60;
  });
  
  const [isActive, setIsActive] = useState(() => {
     return localStorage.getItem('pomo_active') === 'true';
  });

  const [mode, setMode] = useState(() => {
    return localStorage.getItem('pomo_mode') || 'focus';
  });

  const [sessionCount, setSessionCount] = useState(() => {
    const saved = localStorage.getItem('pomo_session');
    return saved ? parseInt(saved) : 1;
  });

  useEffect(() => {
    localStorage.setItem('pomo_time', timeLeft);
    localStorage.setItem('pomo_active', isActive);
    localStorage.setItem('pomo_mode', mode);
    localStorage.setItem('pomo_session', sessionCount);
  }, [timeLeft, isActive, mode, sessionCount]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
    audio.play().catch(e => console.log("Audio error", e));

    if (mode === 'focus') {
      if (sessionCount % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(15 * 60);
      } else {
        setMode('shortBreak');
        setTimeLeft(5 * 60);
      }
    } else {
      setMode('focus');
      setTimeLeft(25 * 60);
      setSessionCount((prev) => prev + 1);
    }
  };

  const handleResetTime = () => {
    setIsActive(false);
    if (mode === 'focus') setTimeLeft(25 * 60);
    else if (mode === 'shortBreak') setTimeLeft(5 * 60);
    else setTimeLeft(15 * 60);
  };

  const handleResetSession = () => {
    setIsActive(false);
    setMode('focus');
    setSessionCount(1);
    setTimeLeft(25 * 60);
  };
  // -----------------------------------

  // Logika Judul Halaman
  let pageTitle = 'My Courses';
  if (location.pathname.includes('dashboard')) {
    pageTitle = 'Dashboard';
  } else if (location.pathname.includes('/course/')) { 
    pageTitle = 'Course Detail';
  }

  // Logika Navbar Aktif
  const isDashboardActive = location.pathname.includes('dashboard');
  const isCoursesActive = location.pathname.includes('my-courses') || location.pathname.includes('/course/');

  const getLinkClass = (isActive) => 
    isActive 
      ? "bg-green-50 text-primary border-l-4 border-primary" 
      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800";

  const handleLogout = () => {
    localStorage.removeItem('pomo_time');
    localStorage.removeItem('pomo_active');
    localStorage.removeItem('pomo_mode');
    localStorage.removeItem('pomo_session');
    navigate('/');
  };

  // Data yang dikirim ke anak-anaknya (Dashboard)
  const pomodoroData = {
    timeLeft, setTimeLeft,
    isActive, setIsActive,
    mode, setMode,
    sessionCount, setSessionCount,
    handleResetTime, handleResetSession
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full flex flex-col z-20">
        <div className="p-6 flex flex-col items-center">
           <img src={logo} alt="Nexalar" className="w-16 mb-2" />
           <h1 className="text-xl font-bold text-gray-800">Nexalar</h1>
           <p className="text-xs text-primary text-center">Empowering the Next Intelligence</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${getLinkClass(isDashboardActive)}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/my-courses" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${getLinkClass(isCoursesActive)}`}>
            <BookOpen size={20} /> My Courses
          </Link>
        </nav>
      </aside>

      {/* KONTEN KANAN */}
      <main className="flex-1 ml-64 p-8">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">{pageTitle}</h2>
          
          <div className="flex items-center gap-4">
            <div className="relative p-2 bg-white rounded-full shadow-sm cursor-pointer hover:bg-gray-100">
                <Bell className="text-gray-500" size={20} />
            </div>
            <div className="relative">
                <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-3 hover:bg-white p-2 rounded-xl transition">
                    <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bujang" alt="User" />
                    </div>
                    <div className="text-left hidden md:block">
                        <p className="font-bold text-sm text-gray-700">Bujang</p>
                        <p className="text-xs text-gray-400">Student</p>
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}/>
                </button>
                {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                        <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition">
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                )}
            </div>
          </div>
        </header>

        {/* OUTLET */}
        <Outlet context={pomodoroData} />

      </main>
    </div>
  );
};

export default MainLayout;