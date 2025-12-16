import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, BookOpen, Bell, ChevronDown, LogOut, X, Trash2 } from 'lucide-react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import api from '../services/api';
import { getIcon } from '../utils/iconMap';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State User & Loading
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const fetchUser = async (username) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/dashboard/${username}`);
      const payload = response.data;
      console.log('Dashboard API Response:', payload);

      if (!payload.success) {
        throw new Error(payload.message || 'Failed to fetch dashboard data');
      }

      const userData = payload.user;


      if (userData.persona && userData.persona.icon) {
        userData.persona.icon = getIcon(userData.persona.icon);
      }
      if (userData.insights) {
        userData.insights = userData.insights.map((item) => ({
          ...item,
          icon: getIcon(item.icon),
        }));
      }
      if (userData.notifications) {
        userData.notifications = userData.notifications.map((item) => ({
          ...item,
          icon: getIcon(item.icon),
        }));
      }

      if (!userData.charts) {
        userData.charts = { timeSpent: [], quiz: [], completion: [] };
      }

      setCurrentUser(userData);
      localStorage.setItem('currentUser', username);
    } catch (error) {
      console.error('Failed to fetch user:', error);

      const fallbackUser = {
        id: 1,
        name: username,
        email: `${username.toLowerCase()}@nexalar.com`,
        role: 'student',
        avatar: `https://ui-avatars.com/api/?name=${username}&background=10B981&color=fff`,
        persona: {
          title: username === 'Bujang' ? 'Fast Learner' : username === 'Sarah' ? 'Consistent Learner' : username === 'Budi' ? 'Reflective Learner' : 'New Learner',
          desc: username === 'Bujang' ? 'You grasp concepts quickly and complete tasks efficiently.' : username === 'Sarah' ? 'You have regular study habits with steady progress.' : username === 'Budi' ? 'You prefer deep thinking and thorough understanding.' : 'You are building your learning habits.',
          icon: getIcon(username === 'Bujang' ? 'Zap' : username === 'Sarah' ? 'CheckCircle' : username === 'Budi' ? 'BookOpen' : 'Star'),
          themeColor: username === 'Bujang' ? '#2ebf91' : username === 'Sarah' ? '#334155' : username === 'Budi' ? '#8b5cf6' : '#3b82f6'
        },
        pomodoro: { focusTime: 25, restTime: 5, longRestTime: 15 },
        charts: {
          timeSpent: [
            { name: 'M', fullName: 'Mon', hours: 3.5 },
            { name: 'T', fullName: 'Tue', hours: 2.0 },
            { name: 'W', fullName: 'Wed', hours: 4.0 },
            { name: 'T', fullName: 'Thu', hours: 1.5 },
            { name: 'F', fullName: 'Fri', hours: 3.0 },
            { name: 'S', fullName: 'Sat', hours: 0.5 },
            { name: 'S', fullName: 'Sun', hours: 2.5 },
          ],
          quiz: [
            { name: 'Quiz 1', score: 85 },
            { name: 'Quiz 2', score: 92 },
            { name: 'Quiz 3', score: 78 },
            { name: 'Quiz 4', score: 88 },
            { name: 'Quiz 5', score: 95 },
          ],
          completion: [
            { name: 'Completed', count: 3 },
            { name: 'In Progress', count: 2 },
            { name: 'Not Started', count: 1 },
            { name: 'Not Completed', count: 0 },
          ]
        },
        weeklyStats: {
          totalStudyTime: "12h",
          pomodoroSessions: 8,
          quizzesCompleted: 5,
          modulesFinished: 3,
          engagementScore: 85
        },
        insights: [
          { id: 1, title: 'Consistent Learning', message: 'You study regularly at 9 AM', icon: getIcon('Clock'), color: 'bg-purple-100' }
        ],
        notifications: [
          { id: 1, title: 'Welcome!', message: 'Start your learning journey', icon: getIcon('Bell'), color: 'bg-blue-100', time: '09:30' }
        ]
      };
      setCurrentUser(fallbackUser);
      localStorage.setItem('currentUser', username);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      fetchUser(loggedInUser);
    } else {
      navigate('/');
    }
  }, []);


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
    if (currentUser && currentUser.pomodoro) {
      setIsActive(false);
      setMode('focus');
      setTimeLeft(currentUser.pomodoro.focusTime * 60);
    }
  }, [currentUser]);

