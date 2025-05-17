// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import CreatableSelect from 'react-select/creatable';
// import makeAnimated from 'react-select/animated';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const animatedComponents = makeAnimated();

// const skillsArray = [
//   "Python", "Java", "C", "C++", "C#", "JavaScript", "TypeScript", "HTML", "CSS", "SQL", "MongoDB", "PostgreSQL", "MySQL", "SQLite", "Django", "Flask", "FastAPI", "Spring Boot", "Node.js", "Express.js", "React", "Vue.js", "Angular", "Next.js", "Tailwind CSS", "Bootstrap", "Redux", "GraphQL", "REST API", "Git", "Docker", "Kubernetes", "Linux", "AWS", "Azure", "GCP", "Firebase", "Machine Learning", "Deep Learning", "Data Science", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "PyTorch", "OpenCV", "Natural Language Processing", "Computer Vision", "Web Scraping", "Automation", "Cybersecurity", "Ethical Hacking", "DevOps", "System Design", "Agile", "Scrum", "CI/CD", "Unit Testing", "Object-Oriented Programming", "Data Structures", "Algorithms", "Competitive Programming", "Problem Solving", "Embedded Systems", "Microcontrollers", "IoT", "Arduino", "Raspberry Pi", "Verilog", "VHDL", "FPGA Design", "Computer Architecture", "Operating Systems", "Networking", "Software Engineering", "Computer Graphics", "3D Modeling", "Blender", "Unity", "Unreal Engine", "Game Development", "Figma", "UI/UX Design", "Adobe Photoshop", "Adobe Illustrator", "Video Editing", "CAD", "SolidWorks", "MATLAB", "Simulink", "LaTeX", "Technical Writing", "Research Writing", "Public Speaking", "Team Leadership", "Project Management", "Product Design", "Design Thinking", "Entrepreneurship"
// ];

// const skillsList = skillsArray.map(skill => ({ value: skill, label: skill }));

// const ProfileCreate = () => {
//   const [bio, setBio] = useState('');
//   const [skillHave, setSkillHave] = useState([]);
//   const [skillWant, setSkillWant] = useState([]);
//   const [yourToken, setToken] = useState("");

//   const navigate=useNavigate();

//   useEffect(() => {
//     const t=localStorage.getItem("access")
//     setToken(t);
//   }, [])
  
//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     const payload = {
//       bio,
//       skill_have_names: skillHave.map(skill => skill.value),
//       skill_want_names: skillWant.map(skill => skill.value)
//     };
//     console.log(payload); // send to your backend API
//     console.log(yourToken); // send to your backend API
//      try {
//      const response= await axios.post("http://127.0.0.1:8000/api/createProfile/", payload,{
//   headers: {
//     Authorization: `Bearer ${yourToken}`, // if using JWT
//     "Content-Type": "application/json",
//   }}
// );
//      console.log(response);
//      console.log(response.data);
//       // navigate('/')
//       console.log('done');
//       // Optionally redirect or notify
//     } catch (error) {
//       console.error('Signup failed:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-100 px-4 py-10">
//       <motion.form
//         onSubmit={handleSubmit}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-3xl"
//       >
//         <h2 className="text-4xl font-extrabold text-center text-indigo-600 mb-8">Build Your Profile</h2>

//         <div className="mb-6">
//           <label className="block text-md font-semibold mb-2 text-gray-700">Your Bio</label>
//           <textarea
//             rows="4"
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             placeholder="Tell us about yourself..."
//             className="w-full border border-gray-300 rounded-xl p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-md font-semibold mb-2 text-gray-700">Skills You Have</label>
//           <CreatableSelect
//             isMulti
//             components={animatedComponents}
//             value={skillHave}
//             onChange={setSkillHave}
//             options={skillsList}
//             placeholder="Select or add skills..."
//             styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
//           />
//         </div>

//         <div className="mb-8">
//           <label className="block text-md font-semibold mb-2 text-gray-700">Skills You Want to Learn</label>
//           <CreatableSelect
//             isMulti
//             components={animatedComponents}
//             value={skillWant}
//             onChange={setSkillWant}
//             options={skillsList}
//             placeholder="Select or add skills..."
//             styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
//           />
//         </div>

//         <motion.button
//           whileTap={{ scale: 0.97 }}
//           type="submit"
//           className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-lg font-semibold py-3 rounded-xl shadow-lg transition"
//         >
//           Save Profile
//         </motion.button>
//       </motion.form>
//     </div>
//   );
// };

// export default ProfileCreate;


import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Chip,
  Divider,
  Fade,
  useTheme,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import axios from "axios";

// Skill options

