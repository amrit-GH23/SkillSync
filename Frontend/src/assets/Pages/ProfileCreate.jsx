import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const skillsArray = [
  "Python", "Java", "C", "C++", "C#", "JavaScript", "TypeScript", "HTML", "CSS", "SQL", "MongoDB", "PostgreSQL", "MySQL", "SQLite", "Django", "Flask", "FastAPI", "Spring Boot", "Node.js", "Express.js", "React", "Vue.js", "Angular", "Next.js", "Tailwind CSS", "Bootstrap", "Redux", "GraphQL", "REST API", "Git", "Docker", "Kubernetes", "Linux", "AWS", "Azure", "GCP", "Firebase", "Machine Learning", "Deep Learning", "Data Science", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "PyTorch", "OpenCV", "Natural Language Processing", "Computer Vision", "Web Scraping", "Automation", "Cybersecurity", "Ethical Hacking", "DevOps", "System Design", "Agile", "Scrum", "CI/CD", "Unit Testing", "Object-Oriented Programming", "Data Structures", "Algorithms", "Competitive Programming", "Problem Solving", "Embedded Systems", "Microcontrollers", "IoT", "Arduino", "Raspberry Pi", "Verilog", "VHDL", "FPGA Design", "Computer Architecture", "Operating Systems", "Networking", "Software Engineering", "Computer Graphics", "3D Modeling", "Blender", "Unity", "Unreal Engine", "Game Development", "Figma", "UI/UX Design", "Adobe Photoshop", "Adobe Illustrator", "Video Editing", "CAD", "SolidWorks", "MATLAB", "Simulink", "LaTeX", "Technical Writing", "Research Writing", "Public Speaking", "Team Leadership", "Project Management", "Product Design", "Design Thinking", "Entrepreneurship"
];

const skillsList = skillsArray.map(skill => ({ value: skill, label: skill }));

const ProfileCreate = () => {
  const [bio, setBio] = useState('');
  const [skillHave, setSkillHave] = useState([]);
  const [skillWant, setSkillWant] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      bio,
      skill_have_names: skillHave.map(skill => skill.value),
      skill_want_names: skillWant.map(skill => skill.value)
    };
    console.log(payload); // send to your backend API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-100 px-4 py-10">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-3xl"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-600 mb-8">Build Your Profile</h2>

        <div className="mb-6">
          <label className="block text-md font-semibold mb-2 text-gray-700">Your Bio</label>
          <textarea
            rows="4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
            className="w-full border border-gray-300 rounded-xl p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-md font-semibold mb-2 text-gray-700">Skills You Have</label>
          <CreatableSelect
            isMulti
            components={animatedComponents}
            value={skillHave}
            onChange={setSkillHave}
            options={skillsList}
            placeholder="Select or add skills..."
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          />
        </div>

        <div className="mb-8">
          <label className="block text-md font-semibold mb-2 text-gray-700">Skills You Want to Learn</label>
          <CreatableSelect
            isMulti
            components={animatedComponents}
            value={skillWant}
            onChange={setSkillWant}
            options={skillsList}
            placeholder="Select or add skills..."
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-lg font-semibold py-3 rounded-xl shadow-lg transition"
        >
          Save Profile
        </motion.button>
      </motion.form>
    </div>
  );
};

export default ProfileCreate;
