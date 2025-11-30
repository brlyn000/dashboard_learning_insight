import { TrendingUp, Clock, Award, Lightbulb, Zap, Moon, Sun, BatteryWarning, Bell, MessageCircle, BookOpen } from 'lucide-react';

// --- WARNA & KONSTANTA GLOBAL ---
export const BAR_COLORS = ['#fca5a5', '#a5f3fc', '#fde047', '#e879f9', '#86efac', '#fda4af', '#a7f3d0'];
export const DONUT_COLORS = ['#2ebf91', '#fbbf24', '#e9d5ff', '#fda4af'];

// --- USER PROFILES (LENGKAP DENGAN DATA CHART) ---
export const USER_PROFILES = {
  bujang: {
    name: "Bujang",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bujang",
    persona: {
      title: "FAST MIDNIGHT OWL",
      icon: Moon,
      desc: "You are a Fast Learner who thrives at night! Did you know your intense focus style resembles Nikola Tesla?",
      color: "bg-indigo-600",
      themeColor: "#4f46e5"
    },
    pomodoro: {
      focusTime: 20,
      restTime: 5,
      label: "Adaptive Mode",
      suggestion: "AI Suggestion: Your optimal duration is 20 mins (Fast Pace)."
    },
    insights: [
      { title: "Consistency Achievement!", desc: "You successfully maintained your night-time consistency.", icon: TrendingUp, color: "emerald" },
      { title: "Optimal Learning Time", desc: "You are most active between 11 PM - 1 AM.", icon: Clock, color: "blue" }
    ],
    notifications: [
      { id: 1, title: "Late Night Surge!", message: "It's 11 PM. Ready to learn?", time: "Now", icon: Moon, color: "text-indigo-500 bg-indigo-50" }
    ],
    categories: { consistent: false, fast: true, reflective: false },
    
    // DATA CHART KHUSUS BUJANG
    charts: {
      timeSpent: [
        { name: 'Sun', fullName: 'Sunday', hours: 1.5 },
        { name: 'Mon', fullName: 'Monday', hours: 4.5 },
        { name: 'Tue', fullName: 'Tuesday', hours: 3.0 },
        { name: 'Wed', fullName: 'Wednesday', hours: 8.5 },
        { name: 'Thu', fullName: 'Thursday', hours: 2.0 },
        { name: 'Fri', fullName: 'Friday', hours: 6.0 },
        { name: 'Sat', fullName: 'Saturday', hours: 9.0 },
      ],
      completion: [
        { name: 'Completed', value: 45 },
        { name: 'In Progress', value: 30 },
        { name: 'Not Started', value: 15 },
        { name: 'Not Completed', value: 10 },
      ],
      quiz: [
        { name: 'Week 1', score: 20 }, { name: 'Week 2', score: 50 }, { name: 'Week 3', score: 75 }, { name: 'Week 4', score: 95 },
      ]
    }
  },

  sarah: {
    name: "Sarah",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    persona: {
      title: "CONSISTENT EARLY BIRD",
      icon: Sun,
      desc: "Morning consistency is your key to success. Don't forget breakfast!",
      color: "bg-[#2ebf91]",
      themeColor: "#2ebf91"
    },
    pomodoro: {
      focusTime: 45,
      restTime: 10,
      label: "Deep Focus",
      suggestion: "AI Suggestion: 45 mins focus suits your morning stamina."
    },
    insights: [
      { title: "Energy Management", desc: "Your energy levels are highest in the morning.", icon: Zap, color: "yellow" },
      { title: "Suggestion", desc: "Try complex topics at 8 AM.", icon: Lightbulb, color: "orange" }
    ],
    notifications: [
      { id: 1, title: "Rise and Shine!", message: "Good morning Sarah!", time: "Now", icon: Sun, color: "text-orange-500 bg-orange-50" }
    ],
    categories: { consistent: true, fast: false, reflective: false },

    // DATA CHART KHUSUS SARAH
    charts: {
      timeSpent: [
        { name: 'Sun', fullName: 'Sunday', hours: 5.0 },
        { name: 'Mon', fullName: 'Monday', hours: 5.5 },
        { name: 'Tue', fullName: 'Tuesday', hours: 6.0 },
        { name: 'Wed', fullName: 'Wednesday', hours: 5.5 },
        { name: 'Thu', fullName: 'Thursday', hours: 6.0 },
        { name: 'Fri', fullName: 'Friday', hours: 5.0 },
        { name: 'Sat', fullName: 'Saturday', hours: 4.0 },
      ],
      completion: [
        { name: 'Completed', value: 80 },
        { name: 'In Progress', value: 15 },
        { name: 'Not Started', value: 5 },
        { name: 'Not Completed', value: 0 },
      ],
      quiz: [
        { name: 'Week 1', score: 80 }, { name: 'Week 2', score: 85 }, { name: 'Week 3', score: 88 }, { name: 'Week 4', score: 92 },
      ]
    }
  },

  budi: {
    name: "Budi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    persona: {
      title: "REFLECTIVE THINKER",
      icon: BatteryWarning,
      desc: "You need more time to digest information. Don't rush the process!",
      color: "bg-purple-500",
      themeColor: "#a855f7"
    },
    pomodoro: {
      focusTime: 15,
      restTime: 15,
      label: "Burnout Prevention",
      suggestion: "AI Suggestion: High fatigue detected. Relax mode on."
    },
    insights: [
      { title: "Need Rest", desc: "Take a break.", icon: Award, color: "purple" },
      { title: "Review", desc: "Review last week's materials.", icon: Lightbulb, color: "red" }
    ],
    notifications: [
      { id: 1, title: "Time to Reflect", message: "Review your notes?", time: "1h ago", icon: Lightbulb, color: "text-purple-500 bg-purple-50" }
    ],
    categories: { consistent: false, fast: false, reflective: true },

    // DATA CHART KHUSUS BUDI
    charts: {
      timeSpent: [
        { name: 'Sun', fullName: 'Sunday', hours: 1.0 },
        { name: 'Mon', fullName: 'Monday', hours: 2.0 },
        { name: 'Tue', fullName: 'Tuesday', hours: 0.5 },
        { name: 'Wed', fullName: 'Wednesday', hours: 3.0 },
        { name: 'Thu', fullName: 'Thursday', hours: 1.5 },
        { name: 'Fri', fullName: 'Friday', hours: 2.0 },
        { name: 'Sat', fullName: 'Saturday', hours: 4.0 },
      ],
      completion: [
        { name: 'Completed', value: 30 },
        { name: 'In Progress', value: 40 },
        { name: 'Not Started', value: 20 },
        { name: 'Not Completed', value: 10 },
      ],
      quiz: [
        { name: 'Week 1', score: 40 }, { name: 'Week 2', score: 45 }, { name: 'Week 3', score: 60 }, { name: 'Week 4', score: 55 },
      ]
    }
  }
};

// --- LIST KURSUS ---
export const coursesList = [
  { id: 1, title: "Learn AI Basics", desc: "Dasar AI", totalHours: "12 Jam", deadline: "31 Des 2025", progress: 100, status: "Completed", img: "🤖" },
  { id: 2, title: "Python Programming", desc: "Python Lengkap", totalHours: "24 Jam", deadline: "15 Jan 2026", progress: 25, status: "In Progress", img: "🐍" },
  { id: 3, title: "Machine Learning 101", desc: "ML Dasar", totalHours: "18 Jam", deadline: "20 Feb 2026", progress: 0, status: "Not Started", img: "📊" },
  { id: 4, title: "Advanced Calculus", desc: "Matematika Lanjut", totalHours: "30 Jam", deadline: "10 Nov 2025", progress: 10, status: "Not Completed", img: "📐" },
];