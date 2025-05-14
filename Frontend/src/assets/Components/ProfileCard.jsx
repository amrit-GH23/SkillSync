import React from 'react';

const ProfileCard = ({ imageUrl, bio, onViewProfile, onChat }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-auto flex flex-col items-center text-center transition transform hover:scale-105">
      <img
        src={imageUrl}
        alt="profile"
        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-100"
      />
      <p className="text-gray-700 text-sm line-clamp-2 mb-4">
        {bio}
      </p>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={onViewProfile}
        >
          View Profile
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          onClick={onChat}
        >
          Chat Now
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
