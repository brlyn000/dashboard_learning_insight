import React from 'react';

// REFACTOR: Warna sekarang statis (Hijau Brand), tidak mengikuti persona
const WelcomeCard = ({ user, className = "" }) => (
  <div className={`bg-[#2ebf91] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden h-full flex flex-col justify-center ${className}`}>
    <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h3>
        <p className="opacity-90 text-sm leading-relaxed">
            {user.persona.desc}
        </p>
    </div>
    
    {/* Hiasan */}
    <div className="absolute right-[-10px] top-[-10px] w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
  </div>
);

export default WelcomeCard;