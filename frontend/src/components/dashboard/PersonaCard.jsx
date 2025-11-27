import React from 'react';

// Terima prop className dan tambahkan h-full pada div utama
const PersonaCard = ({ persona, className = "" }) => {
  const Icon = persona.icon;

  return (
    <div className={`${persona.color} rounded-2xl p-6 text-white shadow-lg relative overflow-hidden flex items-center justify-between h-full ${className}`}>
      <div className="relative z-10 max-w-[80%]">
        <h3 className="text-xl font-bold uppercase tracking-wide mb-1">{persona.title}</h3>
      </div>
      <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm z-10">
        <Icon size={32} className="text-white" />
      </div>

      {/* Hiasan */}
      <div className="absolute left-[-10px] bottom-[-20px] w-24 h-24 bg-white opacity-10 rounded-full blur-lg"></div>
    </div>
  );
};

export default PersonaCard;