import React from 'react';
import { Grid, Typography } from '@mui/material';
import Header from '../Headercomponent/Header';

const MonthlyCalendarCard = () => {
  // Dummy data for demonstration: An array of months
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  return (
    <div>
      <Header />
      <div style={{ padding: '5px', overflowX: 'auto' }}>
        <Typography variant="h5" style={{ marginBottom: '1px' }}>Progress</Typography>
        <Grid container spacing={1}>
          {months.map((month, index) => (
            <Grid item key={index} style={{ marginRight: '10px' }}>
              <div style={{ width: '125px', height: '125px', padding: '1px' }}>
                <Typography variant="subtitle1" style={{ marginBottom: '5px' }}>{month}</Typography>
                <Grid container spacing={1} style={{ marginTop: '10px' }}>
                  {[...Array(31).keys()].map((dayIndex) => (
                    <Grid item key={dayIndex}>
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: 'gray',
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default MonthlyCalendarCard;
