import React from 'react';
// Kita gunakan kembali komponen yang sudah jadi agar tampilan konsisten
import CourseListWidget from '../components/dashboard/CourseListWidget';

const MyCourses = () => {
  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Karena CourseListWidget sudah punya fitur Tab Filter dan List Kursus,
          kita tinggal panggil saja di sini. Praktis!
      */}
      <CourseListWidget />
    </div>
  );
};

export default MyCourses;