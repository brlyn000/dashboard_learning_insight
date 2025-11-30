import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../../services/api';

const CourseListWidget = ({ user }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        const response = await api.get(`/courses/${user.id}`);
        setCourses(response.data);
      } catch (error) {
        console.error("Gagal mengambil kursus:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  const filteredCourses = activeTab === "All" 
    ? courses 
    : courses.filter(c => c.status === activeTab);

  const getStatusColor = (status) => {
    switch(status) {
        case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
        case 'In Progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case 'Not Started': return 'bg-purple-100 text-purple-700 border-purple-200';
        case 'Not Completed': return 'bg-red-100 text-red-700 border-red-200';
        default: return 'bg-gray-100 text-gray-700';
    }
  };

  const toggleReadMore = (e, courseId) => {
    e.stopPropagation();
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h3 className="font-bold text-gray-800 text-lg">My Courses</h3>
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                {["All", "Not Started", "In Progress", "Completed", "Not Completed"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                            activeTab === tab 
                            ? "bg-primary text-white shadow-sm" 
                            : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        <div className="space-y-4">
            {filteredCourses.map((course) => {
                const isExpanded = expandedCourseId === course.id;
                const description = course.desc || "No description available.";
                const isLong = description.length > 100;
                const displayDesc = isExpanded ? description : (isLong ? description.substring(0, 100) + "..." : description);

                return (
                    <div 
                        key={course.id} 
                        // NAVIGASI KE HALAMAN DETAIL DENGAN ID KURSUS
                        onClick={() => navigate(`/course/${course.id}`)} 
                        className="border border-gray-100 rounded-xl p-5 hover:bg-gray-50 transition cursor-pointer group relative overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row gap-5 items-start">
                            <div className="w-14 h-14 bg-white border rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform">
                                {course.img || "📚"}
                            </div>
                            <div className="flex-1 w-full">
                                <div className="flex justify-between items-start">
                                    <div className="w-full pr-20">
                                        <h4 className="font-bold text-gray-800 text-base group-hover:text-primary transition-colors">
                                            {course.title}
                                        </h4>
                                        <div className="text-xs text-gray-500 mt-1">
                                            <p className="inline">{displayDesc}</p>
                                            {isLong && (
                                                <button 
                                                    onClick={(e) => toggleReadMore(e, course.id)}
                                                    className="ml-1 text-primary font-bold hover:underline focus:outline-none inline-flex items-center"
                                                >
                                                    {isExpanded ? "Show Less" : "Read More"}
                                                    {isExpanded ? <ChevronUp size={12} className="ml-0.5"/> : <ChevronDown size={12} className="ml-0.5"/>}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`text-[10px] px-2 py-1 rounded-full border font-bold flex-shrink-0 ml-2 ${getStatusColor(course.status)}`}>
                                        {course.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 mt-3 mb-3 text-xs text-gray-400 font-medium">
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>{course.totalHours}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>Deadline: {course.deadline}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${course.status === 'Not Completed' ? 'bg-red-300' : 'bg-primary'}`} 
                                            style={{ width: `${course.progress || 0}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-600 font-bold min-w-[30px] text-right">
                                        {course.progress || 0}%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300">
                            <ArrowRight size={24} />
                        </div>
                    </div>
                );
            })}
            {filteredCourses.length === 0 && (
                <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-xl">
                    <p className="text-gray-400 text-sm">No courses found.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default CourseListWidget;