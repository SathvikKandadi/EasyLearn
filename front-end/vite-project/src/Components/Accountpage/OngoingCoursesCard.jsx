import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

const OngoingCoursesCard = () => {
  // Dummy ongoing courses data
  const ongoingCourses = [
    'Course 1',
    'Course 2',
    'Course 3'
    // Add more courses as needed
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Ongoing Courses
      </Typography>
      <Grid container spacing={2}>
        {/* Ongoing Courses Card (Spanning columns 4 to 12) */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="body1">
              {ongoingCourses.map((course, index) => (
                <div key={index}>
                  {course}
                </div>
              ))}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default OngoingCoursesCard;
