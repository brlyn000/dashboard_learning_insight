import React from 'react';
import { Star } from 'lucide-react';

const PersonaCard = ({ user, className = "" }) => {
  // 1. Ambil data LANGSUNG dari props (Data Backend)
  const persona = user?.persona || {};

  // 2. Validasi sederhana: Jika data backend masih loading/kosong
  // Tampilkan state loading/default, TAPI datanya tetap dari prop 'user'
  const title = persona.title || "LOADING PROFILE...";
  const desc = persona.desc || "Fetching data from server...";
  const bgColor = persona.themeColor || "#334155"; // Default Slate jika backend gagal kirim warna
  
  // Icon sudah dikonversi di MainLayout, jadi langsung pakai
  const Icon = persona.icon || Star;

  return (
    <div 
      className={`rounded-2xl p-8 text-white shadow-lg relative overflow-hidden h-full flex flex-col justify-center ${className}`}
      style={{ backgroundColor: bgColor }} 
    >
      
      <div className="relative z-10 mb-4 opacity-90 font-medium tracking-wide text-sm flex items-center gap-2">
         <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">Your Persona</span>
         <span>•</span>
         <span>Analysis Result</span>
      </div>

      <div className="relative z-10">
        <h3 className="text-3xl md:text-4xl font-extrabold uppercase leading-tight mb-4">
          {title}
        </h3>
        
        <p className="text-sm md:text-base opacity-90 leading-relaxed max-w-lg">
            {desc}
        </p>
      </div>

      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 p-6 rounded-full backdrop-blur-sm z-10 hidden md:block">
        <Icon size={64} className="text-white" />
      </div>
      
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-black opacity-10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default PersonaCard;