// SecondCard.js
import React from 'react';
import { Card, CardContent, Divider, Typography, Avatar, Grid } from '@mui/material';
import './SecondCard.css';  

const SecondCard = () => {
  const userName = 'Vinod';  
  const currentStreak = 0;  
  const coursesCompleted = 0;  
  const ongoingCourses = 0;  
  const projectsCompleted = 0;  

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <Card className="second-card">  
      <CardContent>
        <Grid container direction="row" alignItems="center" spacing={2}>
    
          <Grid item>
            <Avatar alt="User Profile" src="/path/to/profile-pic.jpg" />
          </Grid>
         
          <Grid item>
            <Typography variant="body1">
              Hey, {userName}
            </Typography>
          </Grid>
        </Grid>

    
        <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />

      
        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">
            Current Streak: 
            <div><strong>{currentStreak} days</strong></div>
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {daysOfWeek.map((day, index) => (
              <div key={index} style={dayCircleStyle}>
                {day}
              </div>
            ))}
          </div>
        </div>
        <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />


      

      
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <div style={completedItemStyle}>
            <Typography variant="body2">
              Courses completed
            </Typography>
            <Typography variant="body1">
              {coursesCompleted}
            </Typography>
          </div>
          <div style={completedItemStyle}>
            <Typography variant="body2">
              Ongoing courses
            </Typography>
            <Typography variant="body1">
              {ongoingCourses}
            </Typography>
          </div>
          <div style={completedItemStyle}>
            <Typography variant="body2">
              Projects completed
            </Typography>
            <Typography variant="body1">
              {projectsCompleted}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const dayCircleStyle = {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  textAlign: 'center',
  lineHeight: '30px',
  fontSize: '1.2em',
  background: '#f0f0f0',
  marginRight: '5px', 
};

const completedItemStyle = {
  textAlign: 'center',
};

export default SecondCard;
