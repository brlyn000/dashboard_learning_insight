import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { dataCompletion, DONUT_COLORS } from '../../data/mockData';

const CourseCompletionChart = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-auto flex flex-col">
      <h3 className="font-bold text-gray-800 mb-2 text-lg">Course Completion</h3>
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
          <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                  <Pie data={dataCompletion} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" cornerRadius={5}>
                      {dataCompletion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} stroke="none" />
                      ))}
                  </Pie>
                  <Tooltip wrapperStyle={{ zIndex: 100 }} itemStyle={{ color: '#333' }} />
              </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-gray-800">67%</span>
              <span className="text-xs text-gray-400 font-medium">Completed</span>
          </div>
      </div>
      <div className="flex justify-center gap-4 mt-2">
          {dataCompletion.map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: DONUT_COLORS[index]}}></div>
                  <span className="text-xs text-gray-500">{entry.name}</span>
              </div>
          ))}
      </div>
  </div>
);

export default CourseCompletionChart;