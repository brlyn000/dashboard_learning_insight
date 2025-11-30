import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { CheckCircle, Circle, PlayCircle, ChevronDown, ChevronUp, List, ArrowLeft, FileText, HelpCircle, Clock, Calendar } from 'lucide-react';
import api from '../services/api';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useOutletContext();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState(0); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // State khusus untuk animasi progress bar
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const fetchCourseDetail = async () => {
        if (!user?.id) return;
        try {
            const response = await api.get(`/courses/${id}/detail?userId=${user.id}`);
            setCourse(response.data);
            
            // Trigger animasi setelah data dimuat (delay dikit biar smooth)
            setTimeout(() => {
                setAnimatedProgress(response.data.progress);
            }, 100);

        } catch (error) {
            console.error("Gagal ambil detail", error);
        } finally {
            setLoading(false);
        }
    };
    fetchCourseDetail();
  }, [id, user]);

  const getModuleIcon = (type) => {
      if (type === 'quiz') return <HelpCircle size={16} className="text-orange-400" />;
      if (type === 'submission') return <FileText size={16} className="text-purple-400" />;
      return <PlayCircle size={16} className="text-blue-400" />;
  };

  const ChevronRightIconCustom = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  );

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!course) return <div className="p-10 text-center">Course Not Found</div>;

  const totalModulesCount = course.modules.reduce((acc, sec) => acc + sec.subModules.length, 0);
  const completedModulesCount = course.modules.reduce((acc, sec) => acc + sec.subModules.filter(m => m.isCompleted).length, 0);

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up relative">
        
        {/* TOMBOL BACK */}
        <div>
            <button 
                onClick={() => navigate('/my-courses')} 
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary mb-2 transition-colors w-fit"
            >
                <ArrowLeft size={18} /> Back to Courses
            </button>
        </div>

        <div className="flex gap-6 relative items-start transition-all duration-500 ease-in-out">
        
        {/* TOMBOL BUKA SIDEBAR */}
        {!isSidebarOpen && (
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 bg-primary text-white p-3 rounded-l-2xl shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center group"
            >
                <List size={24} />
            </button>
        )}

        {/* KONTEN UTAMA */}
        <div className="flex-1 min-w-0 transition-all duration-500">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                
                {/* HEADER KURSUS (Judul & Metadata Waktu) */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h1>
                    
                    {/* INFO WAKTU (YANG TADI HILANG) */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                            <Clock size={16} className="text-primary" />
                            <span>{course.totalHours}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                            <Calendar size={16} className="text-primary" />
                            <span>Deadline: {course.deadline}</span>
                        </div>
                    </div>
                </div>

                <div className={`w-full aspect-video bg-gray-900 rounded-2xl flex items-center justify-center relative group cursor-pointer overflow-hidden transition-all duration-700 ${!isSidebarOpen ? 'lg:h-[600px]' : ''}`}>
                    <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop" alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 transition transform group-hover:scale-110 relative z-10" />
                </div>

                <div className="text-gray-600 leading-relaxed text-sm space-y-4">
                    <p>{course.desc || "No description available."}</p>
                </div>
            </div>
        </div>

        {/* SIDEBAR MATERI */}
        <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 transition-all duration-500 ease-in-out sticky top-8 ${isSidebarOpen ? 'w-[350px] opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-10 p-0 border-0'}`}>
            <div className="w-[350px]"> 
                <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2 text-primary font-bold text-lg">
                            <button onClick={() => setIsSidebarOpen(false)} className="bg-green-50 text-primary p-1.5 rounded-lg hover:bg-primary hover:text-white transition">
                                <ChevronRightIconCustom /> 
                            </button>
                            Course Content
                        </div>
                    </div>
                    
                    <div className="mb-1 flex justify-between text-xs font-bold text-gray-500">
                        <span>{course.progress}% Progress</span>
                        <span>{completedModulesCount}/{totalModulesCount}</span>
                    </div>
                    
                    {/* PROGRESS BAR DENGAN ANIMASI */}
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${animatedProgress}%` }} // Pakai state animasi
                        ></div>
                    </div>
                </div>

                <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                    {course.modules?.map((section, index) => (
                        <div key={index}>
                            <button 
                                onClick={() => setExpandedSection(expandedSection === index ? -1 : index)} 
                                className="w-full flex justify-between items-center p-4 hover:bg-gray-50 font-bold text-gray-800 text-sm border-l-4 border-transparent hover:border-primary transition-all"
                            >
                                <span>{section.title}</span>
                                {expandedSection === index ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
                            </button>
                            
                            {expandedSection === index && (
                                <div className="bg-gray-50 px-4 py-2 space-y-1 pb-4 animate-fade-in">
                                    {section.subModules.map((sub, idx) => (
                                        <div key={idx} className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-white cursor-pointer text-sm text-gray-600 transition border border-transparent hover:border-gray-200">
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
                    ))}
                </div>
            </div>
        </div>

        </div>
    </div>
  );
};

export default CourseDetail;