const skillsArray = [
  "Python", "Java", "C", "C++", "C#", "JavaScript", "TypeScript", "HTML", "CSS", "SQL", "MongoDB", "PostgreSQL", "MySQL", "SQLite", "Django", "Flask", "FastAPI", "Spring Boot", "Node.js", "Express.js", "React", "Vue.js", "Angular", "Next.js", "Tailwind CSS", "Bootstrap", "Redux", "GraphQL", "REST API", "Git", "Docker", "Kubernetes", "Linux", "AWS", "Azure", "GCP", "Firebase", "Machine Learning", "Deep Learning", "Data Science", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "PyTorch", "OpenCV", "Natural Language Processing", "Computer Vision", "Web Scraping", "Automation", "Cybersecurity", "Ethical Hacking", "DevOps", "System Design", "Agile", "Scrum", "CI/CD", "Unit Testing", "Object-Oriented Programming", "Data Structures", "Algorithms", "Competitive Programming", "Problem Solving", "Embedded Systems", "Microcontrollers", "IoT", "Arduino", "Raspberry Pi", "Verilog", "VHDL", "FPGA Design", "Computer Architecture", "Operating Systems", "Networking", "Software Engineering", "Computer Graphics", "3D Modeling", "Blender", "Unity", "Unreal Engine", "Game Development", "Figma", "UI/UX Design", "Adobe Photoshop", "Adobe Illustrator", "Video Editing", "CAD", "SolidWorks", "MATLAB", "Simulink", "LaTeX", "Technical Writing", "Research Writing", "Public Speaking", "Team Leadership", "Project Management", "Product Design", "Design Thinking", "Entrepreneurship"
];
const skillsList = skillsArray.map(skill => ({ value: skill, label: skill }));
const animatedComponents = makeAnimated();

const ProfileCreate = () => {
  const [bio, setBio] = useState("");
  const [skillHave, setSkillHave] = useState([]);
  const [skillWant, setSkillWant] = useState([]);
  const [yourToken, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const t = localStorage.getItem("access");
    setToken(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const payload = {
      bio,
      skill_have_names: skillHave.map(skill => skill.value),
      skill_want_names: skillWant.map(skill => skill.value),
    };

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/createProfile/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${yourToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess("Profile saved successfully!");
      setLoading(false);
      // Optionally navigate
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.detail || "Failed to save profile.");
      setLoading(false);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
        p: 2,
      }}
    >
      <Fade in>
        <Card
          sx={{
            maxWidth: 500,
            width: "100%",
            borderRadius: 6,
            boxShadow: 12,
            overflow: "visible",
            p: { xs: 2, sm: 4 },
            position: "relative",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 64,
                  height: 64,
                  fontSize: 36,
                  boxShadow: 3,
                  mt: -6,
                  mx: "auto",
                }}
              >
                <PersonAddAlt1Icon fontSize="inherit" />
              </Avatar>
            }
            title={
              <Typography
                variant="h5"
                fontWeight={700}
                color="primary"
                textAlign="center"
                mt={1}
              >
                Create Your Profile
              </Typography>
            }
            sx={{ justifyContent: "center", textAlign: "center", mb: 1, pb: 0 }}
          />

          <CardContent>
            <Stack spacing={3}>
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              <TextField
                label="Your Bio"
                multiline
                minRows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself, your passions, and your goals…"
                variant="outlined"
                fullWidth
                InputProps={{
                  sx: { borderRadius: 3, fontSize: "1.05rem" },
                }}
              />

              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  mb={1}
                  color="text.primary"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <AddCircleOutlineIcon color="primary" /> Skills You Have
                </Typography>
                <CreatableSelect
                  isMulti
                  components={animatedComponents}
                  value={skillHave}
                  onChange={setSkillHave}
                  options={skillsList}
                  placeholder="Select or add skills..."
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: 12,
                      borderColor: theme.palette.primary.light,
                      minHeight: 48,
                      fontSize: "1rem",
                      boxShadow: "none",
                    }),
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  menuPortalTarget={document.body}
                />
                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                  {skillHave.map((skill) => (
                    <Chip
                      key={skill.value}
                      label={skill.label}
                      color="primary"
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  mb={1}
                  color="text.primary"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <AddCircleOutlineIcon color="secondary" /> Skills You Want to Learn
                </Typography>
                <CreatableSelect
                  isMulti
                  components={animatedComponents}
                  value={skillWant}
                  onChange={setSkillWant}
                  options={skillsList}
                  placeholder="Select or add skills..."
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: 12,
                      borderColor: theme.palette.secondary.light,
                      minHeight: 48,
                      fontSize: "1rem",
                      boxShadow: "none",
                    }),
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  menuPortalTarget={document.body}
                />
                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                  {skillWant.map((skill) => (
                    <Chip
                      key={skill.value}
                      label={skill.label}
                      color="secondary"
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                  ))}
                </Stack>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                sx={{
                  borderRadius: 3,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  py: 1.5,
                  boxShadow: 4,
                  letterSpacing: 0.5,
                  textTransform: "none",
                }}
                disabled={loading}
                fullWidth
                onClick={handleSubmit}
              >
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default ProfileCreate;
