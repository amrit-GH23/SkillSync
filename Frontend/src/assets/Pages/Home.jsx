import React, { useEffect, useState } from 'react';
import ProfileCard from '../Components/ProfileCard';
import axios from 'axios';

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [yourToken, setToken] = useState("");

  useEffect(() => {
    
  }, []);

  useEffect(() => {
const token = localStorage.getItem("access");
    setToken(token);
    const getProfiles = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/getProfile/', {
          headers: {
            Authorization: `Bearer ${yourToken}`,
            "Content-Type": "application/json",
          }
        });

        // Add default image to each profile
        const defaultImage = 'https://cdn-icons-png.flaticon.com/512/847/847969.png'; // Or your own profile icon
        const processedProfiles = res.data.map(profile => ({
          ...profile,
          imageUrl: defaultImage,
        }));

        setProfiles(processedProfiles);
      } catch (error) {
        console.error('Fetching profiles failed:', error.response?.data || error.message);
      }
    };

    getProfiles();
  }, [yourToken]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          imageUrl={profile.imageUrl}
          bio={profile.bio || "No bio available"}
          onViewProfile={() => console.log(`Viewing profile ${profile.id}`)}
          onChat={() => console.log(`Chatting with profile ${profile.id}`)}
        />
      ))}
    </div>
  );
};

export default Home;
