 import React from 'react';
import { Grid, Typography } from '@mui/material';
import FirstCard from './FirstCard';
import SecondCard from './SecondCard';
import Header from '../Headercomponent/Header';

const HomePage = () => {
  return (
    <div>
      <Header />
      <Typography variant="h4" style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '24px' ,marginLeft:'40px'}}>
        Courses
      </Typography>
      <Grid container spacing={2}>   
        <Grid item xs={8}>
          <FirstCard />
        </Grid>
        <Grid item xs={4}>
          <SecondCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
