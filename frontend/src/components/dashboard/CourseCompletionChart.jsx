import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { DONUT_COLORS } from '../../utils/constants';

const CustomDonutTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0];
      return (
        // Tambahkan shadow-2xl dan border yang lebih tegas
        <div className="bg-white p-3 rounded-xl shadow-2xl border border-gray-100 text-sm z-[9999]">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.payload.fill }}></div>
             <span className="font-bold text-gray-700">{d.name}</span>
          </div>
          <span className="text-primary font-bold ml-5">{d.value} Courses</span>
        </div>
      );
    }
    return null;
};

const CourseCompletionChart = ({ data }) => {
  const [selectedData, setSelectedData] = useState(null);

  // Hitung Total
  const totalCourses = data.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    if (data && data.length > 0) {
      const completed = data.find(d => d.name === 'Completed');
      setSelectedData(completed || data[0]);
    }
  }, [data]);

  const handlePieClick = (entry) => {
    setSelectedData(entry);
  };

  const centerValue = selectedData ? selectedData.value : 0;
  const centerLabel = selectedData ? selectedData.name : 'Select';
  
  // Hitung Persentase
  const centerPercentage = totalCourses > 0 
    ? Math.round((centerValue / totalCourses) * 100) 
    : 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
        <h3 className="font-bold text-gray-800 mb-4 text-lg">Course Status</h3>
        
        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
            
            {/* TEKS TENGAH (LAYER BAWAH) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
                {/* Angka Besar */}
                <span className="text-4xl font-extrabold text-gray-800 transition-all duration-300 leading-none">
                  {centerPercentage}%
                </span>
                {/* Label di bawahnya (diberi margin-top agar tidak dempet) */}
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2">
                  {centerLabel}
                </span>
            </div>

            {/* CHART (LAYER ATAS) */}
            <div className="relative z-10 w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                      <Pie 
                          data={data} 
                          innerRadius={65} // Sedikit diperbesar agar ruang tengah lega
                          outerRadius={85} 
                          paddingAngle={4} 
                          dataKey="value" 
                          cornerRadius={5}
                          onClick={handlePieClick}
                          className="cursor-pointer focus:outline-none"
                      >
                          {data.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={DONUT_COLORS[index % DONUT_COLORS.length]} 
                                stroke="none"
                                className="hover:opacity-80 transition-opacity outline-none" 
                              />
                          ))}
                      </Pie>
                      
                      {/* PERBAIKAN UTAMA DISINI: wrapperStyle zIndex tinggi */}
                      <Tooltip 
                        content={<CustomDonutTooltip />} 
                        cursor={{ fill: 'transparent' }} 
                        wrapperStyle={{ zIndex: 1000, outline: 'none' }}
                        allowEscapeViewBox={{ x: true, y: true }}
                      />

                  </PieChart>
              </ResponsiveContainer>
            </div>
        </div>
        
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-6">
            {data.map((entry, index) => (
                <button 
                    key={index} 
                    onClick={() => handlePieClick(entry)}
                    className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors text-left ${selectedData?.name === entry.name ? 'bg-gray-50 ring-1 ring-gray-200' : 'hover:bg-gray-50'}`}
                >
                    <div className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" style={{backgroundColor: DONUT_COLORS[index % DONUT_COLORS.length]}}></div>
                    <span className="text-xs text-gray-600 font-medium truncate">{entry.name}</span>
                </button>
            ))}
        </div>
    </div>
  );
};

export default CourseCompletionChart;