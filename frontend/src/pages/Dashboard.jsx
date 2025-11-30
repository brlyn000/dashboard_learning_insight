import React from 'react';
import PersonaCard from '../components/dashboard/PersonaCard';
import PomodoroCard from '../components/dashboard/PomodoroCard';
import WeeklyReport from '../components/dashboard/WeeklyReport'; 
import QuizProgressChart from '../components/dashboard/QuizProgressChart'; // Import Baru
import TimeSpentChart from '../components/dashboard/TimeSpentChart';
import CourseCompletionChart from '../components/dashboard/CourseCompletionChart';
import { useOutletContext } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useOutletContext();

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

        {/* GRID 2: WEEKLY REPORT */}
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
                <CourseCompletionChart data={user.charts.completion} />
            </div>
        </div>

    </div>
  );
};

export default Dashboard;