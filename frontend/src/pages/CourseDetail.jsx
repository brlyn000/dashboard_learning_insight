import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { 
  CheckCircle, 
  Circle, 
  PlayCircle, 
  ChevronDown, 
  ChevronUp, 
  List, 
  ArrowLeft, 
  FileText, 
  HelpCircle, 
  Clock, 
  Calendar,
  ChevronRight
} from 'lucide-react';
import api from '../services/api';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useOutletContext();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState(0); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!user?.id) {
        console.log('User not found, waiting...');
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(`/courses/${id}/detail`, {
          params: { userId: user.id }
        });

        if (response.data.success) {
          setCourse(response.data.data);
          
          setTimeout(() => {
            setAnimatedProgress(response.data.data.progress || 0);
          }, 100);
        } else {
          console.error('API returned error:', response.data.message);
          setCourse(null);
        }
      } catch (error) {
        console.error('Failed to fetch course detail:', error.response?.data || error.message);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    if (id && user?.id) {
      fetchCourseDetail();
    }
  }, [id, user]);

  const getModuleIcon = (type) => {
    if (type === 'quiz') return <HelpCircle size={16} className="text-orange-400" />;
    if (type === 'submission') return <FileText size={16} className="text-purple-400" />;
    if (type === 'article') return <FileText size={16} className="text-blue-400" />;
    return <PlayCircle size={16} className="text-green-400" />;
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-500">Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-10 text-center">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Course Not Found</h3>
        <button 
          onClick={() => navigate('/my-courses')}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Back to My Courses
        </button>
      </div>
    );
  }

  const totalModulesCount = course.modules.reduce((acc, sec) => acc + sec.subModules.length, 0);
  const completedModulesCount = course.modules.reduce((acc, sec) => acc + sec.subModules.filter(m => m.isCompleted).length, 0);

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up relative">
      {/* Back Button */}
      <div>
        <button 
          onClick={() => navigate('/my-courses')} 
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary mb-2 transition-colors w-fit"
        >
          <ArrowLeft size={18} /> Back to Courses
        </button>
      </div>

      {/* Main Container: Gap is strictly controlled based on Sidebar state */}
      <div className={`flex ${isSidebarOpen ? 'gap-6' : 'gap-0'} relative items-start transition-all duration-500 ease-in-out`}>
        
        {/* Main Content Area */}
        <div className={`flex-1 min-w-0 transition-all duration-500 ${!isSidebarOpen ? 'mr-0' : ''}`}>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            {/* Course Header */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h1>
              
              {/* Time Info */}
              <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Clock size={16} className="text-primary" />
                  <span>{course.totalHours} hours</span>
                </div>
                {course.deadline && (
                  <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <Calendar size={16} className="text-primary" />
                    <span>Deadline: {course.deadline}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>{course.progress}% Complete</span>
                </div>
              </div>
            </div>

            {/* Course Thumbnail */}
            <div className="w-full aspect-video bg-gray-900 rounded-2xl flex items-center justify-center relative group cursor-pointer overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop" 
                alt="Course Thumbnail" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
              />
              <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 transition transform group-hover:scale-110 relative z-10" />
            </div>

            {/* Course Description */}
            <div className="text-gray-600 leading-relaxed text-sm space-y-4">
              <p>{course.desc}</p>
            </div>
          </div>
        </div>

        {/* Sidebar Toggle Button (Floating Button) */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 bg-primary text-white p-3 rounded-l-2xl shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center cursor-pointer"
            aria-label="Open Sidebar"
          >
            <List size={24} />
          </button>
        )}

        {/* Sidebar Content */}
        <div 
          className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 transition-all duration-500 ease-in-out sticky top-8 ${
            isSidebarOpen 
              ? 'w-[350px] opacity-100 translate-x-0' 
              : 'w-0 opacity-0 translate-x-full p-0 border-0 absolute right-0'
          }`}
          style={{ zIndex: isSidebarOpen ? 40 : -1 }}
        >
          {isSidebarOpen && (
            <div className="w-[350px]"> 
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-primary font-bold text-lg">
                    <button 
                      onClick={() => setIsSidebarOpen(false)} 
                      className="bg-green-50 text-primary p-1.5 rounded-lg hover:bg-primary hover:text-white transition"
                    >
                      <ChevronRight size={20} /> 
                    </button>
                    Course Content
                  </div>
                </div>
                
                <div className="mb-1 flex justify-between text-xs font-bold text-gray-500">
                  <span>{course.progress}% Progress</span>
                  <span>{completedModulesCount}/{totalModulesCount}</span>
                </div>
                
                {/* Progress Bar with Animation */}
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${animatedProgress}%` }} 
                  ></div>
                </div>
              </div>

              <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                {course.modules?.map((section, index) => {
                  const completedInSection = section.subModules.filter(m => m.isCompleted).length;
                  const totalInSection = section.subModules.length;

                  return (
                    <div key={index}>
                      <button 
                        onClick={() => setExpandedSection(expandedSection === index ? -1 : index)} 
                        className="w-full flex justify-between items-center p-4 hover:bg-gray-50 font-bold text-gray-800 text-sm border-l-4 border-transparent hover:border-primary transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <span>{section.title}</span>
                          {/* Badge Counter (0/2 format) */}
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            completedInSection === totalInSection 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            {completedInSection}/{totalInSection}
                          </span>
                        </div>
                        
                        {expandedSection === index ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
                      </button>
                      
                      {expandedSection === index && (
                        <div className="bg-gray-50 px-4 py-2 space-y-1 pb-4 animate-fade-in">
                          {section.subModules.map((sub, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-white cursor-pointer text-sm text-gray-600 transition border border-transparent hover:border-gray-200"
                              onClick={() => console.log('Navigate to module:', sub.id)}
                            >
                              <div className="flex items-center gap-3 overflow-hidden">
                                {getModuleIcon(sub.type)}
                                <span className={`truncate ${sub.isCompleted ? "text-gray-400 line-through" : ""}`}>
                                  {sub.title}
                                </span>
                              </div>
                              {sub.isCompleted 
                                ? <CheckCircle size={16} className="text-primary flex-shrink-0" /> 
                                : <Circle size={16} className="text-gray-300 flex-shrink-0" />
                              }
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {(!course.modules || course.modules.length === 0) && (
                  <div className="p-8 text-center">
                    <div className="text-gray-400 mb-2">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">No modules available yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;