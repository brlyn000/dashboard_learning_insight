import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const coursesData = [
  { id: 1, title: "Learn AI Basics", progress: 100, status: "Completed", img: "🤖" },
  { id: 2, title: "Getting started programming with Python", progress: 25, status: "In Progress", img: "🐍" },
  { id: 3, title: "Learn Machine learning for beginners", progress: 0, status: "Not Started", img: "📊" },
];

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredCourses = activeTab === "All" 
    ? coursesData 
    : coursesData.filter(c => c.status === activeTab);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* TABS */}
      <div className="bg-white p-1.5 rounded-xl inline-flex w-full md:w-auto shadow-sm border border-gray-100">
        {["All", "Not Started", "In Progress", "Completed"].map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab 
                    ? "bg-primary text-white shadow-md" 
                    : "text-gray-500 hover:text-gray-800"
                }`}
            >
                {tab}
            </button>
        ))}
      </div>

      {/* LIST COURSE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
        {filteredCourses.map((course) => (
            <div key={course.id} className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                    {course.img}
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h3 className="font-bold text-gray-800">{course.title}</h3>
                </div>
                <div className="w-full md:w-48 flex items-center gap-3">
                    <span className="text-sm font-bold w-10">{course.progress}%</span>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${course.progress === 100 ? 'bg-primary' : (course.progress > 0 ? 'bg-primary' : 'bg-gray-200')}`} 
                            style={{ width: `${course.progress}%` }}
                        ></div>
                    </div>
                </div>
                {course.status === "Completed" ? (
                    <button className="px-6 py-2 border border-primary text-primary rounded-full text-sm font-semibold hover:bg-green-50 transition">
                        Print Certificate
                    </button>
                ) : (
                    <Link to={`/course/${course.id}`} className="px-6 py-2 border border-primary text-primary rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition">
                        View Course
                    </Link>
                )}
            </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;