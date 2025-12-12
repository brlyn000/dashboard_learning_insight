// frontend/src/components/dashboard/CourseCompletionChart.jsx
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../services/api';

const STATUS_COLORS = {
  Completed: '#10B981',
  'In Progress': '#F59E0B',
  'Not Started': '#A78BFA',
  'Not Completed': '#EF4444',
};

const CustomDonutTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0];
    const name = d.name;
    const count = d.payload.count; // jumlah kursus
    const percentage = d.payload.value; // persen
    return (
      <div className="bg-white p-3 rounded-xl shadow-2xl border border-gray-100 text-sm z-[9999]">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: d.payload.fill }}
          />
          <span className="font-bold text-gray-700">{name}</span>
        </div>
        <div className="text-primary font-bold">{count} course{count !== 1 ? 's' : ''}</div>
        <div className="text-xs text-gray-500">({percentage}%)</div>
      </div>
    );
  }
  return null;
};

const CourseCompletionChart = ({ user }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null); // Untuk klik
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        const response = await api.get(`/courses/${user.id}`);
        const payload = response.data?.data ?? response.data;
        setCourses(Array.isArray(payload) ? payload : []);
      } catch (error) {
        console.error('Failed to fetch courses for chart:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center text-gray-400 text-sm">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
        <p>Loading course data...</p>
      </div>
    );
  }

  // Hitung jumlah kursus per status dari data yang sama dengan MyCourses
  const statusCounts = {
    'Completed': 0,
    'In Progress': 0,
    'Not Started': 0,
    'Not Completed': 0
  };

  courses.forEach(course => {
    const status = course.status || 'Not Started';
    if (statusCounts.hasOwnProperty(status)) {
      statusCounts[status] += 1;
    }
  });

  const totalCount = courses.length || 1;

  // Siapkan data untuk chart
  const chartData = Object.entries(statusCounts)
    .filter(([_, count]) => count > 0)
    .map(([name, count]) => ({
      name,
      count,
      value: Math.round((count / totalCount) * 100),
      fill: STATUS_COLORS[name] || '#E5E7EB',
    }));

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center text-gray-400 text-sm">
        <p>No course data available</p>
      </div>
    );
  }

  const onPieEnter = (_, index) => {
    if (selectedIndex === null) {
      setActiveIndex(index);
    }
  };
  
  const onPieLeave = () => {
    if (selectedIndex === null) {
      setActiveIndex(null);
    }
  };

  const handlePieClick = (_, index) => {
    if (selectedIndex === index) {
      // Klik lagi untuk reset
      setSelectedIndex(null);
      setActiveIndex(null);
    } else {
      // Klik untuk memilih
      setSelectedIndex(index);
      setActiveIndex(index);
    }
  };

  const handleLegendClick = (index) => {
    handlePieClick(null, index);
  };

  // Tentukan data yang aktif
  const activeItem = selectedIndex !== null ? chartData[selectedIndex] : 
                     (activeIndex !== null ? chartData[activeIndex] : null);

  // Hitung total persentase completion
  const totalCompletionPercent = chartData.find(item => item.name === 'Completed')?.value || 0;
  const totalCompletedCount = chartData.find(item => item.name === 'Completed')?.count || 0;

  const centerValue = activeItem
    ? `${activeItem.count}` // Tampilkan jumlah kursus
    : `${totalCompletedCount}`; // Default tampilkan jumlah completed

  const centerLabel = activeItem ? activeItem.name : 'COMPLETED';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      <h3 className="font-bold text-gray-800 mb-4 text-lg">Course Completion</h3>

      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
        {/* center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
          <span className="text-4xl font-extrabold text-gray-800 transition-all duration-300 leading-none">
            {centerValue}
          </span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2">
            {centerLabel}
          </span>
        </div>

        {/* chart */}
        <div className="relative z-10 w-full h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                cornerRadius={5}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                onClick={handlePieClick}
                className="cursor-pointer focus:outline-none"
                activeIndex={selectedIndex !== null ? selectedIndex : activeIndex}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    stroke="none"
                    className="hover:opacity-80 transition-opacity outline-none"
                    opacity={
                      (selectedIndex === null && activeIndex === null) ||
                      (selectedIndex === index) || 
                      (selectedIndex === null && activeIndex === index) 
                        ? 1 : 0.3
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                content={<CustomDonutTooltip />}
                cursor={{ fill: 'transparent' }}
                wrapperStyle={{ zIndex: 1000, outline: 'none' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* legend */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-6">
        {chartData.map((entry, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 p-1.5 rounded-lg cursor-pointer transition-all ${
              selectedIndex === index || activeIndex === index ? 'bg-gray-50' : ''
            }`}
            onMouseEnter={() => onPieEnter(null, index)}
            onMouseLeave={onPieLeave}
            onClick={() => handleLegendClick(index)}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
              style={{ backgroundColor: entry.fill }}
            />
            <span className="text-xs text-gray-600 font-medium truncate">
              {entry.name}
            </span>
            <span className="text-xs text-gray-400 ml-auto">
              {entry.count} {/* Tampilkan jumlah kursus di legend */}
            </span>
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <div className="text-xs text-gray-500">
          Total: <span className="font-semibold text-gray-700">{totalCount} courses</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Click on chart segments or legend to focus
        </div>
      </div>
    </div>
  );
};

export default CourseCompletionChart;