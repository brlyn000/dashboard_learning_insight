import React from 'react';
import logo from '../assets/logo.png'; // Path logo disesuaikan
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="flex h-screen w-full font-sans">
      {/* BAGIAN KIRI (FORM) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <div className="w-full max-w-md flex flex-col items-center">
          
          <img src={logo} alt="Nexalar Logo" className="w-20 mb-2" />
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Nexalar</h1>
          <p className="text-primary text-sm mb-10 font-medium">Empowering the Next Intelligence</p>

          <div className="w-full flex flex-col gap-4">
            <h2 className="text-left text-primary font-semibold text-lg mb-2">Sign In</h2>
            
            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
                <button type="submit" className="w-40 mx-auto mt-6 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition duration-300 shadow-lg shadow-green-200">
                  Sign In
                </button>
            </form>
          </div>
        </div>
      </div>

      {/* BAGIAN KANAN (HIJAU) */}
      <div className="hidden md:flex w-1/2 bg-primary relative flex-col justify-center items-center text-white overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 transform rotate-45"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-white opacity-10 transform rotate-12 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full transform translate-x-1/4 translate-y-1/4"></div>

        <div className="z-10 text-center px-10">
            <h2 className="text-4xl font-bold mb-4">Hello, Friend !</h2>
            <div className="w-20 h-1 bg-white mx-auto mb-6 rounded-full"></div>
            <p className="text-lg opacity-90">
                Discover Next Intelligence <br/> with Nexalar
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;