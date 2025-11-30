import React from 'react';
import CourseListWidget from '../components/dashboard/CourseListWidget';
import { useOutletContext } from 'react-router-dom';

const MyCourses = () => {
  const { user } = useOutletContext();

  return (
    <div className="animate-fade-in-up space-y-6">
      <CourseListWidget user={user} />
    </div>
  );
};

export default MyCourses;