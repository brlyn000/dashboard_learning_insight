import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { dataTimeSpent, BAR_COLORS } from '../../data/mockData'; // Import data

const CustomBarTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-100 text-sm z-50">
        <p className="font-bold text-gray-800 mb-1">{data.fullName}</p>
        <p className="text-primary font-medium">⏳ {data.hours} Hours</p>
      </div>
    );
  }
  return null;
};

const TimeSpentChart = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h3 className="font-bold text-gray-800 mb-6 text-lg">Time Spent Learning (Hours)</h3>
    <div className="h-[392px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataTimeSpent}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
          <Tooltip content={<CustomBarTooltip />} cursor={{fill: '#f9fafb'}} />
          <Bar dataKey="hours" radius={[6, 6, 0, 0]} barSize={32}>
              {dataTimeSpent.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default TimeSpentChart;