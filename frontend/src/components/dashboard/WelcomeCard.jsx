import React from 'react';

const WelcomeCard = () => (
  <div className="bg-primary rounded-2xl p-8 text-white shadow-lg shadow-green-200/50 relative overflow-hidden">
    <div className="relative z-10">
        <h3 className="text-3xl font-bold mb-2">Welcome Bujang!</h3>
        <p className="opacity-90 text-lg">Hope your learning activities are enjoyable.</p>
    </div>
    <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
  </div>
);

export default WelcomeCard;