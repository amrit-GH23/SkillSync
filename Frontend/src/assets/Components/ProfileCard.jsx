import React, { useState, useEffect } from 'react';
import { MessageCircle, Eye, Search, Sparkles } from 'lucide-react';

const useScreenWidth = () => {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

const ProfileCard = ({ imageUrl, bio, username, skillHave, skillWant, onViewProfile, onChat, index }) => {
  const [mounted, setMounted] = useState(false);
  const width = useScreenWidth();
  const maxVisibleSkills = width < 640 ? 2 : 3;

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-white/20 p-3 sm:p-4 lg:p-6 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group ${
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {/* Profile Header */}
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="relative flex-shrink-0">
          <img
            src="/userss.png"
            alt="Profile"
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover border-2 sm:border-3 border-white shadow-lg"
          />
          <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-green-400 border-2 border-white rounded-full"></div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors duration-200 truncate">
            {username.first_name || 'Anonymous User'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">Connect now</p>
        </div>
      </div>

      {/* Bio */}
      <div className="mb-3 sm:mb-4">
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
          {bio}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col xs:flex-row gap-2">
        <button
          onClick={onViewProfile}
          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg text-sm"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>View Profile</span>
        </button>
        <button
          onClick={onChat}
          className="flex-1 xs:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/80 hover:bg-white border-2 border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 font-medium rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-sm text-sm"
        >
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="xs:inline">Chat</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
