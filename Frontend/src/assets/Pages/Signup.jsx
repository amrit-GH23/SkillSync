import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const navigate=useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/signup/', {
        email,
        username,
        password,
      });
      navigate('/login')
      console.log('Signup successful!', res.data);
      // Optionally redirect or notify
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 px-4">
      <motion.form
        onSubmit={handleSignup}
        initial={{ opacity: 0, scale: 0.9, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl px-8 pt-8 pb-10 w-full max-w-sm"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-blue-600">SkillSync</h2>
          <p className="text-gray-500 text-sm">Create your account</p>
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Choose a Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            id="cpassword"
            type="password"
            placeholder="Create a Password"
            required
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Log in
          </Link>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-200"
        >
          Sign Up
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Signup;
