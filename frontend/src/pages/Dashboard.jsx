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
    <div className="space-y-6 md:space-y-8 animate-fade-in-up relative pb-10 px-2 sm:px-0"> 
        
        {/* Persona & Pomodoro Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 items-stretch h-auto lg:h-[350px]">
          <div className="lg:col-span-2 h-full min-h-[280px] sm:min-h-[320px]">
            <PersonaCard user={user} className="w-full h-full" />
          </div>
          <div className="h-full min-h-[280px] sm:min-h-[320px]">
            <PomodoroCard user={user} />
          </div>
        </div>

        {/* Weekly Report */}
        <WeeklyReport user={user} />

        {/* Quiz Progress Chart */}
        <div className="w-full">
            <QuizProgressChart data={user.charts.quiz} />
        </div>

        {/* Time Spent & Course Completion */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2">
                <TimeSpentChart data={user.charts.timeSpent} />
            </div>
            <div>
                <CourseCompletionChart user={user} />
            </div>
        </div>

    </div>
  );
};

export default Dashboard;