const mlNotifGeneratedRef = useRef(false);

useEffect(() => {
  const generateMLNotification = async () => {

    if (!currentUser?.id || mlNotifGeneratedRef.current) return;

    mlNotifGeneratedRef.current = true;
    
    try {
      console.log('Generating ML notification for user:', currentUser.id);
      
      const response = await api.post('/ml/notification', {
        userId: currentUser.id
      });
      

      console.log('ML notification response:', response.data);
    } catch (error) {
      console.log('ML notification skipped:', error.message);
    }
  };
  
  generateMLNotification();
}, [currentUser?.id]);


useEffect(() => {
  mlNotifGeneratedRef.current = false;
}, [currentUser?.name]);



  const pomodoroData = {
    timeLeft, setTimeLeft,
    isActive, setIsActive,
    mode, setMode,
    sessionCount, setSessionCount,
    user: currentUser,
    handleResetTime: () => {
      setIsActive(false);
      if (!currentUser) return;
      setTimeLeft(mode === 'focus' ? currentUser.pomodoro.focusTime * 60 : currentUser.pomodoro.restTime * 60);
    },
    handleResetSession: () => {
      setIsActive(false);
      setMode('focus');
      setSessionCount(1);
      if (currentUser) setTimeLeft(currentUser.pomodoro.focusTime * 60);
    }
  };

  // UI Helpers
  let pageTitle = 'My Courses';
  if (location.pathname.includes('dashboard')) pageTitle = 'Dashboard';
  else if (location.pathname.includes('/course/')) pageTitle = 'Course Detail';

  const isDashboardActive = location.pathname.includes('dashboard');
  const isCoursesActive = location.pathname.includes('my-courses') || location.pathname.includes('/course/');

  const getLinkClass = (isActive) =>
    isActive
      ? "bg-green-50 text-primary border-l-4 border-primary"
      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800";

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };



const handleDeleteNotification = async (notifId) => {
  if (!notifId) return;
  
  try {
    await api.delete(`/ml/notifications/${notifId}`);
    setCurrentUser(prev => ({
      ...prev,
      notifications: prev.notifications?.filter(n => n.id !== notifId) || []
    }));
    
    console.log('Notification deleted from database:', notifId);
  } catch (error) {
    console.error('Failed to delete notification:', error);
    setCurrentUser(prev => ({
      ...prev,
      notifications: prev.notifications?.filter(n => n.id !== notifId) || []
    }));
  }
};



