// File: backend/prisma/seeds/dataUsers.js

export const users = [
  {
    name: 'Newbie',
    email: 'newbie@nexalar.com',
    password: '123',  // Simple password
    user_role: 'student',
    image_path: null,
    persona_type: 'new_learner',
    ai_persona: null,
    pomodoro_config: { focusTime: 25, restTime: 5, longRestTime: 15 },
    learning_categories: ['web_development']
  },
  {
    name: 'Budi',
    email: 'budi@nexalar.com',
    password: '123',  // Simple password
    user_role: 'student',
    image_path: null,
    persona_type: 'consistent_learner',
    ai_persona: {
      description: 'Learns consistently every day',
      strengths: ['discipline', 'routine'],
      recommendations: ['maintain consistency']
    },
    pomodoro_config: { focusTime: 45, restTime: 10, longRestTime: 20 },
    learning_categories: ['web_development', 'backend']
  },
  {
    name: 'Sarah',
    email: 'sarah@nexalar.com',
    password: '123',  // Simple password
    user_role: 'student',
    image_path: null,
    persona_type: 'reflective_learner',
    ai_persona: {
      description: 'Takes time to deeply understand concepts',
      strengths: ['thoroughness', 'deep_understanding'],
      recommendations: ['allow_extra_time', 'provide_summaries']
    },
    pomodoro_config: { focusTime: 60, restTime: 15, longRestTime: 30 },
    learning_categories: ['algorithms', 'data_structures']
  },
  {
    name: 'Bujang',
    email: 'bujang@nexalar.com',
    password: '123',  // Simple password
    user_role: 'student',
    image_path: null,
    persona_type: 'fast_learner',
    ai_persona: {
      description: 'Learns quickly and completes many modules',
      strengths: ['speed', 'efficiency', 'quick_comprehension'],
      recommendations: ['provide_advanced_challenges']
    },
    pomodoro_config: { focusTime: 90, restTime: 20, longRestTime: 40 },
    learning_categories: ['web_development', 'backend', 'frontend', 'devops']
  },
  {
    name: 'Maya',
    email: 'maya@nexalar.com',
    password: '123',  // Simple password
    user_role: 'student',
    image_path: null,
    persona_type: 'consistent_learner',
    ai_persona: {
      description: 'Steady learner with good pace',
      strengths: ['consistency', 'balance'],
      recommendations: ['maintain_routine']
    },
    pomodoro_config: { focusTime: 50, restTime: 10, longRestTime: 20 },
    learning_categories: ['frontend', 'ui_ux']
  },
  {
    name: 'Alex',
    email: 'alex@nexalar.com',
    password: '123',  // Simple password
    user_role: 'student',
    image_path: null,
    persona_type: 'fast_learner',
    ai_persona: {
      description: 'Quick learner, completes modules rapidly',
      strengths: ['speed', 'adaptability'],
      recommendations: ['provide_harder_content']
    },
    pomodoro_config: { focusTime: 80, restTime: 15, longRestTime: 30 },
    learning_categories: ['full_stack', 'mobile_development']
  }
];