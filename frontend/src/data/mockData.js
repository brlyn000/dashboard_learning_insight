// src/data/mockData.js
import { TrendingUp, Clock, Award, Lightbulb } from 'lucide-react';

export const dataTimeSpent = [
  { name: 'S', fullName: 'Sunday', hours: 2.5 },
  { name: 'M', fullName: 'Monday', hours: 6.5 },
  { name: 'T', fullName: 'Tuesday', hours: 4.5 },
  { name: 'W', fullName: 'Wednesday', hours: 9 },
  { name: 'T', fullName: 'Thursday', hours: 2.5 },
  { name: 'F', fullName: 'Friday', hours: 5 },
  { name: 'S', fullName: 'Saturday', hours: 1 },
];

export const BAR_COLORS = ['#fca5a5', '#a5f3fc', '#fde047', '#e879f9', '#86efac', '#fda4af', '#a7f3d0'];

export const dataCompletion = [
  { name: 'Completed', value: 67 }, { name: 'In Progress', value: 13 }, { name: 'Not Started', value: 20 },
];
export const DONUT_COLORS = ['#2ebf91', '#fbbf24', '#e5e7eb']; 

export const dataQuiz = [
  { name: 'Week 1', score: 10 },
  { name: 'Week 2', score: 45 },
  { name: 'Week 3', score: 65 },
  { name: 'Week 4', score: 88 },
];

export const insightsData = [
  { title: "Great Progress!", desc: "Your quiz scores have improved by 21% over the past month.", icon: TrendingUp, color: "bg-green-100 text-green-600 border-green-200" },
  { title: "Optimal Learning Time", desc: "You're most productive between 2-4 PM.", icon: Clock, color: "bg-blue-100 text-blue-600 border-blue-200" },
  { title: "Consistency Achievement", desc: "You've maintained a 7-day learning streak!", icon: Award, color: "bg-purple-100 text-purple-600 border-purple-200" },
  { title: "Suggestion", desc: "Try reviewing materials from 2 weeks ago.", icon: Lightbulb, color: "bg-orange-100 text-orange-600 border-orange-200" }
];