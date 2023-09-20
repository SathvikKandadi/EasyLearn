 import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './CourseCard.css';  
const CourseCard = ({ courseName, professors, institute, duration, startDate, imagePath, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="course-card-link">
      <Card className="course-card">
        <CardMedia
          component="img"
          alt="Course Image"
          height="85"
          width="230"
          image={imagePath}
        />
        <CardContent>
          <Typography variant="h5" component="div" sx={{ marginBottom: 1 }}>
            {courseName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: 1 }}>
            {professors}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: 1 }}>
            {institute}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: 1 }}>
            {duration}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {startDate}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
};

export default CourseCard;
