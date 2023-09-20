// ProfileDetails.js
import React from 'react';
import { Avatar, Typography } from '@mui/material';

const ProfileDetails = () => {
  const profilePicUrl = 'url_to_your_profile_pic'; // Replace with the actual URL of the profile picture

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <Avatar alt="Profile Picture" src={profilePicUrl} sx={{ width: 150, height: 150, margin: '0 auto 20px' }} />

      <Typography variant="h5">Full Name</Typography>
      <Typography variant="body1">John Doe</Typography>

      <Typography variant="h5" style={{ marginTop: '20px' }}>Bio</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      
    </div>
  );
};

export default ProfileDetails;
