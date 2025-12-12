
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api'; // Import authService

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('bujang@nexalar.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {

        await authService.login(email, password);
        

        navigate('/dashboard');
    } catch (err) {
        setError('Login gagal. Cek email/password Anda.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full font-sans">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <div className="w-full max-w-md flex flex-col items-center">
          
          <img src={logo} alt="Nexalar Logo" className="w-20 mb-2" />
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Nexalar</h1>
          <p className="text-primary text-sm mb-10 font-medium">Empowering the Next Intelligence</p>

          <div className="w-full flex flex-col gap-4">
            <h2 className="text-left text-primary font-semibold text-lg mb-2">Sign In</h2>
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  required
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  required
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-40 mx-auto mt-6 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition duration-300 shadow-lg shadow-green-200 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>
            

            <div className="mt-4 text-xs text-gray-400 text-center">
                Try: bujang@nexalar.com / 123
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 bg-primary relative flex-col justify-center items-center text-white overflow-hidden">

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