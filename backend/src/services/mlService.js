// File: backend/src/services/mlService.js
/**
 * ML Service Client
 * Handles all communication with ML microservice
 */

import axios from 'axios';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';
const ML_API_KEY = process.env.ML_API_KEY || 'nexalar-ml-api-key-2025';

// Axios instance with default config
const mlClient = axios.create({
  baseURL: ML_SERVICE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'X-API-Key': ML_API_KEY,
    'Content-Type': 'application/json'
  }
});

// Error handler
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

/**
 * Predict user learning persona (old features-based endpoint)
 * @param {Object} features - 18 user behavior features
 * @returns {Object} { persona, confidence }
 */
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

/**
 * Predict user persona from weekly reports (NEW)
 * @param {Object} payload - { user_id, user_email, weekly_reports: [...] }
 * @returns {Object} { persona, confidence, features }
 */
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

/**
 * Generate personalized notification
 * @param {String} userId - User ID
 * @param {String} persona - User persona type
 * @param {Object} userData - User activity data
 * @returns {Object} { type, message, best_time_hour, priority }
 */
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

/**
 * Generate weekly insights
 * @param {Object} weeklyData - Weekly activity metrics
 * @param {String} persona - User persona
 * @returns {Object} Weekly insights with recommendations
 */
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

/**
 * Get pomodoro recommendation
 * @param {String} persona - User persona
 * @returns {Object} { focus_minutes, rest_minutes, rationale }
 *
 * NOTE: Update untuk endpoint yang benar sesuai dengan persona.py
 */
export const getPomodoroRecommendation = async (persona) => {
  try {
    // Gunakan GET endpoint dengan query parameter
    const response = await mlClient.get(`/pomodoro/recommend?persona=${persona}`);
    
    // Jika GET tidak bekerja, coba POST
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
    
    // Fallback: Default recommendations based on persona
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

/**
 * Health check ML service
 * @returns {Object} Service status
 */
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