// File: frontend/src/services/api.js
// Respon-ID: pengecekan_file_31 - COMPLETE WITH NOTIFICATIONS

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.get(
          `${API_BASE_URL}/auth/refresh`,
          { withCredentials: true }
        );
        const newToken = refreshResponse.data.token;
        if (newToken) {
          localStorage.setItem('token', newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

// ============================
// AUTH SERVICES
// ============================
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('currentUser', response.data.user.name);
    }
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      window.location.href = '/';
    }
  },
  refreshToken: async () => {
    const response = await api.get('/auth/refresh');
    return response.data;
  },
};

// ============================
// DASHBOARD SERVICES
// ============================
export const dashboardService = {
  getDashboardData: async (username) => {
    const response = await api.get(`/dashboard/${username}`);
    return response.data;
  },
};

// ============================
// POMODORO SERVICES
// ============================
export const pomodoroService = {
  saveSession: async (sessionData) => {
    const response = await api.post('/pomodoro/session', sessionData);
    return response.data;
  },
  updatePreference: async (userId, preference) => {
    const response = await api.put(`/pomodoro/preference/${userId}`, preference);
    return response.data;
  },
  getHistory: async (userId, limit = 20) => {
    const response = await api.get(`/pomodoro/history/${userId}?limit=${limit}`);
    return response.data;
  },
};

// ============================
// COURSE SERVICES
// ============================
export const courseService = {
  getUserCourses: async (userId) => {
    const response = await api.get(`/courses/${userId}`);
    return response.data;
  },
  getCourseDetail: async (courseId, userId) => {
    const response = await api.get(`/courses/${courseId}/detail`, {
      params: { userId }
    });
    return response.data;
  },
};

// ============================
// ML SERVICES
// ============================
export const mlService = {
  generateInsights: async (userId) => {
    const response = await api.post('/ml/insights', { userId });
    return response.data;
  },
  predictPersona: async (userId) => {
    const response = await api.post(`/ml/predict-persona/${userId}`);
    return response.data;
  },
  getPomodoroRecommendation: async (userId) => {
    const response = await api.post(`/ml/pomodoro/${userId}`);
    return response.data;
  },
  checkHealth: async () => {
    const response = await api.get('/ml/health');
    return response.data;
  },
};

// ============================
// WEEKLY REPORT SERVICES
// ============================
export const weeklyReportService = {
  getCurrentWeeklyReport: async (userId) => {
    const response = await api.get(`/weekly-reports/${userId}/current`);
    return response.data;
  },
};

// ============================
// NOTIFICATION SERVICES (NEW)
// ============================
export const notificationService = {
  // Get all notifications for user
  getAll: async (userId) => {
    const response = await api.get(`/notifications/${userId}`);
    return response.data;
  },
  
  // Delete single notification
  delete: async (notificationId) => {
    const response = await api.delete(`/notifications/${notificationId}`);
    return response.data;
  },
  
  // Clear all notifications for user
  clearAll: async (userId) => {
    const response = await api.delete(`/notifications/user/${userId}/clear`);
    return response.data;
  },
  
  // Mark single notification as read
  markAsRead: async (notificationId) => {
    const response = await api.patch(`/notifications/${notificationId}/read`);
    return response.data;
  },
  
  // Mark all notifications as read
  markAllAsRead: async (userId) => {
    const response = await api.patch(`/notifications/user/${userId}/read-all`);
    return response.data;
  },
  
  // Generate personal notification from ML
  generatePersonal: async (userId) => {
    const response = await api.post(`/notifications/generate/${userId}`);
    return response.data;
  },
};

// ============================
// DEFAULT EXPORT
// ============================
export default api;
