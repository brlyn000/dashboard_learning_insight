
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../../services/api';
import { getCourseStatus, getStatusColor } from '../../utils/statusHelper';

const CourseListWidget = ({ user }) => {
  const [activeTab, setActiveTab] = useState('All');
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
        const payload = response.data?.data ?? response.data;

        const processedCourses = (payload || []).map((course) => {
          const progress = typeof course.progress === 'number'
            ? course.progress
            : 0;


          const status =
            course.status ||
            getCourseStatus(
              { deadline: course.deadline },
              progress
            );

          return {
            ...course,
            progress,
            status,
          };
        });

        setCourses(processedCourses);
      } catch (error) {
        console.error('Gagal mengambil kursus:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  const filteredCourses =
    activeTab === 'All'
      ? courses
      : courses.filter((c) => c.status === activeTab);

  const toggleReadMore = (e, courseId) => {
    e.stopPropagation();
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-sm text-gray-400">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 text-base sm:text-lg">My Courses</h3>
      </div>

      {/* Tabs - Scrollable on mobile */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Not Started', 'In Progress', 'Completed', 'Not Completed'].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap flex-shrink-0 ${
                activeTab === tab
                  ? 'bg-primary text-white border-primary'
                  : 'bg-gray-50 text-gray-600 border-gray-200'
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {filteredCourses.length === 0 ? (
        <p className="text-sm text-gray-400">No courses found in this category.</p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {filteredCourses.map((course) => {
            const statusBadgeClass = getStatusColor(course.status);
            const isExpanded = expandedCourseId === course.id;
            const progress = course.progress ?? 0;

            const desc = course.summary || course.description || 'No description available';
            const isLong = desc.length > 120;
            const displayDesc = isLong && !isExpanded ? `${desc.slice(0, 120)}...` : desc;

            return (
              <div
                key={course.id}
                className="p-3 sm:p-4 rounded-xl border border-gray-100 hover:border-primary/40 hover:shadow-md cursor-pointer transition-all"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                {/* Mobile: Stack layout, Desktop: Side by side */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <div className="flex items-start flex-wrap gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800 text-sm flex-1 min-w-0">
                        {course.title}
                      </h4>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${statusBadgeClass}`}
                      >
                        {course.status}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      {displayDesc}
                      {isLong && (
                        <button
                          className="ml-1 text-primary text-[10px] font-semibold inline-flex items-center gap-1"
                          onClick={(e) => toggleReadMore(e, course.id)}
                        >
                          {isExpanded ? (
                            <>
                              Show less <ChevronUp size={10} />
                            </>
                          ) : (
                            <>
                              Read more <ChevronDown size={10} />
                            </>
                          )}
                        </button>
                      )}
                    </p>

                    <div className="flex items-center flex-wrap gap-3 sm:gap-4 mt-3 text-[11px] text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>
                          {course.hoursToStudy || course.hours || 0} hours
                        </span>
                      </div>
                      {course.deadline && (
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span className="truncate">
                            Deadline:{' '}
                            {new Date(course.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress section - Full width on mobile */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-32 sm:w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{progress}%</span>
                    </div>
                    <button className="text-[11px] text-primary font-semibold inline-flex items-center gap-1 whitespace-nowrap">
                      View details <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseListWidget;
