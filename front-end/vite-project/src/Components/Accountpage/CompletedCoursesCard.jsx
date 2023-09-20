import React from 'react';
import { Typography, Paper } from '@mui/material';

const CompletedCoursesCard = () => {
  // Dummy completed courses data
  const completedCourses = [
    'Completed Course 1',
    'Completed Course 2',
    'Completed Course 3'
    // Add more completed courses as needed
  ];

  return (
    <div style={{ padding: '10px' }}>
      <Typography variant="h4" gutterBottom>
        Completed Courses
      </Typography>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="body1">
          {completedCourses.map((course, index) => (
            <div key={index}>
              {course}
            </div>
          ))}
        </Typography>
      </Paper>
    </div>
  );
};

export default CompletedCoursesCard;
 