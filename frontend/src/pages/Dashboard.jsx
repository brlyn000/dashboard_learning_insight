import React, { useState, useEffect } from 'react';
import WelcomeCard from '../components/dashboard/WelcomeCard';
import PersonaCard from '../components/dashboard/PersonaCard';
import PomodoroCard from '../components/dashboard/PomodoroCard';
import LearningSection from '../components/dashboard/LearningSection';
import TimeSpentChart from '../components/dashboard/TimeSpentChart';
import CourseCompletionChart from '../components/dashboard/CourseCompletionChart';
import { useOutletContext } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useOutletContext();

  return (
    <div className="space-y-8 animate-fade-in-up relative pb-10"> 
        
        {/* GRID 1: TOP CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex-1 flex">
              <PersonaCard persona={user.persona} className="w-full" />
            </div>
            <div className="flex-1 flex">
              <WelcomeCard user={user} className="w-full" />
            </div>
          </div>
          <div className="h-full">
            <PomodoroCard user={user} />
          </div>
        </div>

        {/* GRID 2: LEARNING SECTION (Insight Simpel & Quiz) */}
        <LearningSection user={user} />

        {/* GRID 3: CHARTS (Dikirim via Props) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                {/* Kirim data spesifik Time Spent */}
                <TimeSpentChart data={user.charts.timeSpent} />
            </div>
            <div>
                {/* Kirim data spesifik Completion */}
                <CourseCompletionChart data={user.charts.completion} />
            </div>
        </div>

    </div>
  );
};

export default Dashboard;