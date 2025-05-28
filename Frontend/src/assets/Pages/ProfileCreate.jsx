import React, { useState, useEffect } from 'react';
import { ChevronRight, User, Plus, X, Sparkles, Check } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const skillsArray = [
  "Python", "Java", "C", "C++", "C#", "JavaScript", "TypeScript", "HTML", "CSS", "SQL", "MongoDB", "PostgreSQL", "MySQL", "SQLite", "Django", "Flask", "FastAPI", "Spring Boot", "Node.js", "Express.js", "React", "Vue.js", "Angular", "Next.js", "Tailwind CSS", "Bootstrap", "Redux", "GraphQL", "REST API", "Git", "Docker", "Kubernetes", "Linux", "AWS", "Azure", "GCP", "Firebase", "Machine Learning", "Deep Learning", "Data Science", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "PyTorch", "OpenCV", "Natural Language Processing", "Computer Vision", "Web Scraping", "Automation", "Cybersecurity", "Ethical Hacking", "DevOps", "System Design", "Agile", "Scrum", "CI/CD", "Unit Testing", "Object-Oriented Programming", "Data Structures", "Algorithms", "Competitive Programming", "Problem Solving", "Embedded Systems", "Microcontrollers", "IoT", "Arduino", "Raspberry Pi", "Verilog", "VHDL", "FPGA Design", "Computer Architecture", "Operating Systems", "Networking", "Software Engineering", "Computer Graphics", "3D Modeling", "Blender", "Unity", "Unreal Engine", "Game Development", "Figma", "UI/UX Design", "Adobe Photoshop", "Adobe Illustrator", "Video Editing", "CAD", "SolidWorks", "MATLAB", "Simulink", "LaTeX", "Technical Writing", "Research Writing", "Public Speaking", "Team Leadership", "Project Management", "Product Design", "Design Thinking", "Entrepreneurship"
];

const SkillSelector = ({ title, skills, setSkills, color, icon: Icon }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = skillsArray.filter(skill =>
        skill.toLowerCase().includes(inputValue.toLowerCase()) &&
        !skills.includes(skill)
      );
      setFilteredSkills(filtered.slice(0, 8));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [inputValue, skills]);

  const addSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
      setInputValue('');
      setShowDropdown(false);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addSkill(inputValue.trim());
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${color}`} />
        <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
      </div>

      <div className="relative">
        <div className={`relative border-2 border-slate-200 rounded-xl focus-within:border-${color.split('-')[1]}-400 transition-colors duration-200`}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type to search or add skills..."
            className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none text-slate-700 placeholder-slate-400"
          />
          <Plus className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${color} opacity-50`} />
        </div>

        {showDropdown && (
          <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-200 max-h-48 overflow-y-auto">
            {filteredSkills.map((skill, index) => (
              <div
                key={skill}
                onClick={() => addSkill(skill)}
                className={`px-4 py-3 cursor-pointer hover:bg-${color.split('-')[1]}-50 transition-colors duration-150 ${
                  index !== filteredSkills.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                <span className="text-slate-700">{skill}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 min-h-[2rem]">
        {skills.map((skill, index) => (
          <div
            key={skill}
            className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-${color.split('-')[1]}-100 to-${color.split('-')[1]}-50 text-${color.split('-')[1]}-700 rounded-full text-sm font-medium border border-${color.split('-')[1]}-200 transform transition-all duration-200 hover:scale-105 animate-in slide-in-from-left-2`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(skill)}
              className={`hover:bg-${color.split('-')[1]}-200 rounded-full p-0.5 transition-colors duration-150`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileCreate = () => {
  const [bio, setBio] = useState('');
  const [skillHave, setSkillHave] = useState([]);
  const [skillWant, setSkillWant] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [access, setToken] = useState("");
  const navigate= useNavigate()

  useEffect(() => {
   const t= localStorage.getItem("access");
   setToken(t);
    setMounted(true);

    console.log(access)

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      bio,
      skill_have_names: skillHave,
      skill_want_names: skillWant
    };
     console.log(access)
  try{
    const response=await axios.post("http://127.0.0.1:8000/api/createProfile/",payload,
      {
         headers: {
           Authorization: `Bearer ${access}`
         }
       }
     )
     console.log('Profile data:', payload);
     console.log(response.data)
     navigate("/")
  }
  catch(error){
       console.log(error)
  }
   setLoading(false);
     setSuccess(true);
  };

  if (!mounted) return null;

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
            Build Your Profile
          </h1>
          <p className="text-slate-600 text-lg">Share your skills and aspirations with the community</p>
        </div>

        {/* Form */}
        <form>
        <div 
          className={`bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 transform transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{ animationDelay: '200ms' }}
        >
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Profile Saved Successfully!</h3>
                <p className="text-green-600 text-sm">Your profile has been created and is now live.</p>
              </div>
            </div>
          )}

          {/* Bio Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <label className="text-lg font-semibold text-slate-700">Your Bio</label>
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
            <SkillSelector
              title="Skills You Have"
              skills={skillHave}
              setSkills={setSkillHave}
              color="text-emerald-500"
              icon={Check}
            />

            <SkillSelector
              title="Skills You Want to Learn"
              skills={skillWant}
              setSkills={setSkillWant}
              color="text-blue-500"
              icon={Plus}
            />
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
                      ? 'bg-indigo-500'
                      : 'bg-slate-300'
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

export default ProfileCreate;