import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { login, signup } from '../api-helpers';
import { useNavigate } from 'react-router-dom';

const LoginRegistrationCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [registrationInfo, setRegistrationInfo] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setPasswordError(''); // Reset error message when switching between forms
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login({
        email: loginInfo.email,
        password: loginInfo.password
    }).then((res) => {
        if(res?.success) {
            localStorage.setItem('token', res.token);
            navigate('/itinerary');
        }  
    })
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    if (registrationInfo.password !== registrationInfo.confirmPassword) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError('');
      signup({
        name: registrationInfo.name,
        email: registrationInfo.email,
        password: registrationInfo.password
      }).then((res) => {
        console.log('Registration Info:', res);
        setIsFlipped(!isFlipped);
      })
      // Proceed with registration logic here
    }
  };

  return (
    <section className="relative w-full h-screen mx-auto pt-56">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Front side - Login form */}
        <div className="max-w-lg mx-auto bg-tertiary p-8 rounded-lg shadow-md items-center">
            <h2 className="text-2xl font-bold text-center mb-4 text-purple-800">Login</h2>
            <form onSubmit={handleLoginSubmit}>
            <label className="block mb-4">
                <span className="text-[#915eff] font-medium">Email:</span>
                <input
                type="email"
                value={loginInfo.email}
                onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
                required
                className="mt-1 block w-full px-3 py-2 bg-blue-100 border border-gray-400 rounded-md shadow-sm text-blue-800 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-blue-600"
                placeholder="Enter your email"
                />
            </label>

            <label className="block mb-4">
                <span className="text-[#915eff] font-medium">Password:</span>
                <input
                type="password"
                value={loginInfo.password}
                onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                required
                className="mt-1 block w-full px-3 py-2 bg-blue-100 border border-gray-400 rounded-md shadow-sm text-blue-800 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-blue-600"
                placeholder="Enter your password"
                />
            </label>

            <button
                type="submit"
                className="mx-auto block py-2 px-4 bg-purple-800 text-white font-semibold rounded-md shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none shadow-primary"
            >
                Login
            </button>
            </form>

            <p className="mt-4 text-center">
            Don't have an account?{' '}
            <button onClick={handleFlip} className="text-[#915eff] hover:underline">
                Sign Up
            </button>
            </p>
        </div>

        {/* Back side - Sign Up form */}
        <div className="max-w-lg mx-auto bg-tertiary p-8 rounded-lg shadow-md items-center">
            <h2 className="text-2xl font-bold text-center mb-4 text-purple-800">Sign Up</h2>
            <form onSubmit={handleRegistrationSubmit}>
            <label className="block mb-4">
                <span className="text-[#915eff] font-medium">Name:</span>
                <input
                type="text"
                value={registrationInfo.name}
                onChange={(e) => setRegistrationInfo({ ...registrationInfo, name: e.target.value })}
                required
                className="mt-1 block w-full px-3 py-2 bg-blue-100 border border-gray-400 rounded-md shadow-sm text-blue-800 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-blue-600"
                placeholder="Enter your name"
                />
            </label>

            <label className="block mb-4">
                <span className="text-[#915eff] font-medium">Email:</span>
                <input
                type="email"
                value={registrationInfo.email}
                onChange={(e) => setRegistrationInfo({ ...registrationInfo, email: e.target.value })}
                required
                className="mt-1 block w-full px-3 py-2 bg-blue-100 border border-gray-400 rounded-md shadow-sm text-blue-800 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-blue-600"
                placeholder="Enter your email"
                />
            </label>

            <label className="block mb-4">
                <span className="text-[#915eff] font-medium">Password:</span>
                <input
                type="password"
                value={registrationInfo.password}
                onChange={(e) => setRegistrationInfo({ ...registrationInfo, password: e.target.value })}
                required
                className="mt-1 block w-full px-3 py-2 bg-blue-100 border border-gray-400 rounded-md shadow-sm text-blue-800 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-blue-600"
                placeholder="Enter your password"
                />
            </label>

            <label className="block mb-4">
                <span className="text-[#915eff] font-medium">Confirm Password:</span>
                <input
                type="password"
                value={registrationInfo.confirmPassword}
                onChange={(e) => setRegistrationInfo({ ...registrationInfo, confirmPassword: e.target.value })}
                required
                className="mt-1 block w-full px-3 py-2 bg-blue-100 border border-gray-400 rounded-md shadow-sm text-blue-800 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-blue-600"
                placeholder="Confirm your password"
                />
            </label>

            {passwordError && <p className="text-red-500 mb-4 text-center">{passwordError}</p>}

            <button
                type="submit"
                className="mx-auto block py-2 px-4 bg-purple-800 text-white font-semibold rounded-md shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none shadow-primary"
            >
                Sign Up
            </button>
            </form>

            <p className="mt-4 text-center">
            Already have an account?{' '}
            <button onClick={handleFlip} className="text-[#915eff] hover:underline">
                Login
            </button>
            </p>
        </div>
        </ReactCardFlip>
    </section>
  );
};

export default LoginRegistrationCard;
