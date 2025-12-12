// File: frontend/src/App.jsx
// Respon-ID: pengecekan_file_28 - FIXED

import { Routes, Route } from 'react-router-dom';

// Import dari lokasi folder baru (pages & layouts)
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import MyCourses from './pages/MyCourses';
import CourseDetail from './pages/CourseDetail';

function App() {
  return (
    <Routes>
      {/* Halaman Login (Tanpa Sidebar) */}
      <Route path="/login" element={<Login />} />

      {/* Halaman Dalam (Pakai Sidebar & Header) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="course/:id" element={<CourseDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
