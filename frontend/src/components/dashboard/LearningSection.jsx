import React from 'react';
import { BookOpen, TrendingUp, Lightbulb, Award, Clock } from 'lucide-react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { dataQuiz, insightsData } from '../../data/mockData';

const LearningSection = () => {
  return (
    <div className="space-y-8">
        {/* Quiz Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2 text-lg">Quiz Result Progress</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dataQuiz}>
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2ebf91" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#2ebf91" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                        <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" dataKey="score" stroke="#2ebf91" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Learning Category */}
        <div>
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Your Learning Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 p-4 rounded-xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2 text-green-700 font-bold"><BookOpen size={18}/> Consistent Learner</div>
                        <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
                    </div>
                    <p className="text-xs text-gray-600">Users who consistently complete materials daily or weekly.</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-yellow-700 font-bold mb-2"><TrendingUp size={18}/> Fast Learner</div>
                    <p className="text-xs text-gray-600">Users who complete more than 5 materials in one day.</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2 text-purple-700 font-bold"><Lightbulb size={18}/> Reflective Learner</div>
                        <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
                    </div>
                    <p className="text-xs text-gray-600">Users who spend significant time reviewing or re-learning materials.</p>
                </div>
            </div>
        </div>

        {/* Insights */}
        <div>
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Learning Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insightsData.map((item, index) => (
                    <div key={index} className={`p-5 rounded-2xl border flex items-start gap-4 ${item.color.replace('text-', 'bg-opacity-10 border-opacity-50 ')}`}>
                        <div className={`p-3 rounded-full ${item.color.split(' ')[0]}`}>
                            <item.icon size={24} className={item.color.split(' ')[1]} />
                        </div>
                        <div>
                            <h4 className={`font-bold mb-1 ${item.color.split(' ')[1]}`}>{item.title}</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default LearningSection;