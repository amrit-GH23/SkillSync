import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_URL;


const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate= useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  }, [password]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== cpassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    const payload={
       email,
       password,
       username
    }

    setLoading(true);

    try {
      const response=  await axios.post(`${API_BASE_URL}/api/signup/`,payload)
       localStorage.setItem("access",response.data.access)
       localStorage.setItem("refresh",response.data.refresh)
       navigate("/createProfile")
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
    setLoading(false);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-400';
    if (passwordStrength === 2) return 'bg-yellow-400';
    if (passwordStrength === 3) return 'bg-blue-400';
    return 'bg-green-400';
  };


  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };


  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-100/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-violet-100/30 to-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-md mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 transform transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            SkillSync
          </h1>
          <p className="text-slate-600">Create your account to get started</p>
        </div>

        {/* Form */}
        <div 
          className={`bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 transform transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{ animationDelay: '200ms' }}
        >
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <User className="w-4 h-4" />
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-indigo-400 focus:outline-none transition-all duration-200 text-slate-700 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-indigo-400 focus:outline-none transition-all duration-200 text-slate-700 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-indigo-400 focus:outline-none transition-all duration-200 text-slate-700 placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                          i < passwordStrength ? getPasswordStrengthColor() : 'bg-slate-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600">
                    Password strength: <span className="font-medium">{getPasswordStrengthText()}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <CheckCircle className="w-4 h-4" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-200 text-slate-700 placeholder-slate-400 ${
                    cpassword && password !== cpassword 
                      ? 'border-red-300 focus:border-red-400' 
                      : cpassword && password === cpassword
                      ? 'border-green-300 focus:border-green-400'
                      : 'border-slate-200 focus:border-indigo-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {cpassword && (
                <div className="mt-2 flex items-center gap-2">
                  {password === cpassword ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-xs text-red-600 font-medium">Passwords don't match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSignup}
              disabled={loading || !username || !email || !password || !cpassword || password !== cpassword}
              className={`group relative w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                loading ? 'animate-pulse' : ''
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">Sign Up</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </div>
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-slate-200">
              <p className="text-slate-600">
                Already have an account?{' '}
                <button className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200 hover:underline"
                  onClick={(e)=>{navigate("/login")}}
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className={`mt-8 grid grid-cols-3 gap-4 transform transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ animationDelay: '400ms' }}>
          {[
            { icon: User, text: 'Connect with peers' },
            { icon: CheckCircle, text: 'Track your progress' },
            { icon: ArrowRight, text: 'Grow your skills' }
          ].map((feature, index) => (
            <div key={index} className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <feature.icon className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
              <p className="text-xs text-slate-600 font-medium">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signup;