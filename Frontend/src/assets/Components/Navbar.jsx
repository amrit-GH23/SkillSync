import React, { useState } from 'react';
import { User, MessageCircle, Eye, Users, Search, Filter, Sparkles, Menu, X } from 'lucide-react';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              SkillSync
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-4">
            <button className="p-2 text-slate-600 hover:text-indigo-600 transition-colors duration-200 rounded-lg hover:bg-white/50">
              <Search className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            <button className="p-2 text-slate-600 hover:text-indigo-600 transition-colors duration-200 rounded-lg hover:bg-white/50">
              <Filter className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full"></div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 text-slate-600 hover:text-indigo-600 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-white/20 py-3 space-y-2">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-white/50 rounded-lg transition-colors duration-200">
              <Search className="w-4 h-4" />
              <span className="text-sm font-medium">Search</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-white/50 rounded-lg transition-colors duration-200">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
            </button>
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-slate-700">Profile</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;