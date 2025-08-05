import React, { useEffect, useState } from 'react';
import { User, MessageCircle, Eye, Users, Search, Filter, Sparkles, Menu, X } from 'lucide-react';
import NavBar from '../Components/Navbar';
import ProfileCard from '../Components/ProfileCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_URL;


// NavBar Component
// Main Home Component
const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token,setToken]=useState("");
  const navigate= useNavigate();


useEffect(() => {
  const t = localStorage.getItem("access");
  if (!t) {
    navigate("/login");
    return;
  }
  setToken(t);
}, []);

useEffect(() => {
  if (!token) return; // Don't fetch if token is still empty

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/getProfile/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setProfiles(response.data);
    } catch (error) {
      console.error('Fetching profiles failed:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchProfiles();
}, [token]);
  
  console.log(profiles);

  return (
    <div>
      <NavBar/>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-violet-100/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      
      <div className="relative">
        {/* Header Section */}
        <div className={`text-center py-6 sm:py-8 lg:py-12 px-3 sm:px-4 transform transition-all duration-700 `}>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
            Discover Amazing People
          </h1>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-xs sm:max-w-md lg:max-w-2xl mx-auto leading-relaxed">
            Connect with talented individuals, share knowledge, and grow together in our vibrant community
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12 sm:py-20 px-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
              <span className="text-slate-600 font-medium text-sm sm:text-base text-center">Loading amazing profiles...</span>
            </div>
          </div>
        )}

        {/* Profiles Grid */}
        {!loading && (
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 pb-6 sm:pb-8 lg:pb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {profiles.map((profile, index) => (
                <ProfileCard
                  key={profile.id}
                  imageUrl="/user.png"                   
                  username={profile.user}
                  bio={profile.bio}
                  skillHave={profile.skillHave}
                  skillWant={profile.skillWant}
                  onViewProfile={() => navigate(`/viewProfile/${profile.id}`)}
                  onChat={() => navigate(`/chat/${profile.user.id}`)}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && profiles.length === 0 && (
          <div className="text-center py-12 sm:py-20 px-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-slate-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-700 mb-2">No profiles found</h3>
            <p className="text-slate-500 text-sm sm:text-base">Be the first to create a profile and start connecting!</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Home;