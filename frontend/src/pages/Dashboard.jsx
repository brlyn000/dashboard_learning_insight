import React from 'react';
import WelcomeCard from '../components/dashboard/WelcomeCard';
import TimeSpentChart from '../components/dashboard/TimeSpentChart';
import PomodoroCard from '../components/dashboard/PomodoroCard';
import CourseCompletionChart from '../components/dashboard/CourseCompletionChart';
import LearningSection from '../components/dashboard/LearningSection';

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in-up"> {/* Tambah animasi dikit */}
        
        {/* GRID ATAS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* KOLOM KIRI */}
          <div className="lg:col-span-2 space-y-6">
            <WelcomeCard />
            <TimeSpentChart />
          </div>

          {/* KOLOM KANAN */}
          <div className="space-y-6">
            <PomodoroCard />
            <CourseCompletionChart />
          </div>

        </div>

        {/* GRID BAWAH */}
        <LearningSection />

    </div>
  );
};

export default Dashboard;