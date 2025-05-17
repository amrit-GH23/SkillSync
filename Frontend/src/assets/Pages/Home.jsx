import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import ProfileCard from '../Components/ProfileCard';
import axios from 'axios';
import NavBar from '../Components/Navbar';

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [yourToken, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access');
    setToken(token);
    const getProfiles = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/getProfile/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const defaultImage = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
        const processedProfiles = res.data.map((profile) => ({
          ...profile,
          imageUrl: defaultImage,
        }));

        setProfiles(processedProfiles);
      } catch (error) {
        console.error('Fetching profiles failed:', error.response?.data || error.message);
      }
    };

    getProfiles();
  }, []);

  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 4 }, background: 'linear-gradient(120deg, #e0e7ff 0%, #f0abfc 100%)', minHeight: '100vh' }}>
        <Grid container spacing={4} justifyContent="center">
          {profiles.map((profile) => (
            <Grid item key={profile.id} xs={12} sm={6} md={4}>
              <ProfileCard
                imageUrl={profile.imageUrl}
                bio={profile.bio || 'No bio available'}
                onViewProfile={() => console.log(`Viewing profile ${profile.id}`)}
                onChat={() => console.log(`Chatting with profile ${profile.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
