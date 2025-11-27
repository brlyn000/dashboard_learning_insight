import React, { useState, useEffect } from 'react';
import { LayoutDashboard, BookOpen, Bell, ChevronDown, LogOut, X } from 'lucide-react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { USER_PROFILES } from '../data/mockData';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState(USER_PROFILES.bujang);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  // --- LOGIKA POMODORO GLOBAL ---
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('pomo_time');
    return saved ? parseInt(saved) : 25 * 60;
  });
  const [isActive, setIsActive] = useState(() => localStorage.getItem('pomo_active') === 'true');
  const [mode, setMode] = useState(() => localStorage.getItem('pomo_mode') || 'focus');
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
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    setIsActive(false);
    setMode('focus');
    setTimeLeft(currentUser.pomodoro.focusTime * 60);
  }, [currentUser]);

  const pomodoroData = {
    timeLeft, setTimeLeft,
    isActive, setIsActive,
    mode, setMode,
    sessionCount, setSessionCount,
    user: currentUser, 
    handleResetTime: () => {
       setIsActive(false);
       setTimeLeft(mode === 'focus' ? currentUser.pomodoro.focusTime * 60 : currentUser.pomodoro.restTime * 60);
    },
    handleResetSession: () => {
       setIsActive(false);
       setMode('focus');
       setSessionCount(1);
       setTimeLeft(currentUser.pomodoro.focusTime * 60);
    }
  };

  let pageTitle = 'My Courses';
  if (location.pathname.includes('dashboard')) pageTitle = 'Dashboard';
  else if (location.pathname.includes('/course/')) pageTitle = 'Course Detail';

  const isDashboardActive = location.pathname.includes('dashboard');
  const isCoursesActive = location.pathname.includes('my-courses') || location.pathname.includes('/course/');
  const getLinkClass = (isActive) => isActive ? "bg-green-50 text-primary border-l-4 border-primary" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800";

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full flex flex-col z-30">
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
        <header className="flex justify-between items-center mb-8 relative z-20">
          <h2 className="text-2xl font-bold text-gray-800">{pageTitle}</h2>
          
          <div className="flex items-center gap-4">
            
            {/* NOTIFICATION */}
            <div className="relative">
                <button 
                    onClick={() => { setShowNotifMenu(!showNotifMenu); setShowUserMenu(false); }}
                    className="relative p-2.5 bg-white rounded-full shadow-sm cursor-pointer hover:bg-gray-100 transition border border-gray-100"
                >
                    <Bell className="text-gray-500" size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                {showNotifMenu && (
                    <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up origin-top-right">
                        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h4 className="font-bold text-gray-800 text-sm">Notifications</h4>
                            <button onClick={() => setShowNotifMenu(false)}><X size={16} className="text-gray-400 hover:text-gray-600"/></button>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                            {currentUser.notifications.map((notif) => {
                                const Icon = notif.icon;
                                return (
                                    <div key={notif.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer flex gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-start w-full">
                                                <h5 className="text-sm font-bold text-gray-800">{notif.title}</h5>
                                                <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{notif.message}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* PROFILE & SWITCHER */}
            <div className="relative">
                <button 
                    onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifMenu(false); }} 
                    className="flex items-center gap-3 hover:bg-white p-1.5 pr-3 rounded-xl transition border border-transparent hover:border-gray-100"
                >
                    <div className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <img src={currentUser.avatar} alt="User" />
                    </div>
                    <div className="text-left hidden md:block">
                        <p className="font-bold text-sm text-gray-700">{currentUser.name}</p>
                        {/* DI SINI PERUBAHANNYA: HARDCODE STUDENT */}
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Student</p>
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}/>
                </button>
                
                {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up origin-top-right">
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                            <p className="text-xs text-gray-500">Signed in as</p>
                            <p className="font-bold text-sm text-gray-800 truncate">{currentUser.name}</p>
                        </div>
                        {/* Switcher */}
                        <div className="p-2 border-b border-gray-50">
                            <p className="text-[10px] text-gray-400 px-2 mb-1">Switch Persona (Demo):</p>
                            <div className="flex gap-1">
                                {['bujang', 'sarah', 'budi'].map(u => (
                                    <button key={u} onClick={() => { setCurrentUser(USER_PROFILES[u]); setShowUserMenu(false); }} className={`flex-1 text-xs py-1 rounded border ${currentUser.name === USER_PROFILES[u].name ? 'bg-primary text-white border-primary' : 'bg-white hover:bg-gray-50'}`}>
                                        {u.charAt(0).toUpperCase() + u.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition">
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                )}
            </div>
          </div>
        </header>

        <Outlet context={pomodoroData} />
      </main>
    </div>
  );
};

export default MainLayout;