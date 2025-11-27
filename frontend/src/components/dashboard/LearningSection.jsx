import React from 'react';
import { BookOpen, TrendingUp, Lightbulb } from 'lucide-react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LearningSection = ({ user }) => {
  
  return (
    <div className="space-y-8">
        
        {/* 1. LEARNING PROFILE (KATEGORI) */}
        <div>
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Learning Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CategoryCard 
                    title="Consistent" 
                    desc="Completes materials daily." 
                    icon={BookOpen} 
                    isActive={user.categories.consistent} 
                    color="emerald"
                />
                <CategoryCard 
                    title="Fast Learner" 
                    desc="Completes &gt;5 materials/day." 
                    icon={TrendingUp} 
                    isActive={user.categories.fast} 
                    color="yellow"
                />
                <CategoryCard 
                    title="Reflective" 
                    desc="Spends time reviewing." 
                    icon={Lightbulb} 
                    isActive={user.categories.reflective} 
                    color="purple"
                />
            </div>
        </div>

        {/* 2. LEARNING INSIGHTS (VERSI CLEAN) */}
        <div>
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Learning Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.insights.map((item, index) => (
                    <div key={index} className={`p-5 rounded-2xl border flex items-start gap-4 bg-white hover:shadow-sm transition-shadow ${item.color === 'red' ? 'border-red-100 bg-red-50/30' : (item.color === 'emerald' ? 'border-emerald-100 bg-emerald-50/30' : 'border-gray-100')}`}>
                        <div className={`p-3 rounded-full flex-shrink-0 ${getIconBgColor(item.color)}`}>
                            <item.icon size={24} className={getIconColor(item.color)} />
                        </div>
                        <div>
                            <h4 className={`font-bold mb-1 text-gray-800`}>{item.title}</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* 3. QUIZ CHART (DINAMIS DARI USER) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-800 mb-2 text-lg">Quiz Result Progress</h3>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-lg font-bold">Weekly View</span>
            </div>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={user.charts.quiz}>
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

    </div>
  );
};

const CategoryCard = ({ title, desc, icon: Icon, isActive, color }) => {
    const activeClasses = {
        emerald: "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-200",
        yellow: "border-yellow-500 bg-yellow-50 ring-1 ring-yellow-200",
        purple: "border-purple-500 bg-purple-50 ring-1 ring-purple-200",
    };

    return (
        <div className={`border p-4 rounded-xl relative overflow-hidden transition-all duration-300 ${isActive ? activeClasses[color] : 'border-gray-200 bg-white opacity-60 grayscale hover:opacity-100 hover:grayscale-0'}`}>
            <div className="flex justify-between items-center mb-2">
                <div className={`flex items-center gap-2 font-bold ${isActive ? `text-${color}-700` : 'text-gray-600'}`}>
                    <Icon size={18}/> {title}
                </div>
                {isActive && <span className="bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>}
            </div>
            <p className="text-xs text-gray-500">{desc}</p>
        </div>
    );
}

const getIconBgColor = (color) => {
    const map = { emerald: 'bg-emerald-100', red: 'bg-red-100', yellow: 'bg-yellow-100', purple: 'bg-purple-100', blue: 'bg-blue-100', orange: 'bg-orange-100' };
    return map[color] || 'bg-gray-100';
};

const getIconColor = (color) => {
    const map = { emerald: 'text-emerald-600', red: 'text-red-600', yellow: 'text-yellow-600', purple: 'text-purple-600', blue: 'text-blue-600', orange: 'text-orange-600' };
    return map[color] || 'text-gray-600';
};

export default LearningSection;