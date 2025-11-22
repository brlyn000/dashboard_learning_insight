import React, { useState } from 'react';
import { CheckCircle, Circle, PlayCircle, ChevronDown, ChevronUp, List, ChevronRight } from 'lucide-react';

const CourseDetail = () => {
  const [expandedModule, setExpandedModule] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex gap-6 relative items-start transition-all duration-500 ease-in-out animate-fade-in-up">
      
      {/* TOMBOL BUKA SIDEBAR (FIXED DI KANAN) */}
      {!isSidebarOpen && (
        <button 
            onClick={() => setIsSidebarOpen(true)}
            className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 bg-primary text-white p-3 rounded-l-2xl shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center group"
            title="Open Course Content"
        >
            <List size={24} />
            <span className="absolute right-full mr-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Show Content
            </span>
        </button>
      )}

      {/* KIRI: KONTEN UTAMA */}
      <div className="flex-1 min-w-0 transition-all duration-500">
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
             <div>
                <h1 className="text-2xl font-bold text-gray-900">[Title Materi Utama]</h1>
             </div>

             {/* Video Player */}
             <div className={`w-full aspect-video bg-gray-900 rounded-2xl flex items-center justify-center relative group cursor-pointer overflow-hidden transition-all duration-700 ${!isSidebarOpen ? 'lg:h-[600px]' : ''}`}>
                <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop" alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 transition transform group-hover:scale-110 relative z-10" />
             </div>

             {/* Deskripsi */}
             <div className="text-gray-600 leading-relaxed text-sm space-y-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
                <p>Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Laculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
             </div>
         </div>
      </div>

      {/* KANAN: SIDEBAR MATERI */}
      <div 
        className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 transition-all duration-500 ease-in-out sticky top-8
        ${isSidebarOpen ? 'w-[350px] opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-10 p-0 border-0'}`}
      >
         <div className="w-[350px]"> 
             <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-primary font-bold text-lg">
                        <button 
                            onClick={() => setIsSidebarOpen(false)} 
                            className="bg-green-50 text-primary p-1.5 rounded-lg hover:bg-primary hover:text-white transition"
                            title="Hide Sidebar"
                        >
                            <ChevronRightIconCustom /> 
                        </button>
                        Course Content
                    </div>
                </div>
                <div className="mb-1 flex justify-between text-xs font-bold text-gray-500">
                    <span>40% Progress</span>
                    <span>4/10</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[40%] rounded-full"></div>
                </div>
             </div>

             <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                {/* Modul 1 */}
                <div>
                    <button 
                        onClick={() => setExpandedModule(expandedModule === 1 ? 0 : 1)}
                        className="w-full flex justify-between items-center p-4 hover:bg-gray-50 font-bold text-gray-800 text-sm"
                    >
                        <span>[Modul Title]</span>
                        {expandedModule === 1 ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </button>
                    {expandedModule === 1 && (
                        <div className="bg-gray-50 px-4 py-2 space-y-1 pb-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white cursor-pointer text-sm text-gray-600 transition">
                                    <CheckCircle size={16} className="text-primary" />
                                    <span>[Sub Modul Title]</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Modul 2 */}
                <div>
                    <button 
                        onClick={() => setExpandedModule(expandedModule === 2 ? 0 : 2)}
                        className="w-full flex justify-between items-center p-4 hover:bg-gray-50 font-bold text-gray-800 text-sm"
                    >
                        <span>[Modul Title 2]</span>
                        <span className="text-xs text-gray-400 font-normal mr-2">0/4</span>
                        {expandedModule === 2 ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </button>
                    {expandedModule === 2 && (
                        <div className="bg-gray-50 px-4 py-2 space-y-1 pb-4">
                            {[1, 2].map((item) => (
                                <div key={item} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white cursor-pointer text-sm text-gray-600 transition">
                                    <Circle size={16} className="text-gray-300" />
                                    <span>[Materi Baru]</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
             </div>
         </div>
      </div>

    </div>
  );
};

const ChevronRightIconCustom = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
)

export default CourseDetail;