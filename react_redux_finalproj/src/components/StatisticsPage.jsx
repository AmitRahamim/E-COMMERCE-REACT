import React from 'react';
import PieChart from './PieChart';  
import BarChart from './BarChart'; 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const StatisticsPage = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Paper sx={{ padding: '20px', marginBottom: '20px' }}>
        <h1>Hello, Admin</h1>
        <h2>Total Statistics Page</h2>
        <PieChart />
      </Paper>
      <h2>Products Quantity Per Customer</h2>
      <Paper sx={{ padding: '20px' }}>
        <BarChart />
      </Paper>
    </Box>
  );
};

export default StatisticsPage;
