import React from 'react';
import { Grid, Paper } from '@mui/material';
import ProfileDetails from './ProfileDetails';
import OngoingCoursesCard from './OngoingCoursesCard';
import CompletedCoursesCard from './CompletedCoursesCard';
import MonthlyCalendarCard from './MonthlyCalendarCard'; 
const ProfileCard = () => {
  return (
    <div style={{ padding: '10px' ,marginTop:'60px' }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <ProfileDetails />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <OngoingCoursesCard />
            </Grid>

            <Grid item xs={12}>
              <CompletedCoursesCard />
            </Grid>
            <Grid item xs={12}>
              <MonthlyCalendarCard />
            </Grid>
          </Grid>
         
        </Grid>
         
      </Grid>
    </div>
  );
};

export default ProfileCard;
