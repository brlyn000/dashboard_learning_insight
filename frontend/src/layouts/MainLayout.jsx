import React, { useState, useEffect } from 'react';
import { LayoutDashboard, BookOpen, Bell, ChevronDown, LogOut, X } from 'lucide-react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import api from '../services/api'; // Import API
import { getIcon } from '../utils/iconMap'; // Import Konverter Ikon

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State User & Loading
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  // --- FUNGSI FETCH USER DARI API ---
  const fetchUser = async (username) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/dashboard/${username}`);
      const userData = response.data;

      // TRANSFORMASI IKON (String Database -> Komponen React)
      if (userData.persona) {
        userData.persona.icon = getIcon(userData.persona.icon);
      }
      
      if (userData.insights) {
        userData.insights = userData.insights.map(item => ({
          ...item,
          icon: getIcon(item.icon)
        }));
      }

      if (userData.notifications) {
        userData.notifications = userData.notifications.map(item => ({
          ...item,
          icon: getIcon(item.icon)
        }));
      }

      setCurrentUser(userData);
      // Simpan user terakhir yang aktif di localStorage agar tidak hilang saat refresh
      localStorage.setItem('currentUser', username); 
    } catch (error) {
      console.error("Gagal ambil data user:", error);
      navigate('/'); // Jika gagal/user tidak ada, tendang ke login
    } finally {
      setIsLoading(false);
    }
  };

  // --- CEK LOGIN SAAT PERTAMA BUKA (MOUNT) ---
  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
        fetchUser(loggedInUser); // Ambil data user yang tersimpan
    } else {
        navigate('/'); // Belum login? Ke halaman login
    }
  }, []);

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

  // Sync Timer ke LocalStorage
  useEffect(() => {
    localStorage.setItem('pomo_time', timeLeft);
    localStorage.setItem('pomo_active', isActive);
    localStorage.setItem('pomo_mode', mode);
    localStorage.setItem('pomo_session', sessionCount);
  }, [timeLeft, isActive, mode, sessionCount]);

  // Timer Countdown
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Reset Timer saat data user berhasil dimuat (Ganti User)
  useEffect(() => {
    if (currentUser && currentUser.pomodoro) {
      setIsActive(false);
      setMode('focus');
      setTimeLeft(currentUser.pomodoro.focusTime * 60);
    }
  }, [currentUser]);

  // Data Context untuk dikirim ke Dashboard & Children
  const pomodoroData = {
    timeLeft, setTimeLeft,
    isActive, setIsActive,
    mode, setMode,
    sessionCount, setSessionCount,
    user: currentUser, // Data user dikirim ke sini
    handleResetTime: () => {
       setIsActive(false);
       if(!currentUser) return;
       setTimeLeft(mode === 'focus' ? currentUser.pomodoro.focusTime * 60 : currentUser.pomodoro.restTime * 60);
    },
    handleResetSession: () => {
       setIsActive(false);
       setMode('focus');
       setSessionCount(1);
       if(currentUser) setTimeLeft(currentUser.pomodoro.focusTime * 60);
    }
  };

  // UI Helpers
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

  // Tampilan Loading
  if (isLoading || !currentUser) {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
    );
  }

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
            
            {/* NOTIFIKASI (REAL DATA) */}
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
                            {currentUser.notifications && currentUser.notifications.map((notif, index) => {
                                const Icon = notif.icon; // Ikon sudah dikonversi
                                return (
                                    <div key={index} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer flex gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                                            {Icon && <Icon size={18} />}
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

            {/* PROFILE & SWITCHER (REAL API) */}
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
                        {/* HARDCODE "STUDENT" UNTUK SEMUA USER SESUAI PERMINTAAN */}
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Student</p>
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}/>
                </button>
                
                {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up origin-top-right">
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                            <p className="text-xs text-gray-500">Signed in as</p>
                            <p className="font-bold text-sm text-gray-800 truncate">{currentUser.name}</p>
                        </div>
                        
                        {/* SWITCHER USER 4 TOMBOL (SESUAI PERMINTAAN: BUJANG, SARAH, BUDI, NEWBIE) */}
                        <div className="p-3 border-b border-gray-50">
                            <p className="text-[10px] text-gray-400 px-1 mb-2 uppercase font-bold tracking-wide">Switch Persona:</p>
                            <div className="grid grid-cols-2 gap-2">
                                {['Bujang', 'Sarah', 'Budi', 'Newbie'].map(u => (
                                    <button 
                                        key={u} 
                                        onClick={() => { 
                                            fetchUser(u); 
                                            setShowUserMenu(false); 
                                        }} 
                                        className={`text-xs py-1.5 rounded-lg border font-medium transition-all ${
                                            currentUser.name === u 
                                            ? 'bg-primary text-white border-primary shadow-sm' 
                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                        }`}
                                    >
                                        {u}
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

        {/* Render Anak-anak (Dashboard) dengan Data API */}
        <Outlet context={pomodoroData} />
      </main>
    </div>
  );
};

export default MainLayout;