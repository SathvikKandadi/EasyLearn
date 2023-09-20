import React from 'react';
import { Card, CardContent} from '@mui/material';
import CourseCard from './CourseCard'; 

const courseDetails = [
  {
    courseName: 'Advanced C++',
    professors: 'By Prof Kannan Moudgalya - Principal Investigator of Spoken Tutorial Project',
    institute: 'Indian Institute of Technology Bombay',
    duration: '4 Weeks',
    startDate: '01-04-2020',
    imagePath: 'https://storage.googleapis.com/swayam-node2-production.appspot.com/assets/img/aic20_sp01/Advanced-CPP.png',
    link:'https://onlinecourses.swayam2.ac.in/aic20_sp01/preview'
  },
  {
    courseName: 'Java',
    professors: 'By Prof Kannan Moudgalya - Principal Investigator of Spoken Tutorial Project ',
    institute: 'Indian Institute of Technology Bombay',
    duration: '12 Weeks',
    startDate: 'November 1, 2023',
    imagePath: 'https://storage.googleapis.com/swayam-node2-production.appspot.com/assets/img/aic20_sp13/Java%20(1).png'
    ,link:'https://onlinecourses.swayam2.ac.in/aic20_sp13/preview'
  },
  {
    courseName: 'Python 3.4.3',
    professors: 'By Prof Kannan Moudgalya - Principal Investigator of Spoken Tutorial Project ',
    institute: '  Indian Institute of Technology Bombay',
    duration: '8 Weeks',
    startDate: 'October 15, 2023',
    imagePath: 'https://storage.googleapis.com/swayam-node2-production.appspot.com/assets/img/aic20_sp33/Python3.4.3%20(1).png',
    link:'https://onlinecourses.swayam2.ac.in/aic20_sp33/preview'
  },
  {
    courseName: 'RDBMS PostgreSQL',
    professors: 'By Prof Kannan Moudgalya - Principal Investigator of Spoken Tutorial Project ',
    institute: ' Indian Institute of Technology Bombay',
    duration: '8 Weeks',
    startDate: 'November 1, 2023',
    imagePath: 'https://storage.googleapis.com/swayam-node2-production.appspot.com/assets/img/aic20_sp36/RDBMS.png',
    link:'https://onlinecourses.swayam2.ac.in/aic20_sp36/preview'
  },
  {
    courseName: 'Linux Operating System',
    professors: 'By Prof Kannan Moudgalya - Principal Investigator of Spoken Tutorial Project',
    institute: ' Indian Institute of Technology Bombay',
    duration: '4 Weeks',
    startDate: 'October 15, 2023',
    imagePath: 'https://storage.googleapis.com/swayam-node2-production.appspot.com/assets/img/aic20_sp24/Linux%20(1).png',
    link:'https://onlinecourses.swayam2.ac.in/aic20_sp24/preview'
  } 
  
];

const FirstCard = () => {
  return (
    <Card style={{ padding: '10px', margin: '10px' }}>
      <CardContent style={{ display: 'flex', flexWrap: 'wrap' }}>
        {courseDetails.map((course, index) => (
          <div key={index} style={{ marginRight: '30px', marginBottom: '30px' }}>
            <CourseCard {...course} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FirstCard;
