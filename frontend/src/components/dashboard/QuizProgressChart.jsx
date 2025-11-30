import React from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const QuizProgressChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg">Quiz Result Progress</h3>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-lg font-bold">
                Weekly View
            </span>
        </div>
        
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2ebf91" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#2ebf91" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#9ca3af', fontSize: 12}} 
                        dy={10}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#9ca3af', fontSize: 12}} 
                    />
                    <Tooltip 
                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} 
                    />
                    <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#2ebf91" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorScore)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};

export default QuizProgressChart;