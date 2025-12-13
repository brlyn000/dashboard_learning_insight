import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import MyCourses from './pages/MyCourses';
import CourseDetail from './pages/CourseDetail';

function App() {
  return (
    <Routes>
      {/* Halaman Login (Tanpa Sidebar) */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Halaman Dalam (Pakai Sidebar & Header) */}
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/my-courses" element={<MainLayout />}>
        <Route index element={<MyCourses />} />
      </Route>
      <Route path="/course/:id" element={<MainLayout />}>
        <Route index element={<CourseDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
