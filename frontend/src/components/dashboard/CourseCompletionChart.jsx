import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { DONUT_COLORS } from '../../data/mockData';

const CustomDonutTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0];
      return (
        <div className="bg-white p-2 px-3 rounded-xl shadow-xl border border-gray-100 text-xs z-50">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.payload.fill }}></div>
             <span className="font-bold text-gray-700">{d.name}</span>
          </div>
          <span className="text-gray-500 font-medium ml-4">{d.value}%</span>
        </div>
      );
    }
    return null;
};

// TERIMA PROPS 'data'
const CourseCompletionChart = ({ data }) => {
  // Hitung nilai Completed untuk teks tengah
  const completedValue = data.find(d => d.name === 'Completed')?.value || 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
        <h3 className="font-bold text-gray-800 mb-4 text-lg">Course Completion</h3>
        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[180px]">
            
            {/* Teks Tengah (z-0) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                <span className="text-2xl font-bold text-gray-800">{completedValue}%</span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Total</span>
            </div>

            {/* Chart (z-10) */}
            <div className="relative z-10 w-full h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                      <Pie 
                          data={data} 
                          innerRadius={55} 
                          outerRadius={75} 
                          paddingAngle={4} 
                          dataKey="value" 
                          cornerRadius={4}
                      >
                          {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} stroke="none" />
                          ))}
                      </Pie>
                      <Tooltip content={<CustomDonutTooltip />} cursor={{ fill: 'transparent' }} />
                  </PieChart>
              </ResponsiveContainer>
            </div>
        </div>
        
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-4">
            {data.map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{backgroundColor: DONUT_COLORS[index]}}></div>
                    <span className="text-[10px] text-gray-500 font-medium truncate">{entry.name}</span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default CourseCompletionChart;