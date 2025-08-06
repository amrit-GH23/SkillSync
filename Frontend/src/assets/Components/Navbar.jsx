import React, { useContext, useState } from "react";
import {
  User,
  LogOut,
  Eye,
  Users,
  Search,
  Filter,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {
    
  const navigate = useNavigate();
  const {logout} = useAuth(); 

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/favicon.png" alt="logo" width={50} height={50} />
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
             onClick={()=> navigate('/')}>
              SkillSync
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-4">
            <div className="relative group">
              <button className="p-2 text-slate-600 hover:text-indigo-600 transition-colors duration-200 rounded-lg hover:bg-white/50">
                <User className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10"
                onClick={() => navigate('/Myprofile')}>
                My Profile
              </span>
            </div>

            <div className="relative group">
              <button className="p-2 text-slate-600 hover:text-indigo-600 transition-colors duration-200 rounded-lg hover:bg-white/50">
                <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10"
                onClick={logout}>
                Logout
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 text-slate-600 hover:text-indigo-600 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-white/20 py-3 space-y-2">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-white/50 rounded-lg transition-colors duration-200" 
              onClick={() => {
                navigate('/Myprofile');
                setMobileMenuOpen(false);
              }}>
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">My Profile</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-white/50 rounded-lg transition-colors duration-200"
              onClick={logout}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">LogOut</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
