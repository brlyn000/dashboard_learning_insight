import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


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


export const dashboardService = {
  getDashboardData: async (username) => {
    const response = await api.get(`/dashboard/${username}`);
    return response.data;
  },
};


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


export const weeklyReportService = {
  getCurrentWeeklyReport: async (userId) => {
    const response = await api.get(`/weekly-reports/${userId}/current`);
    return response.data;
  },
};


export const notificationService = {

  getAll: async (userId) => {
    const response = await api.get(`/notifications/${userId}`);
    return response.data;
  },
  

  delete: async (notificationId) => {
    const response = await api.delete(`/notifications/${notificationId}`);
    return response.data;
  },
  

  clearAll: async (userId) => {
    const response = await api.delete(`/notifications/user/${userId}/clear`);
    return response.data;
  },
  

  markAsRead: async (notificationId) => {
    const response = await api.patch(`/notifications/${notificationId}/read`);
    return response.data;
  },
  

  markAllAsRead: async (userId) => {
    const response = await api.patch(`/notifications/user/${userId}/read-all`);
    return response.data;
  },
  

  generatePersonal: async (userId) => {
    const response = await api.post(`/notifications/generate/${userId}`);
    return response.data;
  },
};


export default api;
