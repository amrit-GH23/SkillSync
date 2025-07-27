import React, { useEffect, useState } from "react";
import { ChevronRight, User, Plus, X, Sparkles, Check } from 'lucide-react';

const ViewProfile = () => {
  const [bio, setBio] = useState('');
  const [skillHave, setSkillHave] = useState([]);
  const [skillWant, setSkillWant] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [access, setToken] = useState("");

  useEffect(() => {
    
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-100/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-violet-100/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-8 transform transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Build Your Profile
          </h1>
          <p className="text-slate-600 text-lg">
            Share your skills and aspirations with the community
          </p>
        </div>

        {/* Form */}
        <form>
          <div
            className={`bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 transform transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ animationDelay: "200ms" }}
          >
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">
                    Profile Saved Successfully!
                  </h3>
                  <p className="text-green-600 text-sm">
                    Your profile has been created and is now live.
                  </p>
                </div>
              </div>
            )}

            {/* Bio Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <label className="text-lg font-semibold text-slate-700">
                  Your Bio
                </label>
              </div>
              <div className="relative">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself, your journey, and what drives you..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-indigo-400 focus:outline-none transition-colors duration-200 text-slate-700 placeholder-slate-400 resize-none"
                />
                <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                  {bio.length}/500
                </div>
              </div>
            </div>

            {/* Skills Sections */}
            <div className="space-y-8 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <label className="text-lg font-semibold text-slate-700">
                  Your Bio
                </label>
              </div>
              <div className="relative">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself, your journey, and what drives you..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-indigo-400 focus:outline-none transition-colors duration-200 text-slate-700 placeholder-slate-400 resize-none"
                />
                <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                  {bio.length}/500
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`group relative w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                loading ? "animate-pulse" : ""
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving Profile...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">Save Profile</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </div>
            </button>

            {/* Progress Indicator */}
            <div className="mt-6 flex justify-center">
              <div className="flex gap-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      (bio && skillHave.length > 0) || step === 1
                        ? "bg-indigo-500"
                        : "bg-slate-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewProfile;
