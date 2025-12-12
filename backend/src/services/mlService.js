

import axios from 'axios';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';
const ML_API_KEY = process.env.ML_API_KEY || 'nexalar-ml-api-key-2025';


const mlClient = axios.create({
  baseURL: ML_SERVICE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'X-API-Key': ML_API_KEY,
    'Content-Type': 'application/json'
  }
});


const handleMLError = (error, operation) => {
  console.error(`[ML Service Error - ${operation}]:`, error.message);

  if (error.response) {
    return {
      success: false,
      error: error.response.data?.detail || 'ML Service error',
      status: error.response.status
    };
  } else if (error.request) {
    return {
      success: false,
      error: 'ML Service tidak dapat dijangkau. Cek koneksi.',
      status: 503
    };
  } else {
    return {
      success: false,
      error: error.message,
      status: 500
    };
  }
};


export const predictPersona = async (features) => {
  try {
    const response = await mlClient.post('/predict/persona', {
      features: features
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return handleMLError(error, 'Predict Persona');
  }
};


export const predictPersonaFromWeekly = async (payload) => {
  try {
    const response = await mlClient.post('/predict/persona/from-weekly', payload);

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return handleMLError(error, 'Predict Persona From Weekly');
  }
};


export const generateNotification = async (userId, persona, userData) => {
  try {
    const response = await mlClient.post('/notification/generate', {
      user_id: userId,
      persona: persona,
      user_data: userData
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return handleMLError(error, 'Generate Notification');
  }
};


export const generateInsights = async (weeklyData, persona) => {
  try {
    const response = await mlClient.post('/insight/weekly', {
      weekly_data: weeklyData,
      persona: persona
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return handleMLError(error, 'Generate Insights');
  }
};


export const getPomodoroRecommendation = async (persona) => {
  try {

    const response = await mlClient.get(`/pomodoro/recommend?persona=${persona}`);
    

    if (!response.data) {
      const postResponse = await mlClient.post('/pomodoro/recommend', {
        persona: persona
      });
      return {
        success: true,
        data: postResponse.data
      };
    }
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Pomodoro recommendation error:', error);
    

    const defaultRecommendations = {
      'fast_learner': { focus_minutes: 25, rest_minutes: 5, rationale: 'Classic Pomodoro - Quick bursts of focused work' },
      'consistent_learner': { focus_minutes: 30, rest_minutes: 5, rationale: 'Extended focus - Steady learning rhythm' },
      'reflective_learner': { focus_minutes: 45, rest_minutes: 10, rationale: 'Deep work - Extended concentration periods' },
      'new_learner': { focus_minutes: 20, rest_minutes: 5, rationale: 'Gentle start - Building focus habits' }
    };
    
    const recommendation = defaultRecommendations[persona] || defaultRecommendations['new_learner'];
    
    return {
      success: true,
      data: recommendation
    };
  }
};


export const checkMLServiceHealth = async () => {
  try {
    const response = await mlClient.get('/health');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return handleMLError(error, 'Health Check');
  }
};

export default {
  predictPersona,
  predictPersonaFromWeekly,
  generateNotification,
  generateInsights,
  getPomodoroRecommendation,
  checkMLServiceHealth
};