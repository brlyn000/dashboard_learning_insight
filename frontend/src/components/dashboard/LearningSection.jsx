import React from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  Lightbulb, 
  // Import ikon tambahan untuk Insight (Sesuai data backend)
  Zap, 
  Coffee, 
  CheckCircle, 
  Clock, 
  Sunrise, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


const iconMap = {
  'Zap': Zap,
  'Coffee': Coffee,
  'CheckCircle': CheckCircle,
  'Clock': Clock,
  'Sunrise': Sunrise,
  'BookOpen': BookOpen,
  'TrendingUp': TrendingUp,
  'Lightbulb': Lightbulb,
  'Warning': AlertTriangle
};

const LearningSection = ({ user }) => {

  if (!user || !user.categories || !user.insights) return null;

  return (
    <div className="space-y-8">
        

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
                    desc="Completes >5 materials/day." 
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


        <div>
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Learning Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.insights.map((item, index) => {

                    const IconComponent = iconMap[item.icon] || Info; 
                    
                    return (
                        <div key={index} className={`p-5 rounded-2xl border flex items-start gap-4 bg-white hover:shadow-sm transition-shadow ${getBorderColor(item.color)}`}>
                            <div className={`p-3 rounded-full flex-shrink-0 ${getIconBgColor(item.color)}`}>
                                <IconComponent size={24} className={getIconColor(item.color)} />
                            </div>
                            <div>
                                <h4 className={`font-bold mb-1 text-gray-800`}>{item.title}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>


        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-800 mb-2 text-lg">Quiz Result Progress</h3>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-lg font-bold">Weekly View</span>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={user.charts?.quiz || []}>
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2ebf91" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#2ebf91" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} domain={[0, 100]} />
                        <Tooltip 
                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                            cursor={{ stroke: '#2ebf91', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area type="monotone" dataKey="score" stroke="#2ebf91" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

    </div>
  );
};



const CategoryCard = ({ title, desc, icon: Icon, isActive, color }) => {

    const styles = {
        emerald: {
            active: "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-200",
            text: "text-emerald-700"
        },
        yellow: {
            active: "border-yellow-500 bg-yellow-50 ring-1 ring-yellow-200",
            text: "text-yellow-700"
        },
        purple: {
            active: "border-purple-500 bg-purple-50 ring-1 ring-purple-200",
            text: "text-purple-700"
        }
    };

    const currentStyle = styles[color] || styles.emerald;

    return (
        <div className={`border p-4 rounded-xl relative overflow-hidden transition-all duration-300 ${isActive ? currentStyle.active : 'border-gray-200 bg-white opacity-60 grayscale hover:opacity-100 hover:grayscale-0'}`}>
            <div className="flex justify-between items-center mb-2">
                <div className={`flex items-center gap-2 font-bold ${isActive ? currentStyle.text : 'text-gray-600'}`}>
                    <Icon size={18}/> {title}
                </div>
                {isActive && <span className="bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>}
            </div>
            <p className="text-xs text-gray-500">{desc}</p>
        </div>
    );
}



const getBorderColor = (colorString) => {

    if (colorString.includes('red')) return 'border-red-100 bg-red-50/50';
    if (colorString.includes('green') || colorString.includes('emerald')) return 'border-emerald-100 bg-emerald-50/50';
    if (colorString.includes('yellow') || colorString.includes('orange')) return 'border-orange-100 bg-orange-50/50';
    if (colorString.includes('purple')) return 'border-purple-100 bg-purple-50/50';
    return 'border-gray-100';
};

const getIconBgColor = (colorString) => {
    if (colorString.includes('red')) return 'bg-red-100';
    if (colorString.includes('green') || colorString.includes('emerald')) return 'bg-emerald-100';
    if (colorString.includes('yellow') || colorString.includes('orange')) return 'bg-orange-100';
    if (colorString.includes('purple')) return 'bg-purple-100';
    return 'bg-gray-100';
};

const getIconColor = (colorString) => {
    if (colorString.includes('red')) return 'text-red-600';
    if (colorString.includes('green') || colorString.includes('emerald')) return 'text-emerald-600';
    if (colorString.includes('yellow') || colorString.includes('orange')) return 'text-orange-600';
    if (colorString.includes('purple')) return 'text-purple-600';
    return 'text-gray-600';
};

export default LearningSection;