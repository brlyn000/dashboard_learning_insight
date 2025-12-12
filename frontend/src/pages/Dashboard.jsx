import React from 'react';
import PersonaCard from '../components/dashboard/PersonaCard';
import PomodoroCard from '../components/dashboard/PomodoroCard';
import WeeklyReport from '../components/dashboard/WeeklyReport'; 
import QuizProgressChart from '../components/dashboard/QuizProgressChart';
import TimeSpentChart from '../components/dashboard/TimeSpentChart';
import CourseCompletionChart from '../components/dashboard/CourseCompletionChart';
import { useOutletContext } from 'react-router-dom';

const Dashboard = () => {
  const pomodoroContext = useOutletContext();
  const user = pomodoroContext?.user;

  if (!user || !user.persona || !user.charts) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up relative pb-10"> 
        
        {/* GRID 1: TOP HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch h-auto lg:h-[350px]">
          <div className="lg:col-span-2 h-full">
            <PersonaCard user={user} className="w-full h-full" />
          </div>
          <div className="h-full">
            <PomodoroCard user={user} />
          </div>
        </div>

        {/* GRID 2: WEEKLY REPORT (WITH INTEGRATED ML INSIGHTS) */}
        <WeeklyReport user={user} />

        {/* BARIS BARU: QUIZ CHART (Full Width) */}
        <div className="w-full">
            <QuizProgressChart data={user.charts.quiz} />
        </div>

        {/* GRID 3: CHARTS LAINNYA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <TimeSpentChart data={user.charts.timeSpent} />
            </div>
            <div>
                {/* PERUBAHAN DI SINI: Ganti data dengan user */}
                <CourseCompletionChart user={user} />
            </div>
        </div>

    </div>
  );
};

export default Dashboard;