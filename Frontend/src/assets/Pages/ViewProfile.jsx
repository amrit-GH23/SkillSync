import React, { useState, useEffect } from 'react';
import { ChevronRight, User, Plus, X, Sparkles, Check } from 'lucide-react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ViewProfile = () => {
  const [bio, setBio] = useState('');
  const [skillHave, setSkillHave] = useState([]);
  const [skillWant, setSkillWant] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [access, setToken] = useState("");
  const [profile, setProfile]=useState(null);
  const navigate= useNavigate();
  
    const { id } = useParams();
useEffect(() => {
  const t = localStorage.getItem("access");
  if (!t) {
    navigate("/login");
    return;
  }

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/getProfile/${id}/`, {
        headers: {
          Authorization: `Bearer ${t}`
        }
      });
       const data = response.data;
    setProfile(data);
    setSkillHave(data.skill_have || []);  // Use keys that match your backend
    setSkillWant(data.skill_want || []);
    setMounted(true);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  fetchProfile();
}, [id]); 



  if (!profile) {
    return <div className="text-center mt-8 text-red-500">No profile data found.</div>;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-100/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-violet-100/30 to-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 transform transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
           Profile View
          </h1>
          <p className="text-slate-600 text-lg">Share your skills and aspirations with the community</p>
        </div>

        {/* Form */}
        <form>
        <div 
          className={`bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 transform transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{ animationDelay: '200ms' }}
        >
          {/* Bio Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <label className="text-lg font-semibold text-slate-700">Your Bio</label>
            </div>
            <div className="relative">
              {profile.bio}
            </div>
          </div>

           {/* Skill Have */}
<div className="mb-8">
  <div className="flex items-center gap-2 mb-3">
    <Sparkles className="w-5 h-5 text-indigo-500" />
    <label className="text-lg font-semibold text-slate-700">Skill Have</label>
  </div>
  <div className="relative">
    {skillHave.length > 0
      ? skillHave.map(skill => skill.name).join(", ")
      : "None"}
  </div>
</div>

{/* Skill Want */}
<div className="mb-8">
  <div className="flex items-center gap-2 mb-3">
    <Sparkles className="w-5 h-5 text-indigo-500" />
    <label className="text-lg font-semibold text-slate-700">Skill Want</label>
  </div>
  <div className="relative">
    {skillWant.length > 0
      ? skillWant.map(skill => skill.name).join(", ")
      : "None"}
  </div>
</div>


          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`group relative w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              loading ? 'animate-pulse' : ''
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Starting...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">Chat</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </div>
          </button>          
         </div>
        </form>
      </div>
    </div>
  );
};

export default  ViewProfile