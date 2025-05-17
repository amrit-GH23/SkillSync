// import React from 'react';

// const ProfileCard = ({ imageUrl, bio, onViewProfile, onChat }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-auto flex flex-col items-center text-center transition transform hover:scale-105">
//       <img
//         src={imageUrl}
//         alt="profile"
//         className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-100"
//       />
//       <p className="text-gray-700 text-sm line-clamp-2 mb-4">
//         {bio}
//       </p>
//       <div className="flex gap-4">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//           onClick={onViewProfile}
//         >
//           View Profile
//         </button>
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
//           onClick={onChat}
//         >
//           Chat Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;


import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ProfileCard = ({ imageUrl, bio, onViewProfile, onChat }) => {
  return (
    <Card
      sx={{
        maxWidth: 360,
        mx: 'auto',
        borderRadius: 5,
        boxShadow: 8,
        textAlign: 'center',
        transition: 'transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s',
        '&:hover': { transform: 'scale(1.07)', boxShadow: 16 },
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton aria-label="settings" size="small" sx={{ color: '#3f51b5' }}>
          <MoreVertIcon />
        </IconButton>
      </Box>
      <CardContent sx={{ pt: 0 }}>
        <Stack alignItems="center" spacing={2}>
          <Avatar
            src={imageUrl}
            alt="profile"
            sx={{
              width: 100,
              height: 100,
              border: '4px solid #3f51b5',
              mb: 1,
              boxShadow: '0 8px 24px rgba(63,81,181,0.15)',
              background: 'white',
            }}
          />
          <Typography
            variant="h6"
            color="text.primary"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.5,
              mb: 1,
              mt: 1,
            }}
          >
            {/* Optionally add a name prop here */}
            {/* {name} */}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              mb: 2,
              fontWeight: 500,
              fontSize: '1rem',
            }}
          >
            {bio}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', gap: 2, pb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onViewProfile}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            borderRadius: 3,
            boxShadow: '0 2px 8px rgba(63,81,181,0.12)',
            textTransform: 'none',
            letterSpacing: 0.5,
          }}
        >
          View Profile
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onChat}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            borderRadius: 3,
            borderWidth: 2,
            textTransform: 'none',
            letterSpacing: 0.5,
            '&:hover': {
              borderWidth: 2,
            },
          }}
        >
          Chat Now
        </Button>
      </CardActions>
      <Box
        sx={{
          position: 'absolute',
          top: 80,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <IconButton aria-label="favorite" sx={{ color: '#e57373', background: '#fff', boxShadow: 2 }}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" sx={{ color: '#64b5f6', background: '#fff', boxShadow: 2 }}>
          <ShareIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ProfileCard;