const handleClearAllNotifications = async () => {
  if (!currentUser?.id) return;
  
  try {
    await api.delete(`/ml/notifications/${currentUser.id}/clear-all`);
    setCurrentUser(prev => ({
      ...prev,
      notifications: []
    }));
    
    console.log('All notifications cleared from database');
  } catch (error) {
    console.error('Failed to clear notifications:', error);

    setCurrentUser(prev => ({
      ...prev,
      notifications: []
    }));
  }
};



  if (isLoading || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const unreadCount = currentUser.notifications?.filter(n => !n.isRead).length || 0;

  return (
    <div className="min-h-screen flex bg-[#f3f4f6]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-[220px] bg-white flex flex-col fixed h-full z-50 border-r border-gray-200 transition-transform duration-300 lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>

        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Nexalar" className="w-8 h-8" />
              <div>
                <div className="font-bold text-gray-800 text-lg">Nexalar</div>
                <div className="text-[10px] text-gray-400 leading-tight">Empowering the Next<br/>Intelligence</div>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded transition"
              aria-label="Close menu"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>


        <nav className="flex-1 p-4">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 font-medium transition ${getLinkClass(isDashboardActive)}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/my-courses"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 font-medium transition ${getLinkClass(isCoursesActive)}`}
          >
            <BookOpen size={18} />
            <span>My Courses</span>
          </Link>
        </nav>
      </aside>


      {/* Main Content */}
      <div className="flex-1 lg:ml-[220px] w-full">

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white lg:bg-transparent border-b lg:border-0">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">

            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2 rounded-full hover:bg-gray-200/50 transition"
              >
                <Bell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>


              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  <div className="p-3 border-b flex items-center justify-between bg-gray-50">
                    <span className="font-semibold text-gray-700">Notifications</span>
                    <div className="flex items-center gap-2">
                      {currentUser.notifications?.length > 0 && (
                        <button
                          onClick={handleClearAllNotifications}
                          className="p-1 hover:bg-red-100 rounded text-gray-400 hover:text-red-500 transition"
                          title="Clear all"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifMenu(false)}
                        className="p-1 hover:bg-gray-200 rounded transition"
                      >
                        <X size={16} className="text-gray-500" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-72 overflow-y-auto">
  {currentUser.notifications?.length === 0 ? (
    <div className="p-4 text-center text-gray-400 text-sm">No notifications</div>
  ) : (
    currentUser.notifications?.map((notif) => {
      // Render icon dengan benar
      const IconComponent = notif.icon;
      
      return (
        <div
          key={notif.id}
          className={`p-3 border-b hover:bg-gray-50 flex gap-3 group ${notif.isRead ? 'bg-white' : 'bg-blue-50'}`}
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${notif.color || 'bg-gray-100'}`}>
            {/* Cek apakah icon adalah React element atau component */}
            {React.isValidElement(IconComponent) 
              ? IconComponent 
              : typeof IconComponent === 'function' 
                ? <IconComponent size={16} className="text-gray-600" />
                : <Bell size={16} className="text-gray-600" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm text-gray-800">{notif.title}</div>
            <div className="text-xs text-gray-500 line-clamp-2">{notif.message}</div>
            <div className="text-[10px] text-gray-400 mt-1">{notif.time}</div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleDeleteNotification(notif.id); }}
            className="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded text-gray-400 hover:text-red-500 transition-opacity"
            title="Delete"
          >
            <X size={14} />
          </button>
        </div>
      );
    })
  )}
</div>
                </div>
              )}
            </div>


<div className="relative">
  <button
    onClick={() => setShowUserMenu(!showUserMenu)}
    className="flex items-center gap-2 hover:bg-gray-200/50 p-2 rounded-lg transition"
  >
    <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
    <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
    <ChevronDown size={16} className="text-gray-400" />
  </button>

  {showUserMenu && (
    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">

      <div className="p-3 border-b bg-gray-50">
        <p className="font-semibold text-gray-800">{currentUser.name}</p>
        <p className="text-xs text-gray-500">{currentUser.email}</p>
        <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">
          {currentUser.persona?.title || 'Learner'}
        </span>
      </div>
      

      <div className="p-2 border-b">
        <p className="text-[10px] text-gray-400 uppercase tracking-wide px-2 mb-2">Switch Persona</p>
        {['Bujang', 'Sarah', 'Budi', 'Newbie'].map(name => {
          const isCurrentUser = currentUser.name === name;
          const personaLabels = {
            'Bujang': 'Fast Learner',
            'Sarah': 'Consistent Learner', 
            'Budi': 'Reflective Learner',
            'Newbie': 'New Learner'
          };
          const avatarColors = {
            'Bujang': '10B981',
            'Sarah': '334155',
            'Budi': '8b5cf6',
            'Newbie': '3b82f6'
          };
          
          return (
            <button
              key={name}
              onClick={() => {
                if (!isCurrentUser) {
                  setShowUserMenu(false);
                  fetchUser(name);
                }
              }}
              disabled={isCurrentUser}
              className={`w-full px-2 py-2 text-left text-sm rounded-lg flex items-center gap-3 transition ${
                isCurrentUser 
                  ? 'bg-green-50 text-green-700 cursor-default' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <img 
                src={`https://ui-avatars.com/api/?name=${name}&background=${avatarColors[name]}&color=fff`} 
                alt={name} 
                className="w-8 h-8 rounded-full" 
              />
              <div className="flex-1">
                <div className="font-medium">{name}</div>
                <div className="text-[10px] text-gray-400">{personaLabels[name]}</div>
              </div>
              {isCurrentUser && (
                <span className="text-[10px] text-green-600">●</span>
              )}
            </button>
          );
        })}
      </div>
      

      <button
        onClick={handleLogout}
        className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </div>
  )}
</div>

          </div>
        </div>


        {/* Main Content Area */}
        <main className="px-4 sm:px-6 pb-6">
          <Outlet context={pomodoroData} />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
