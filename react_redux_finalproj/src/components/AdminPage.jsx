import * as React from 'react';
import Box from '@mui/material/Box';
import { Tab } from '@mui/material'; 
import { TabContext, TabList, TabPanel } from '@mui/lab'; 
import { useState } from 'react';
import AdminCategoriesComp from './Admin_Categories';
import AdminCostumersComp from './Admin_Coustumers';
import AdminProductsComp from './Admin_Products';
import StatisticsPage from './StatisticsPage';

function AdminComp() {
  const [value, setValue] = useState('1'); // State for keeping track of selected tab

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <h1 style={{textAlign: 'center',marginBottom: '20px'}}>Hello Admin</h1>
      <Box sx={{ width: '100%', typography: 'body1',height: '100vh' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 5, borderColor: 'divider' }}><br></br>
            <TabList onChange={handleChange} aria-label="tabs example" centered>
              <Tab label="Categroties" value="1" />
              <Tab label="products" value="2" />
              <Tab label="Coustumers" value="3" />
              <Tab label="Stactistics" value="4" />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            sx={{
              height: '100%', // Make TabPanel fill the remaining space 
              overflowY: 'auto', // Allow scrolling if the content overflows
            }}
          >
          <AdminCategoriesComp />
          </TabPanel>
          <TabPanel 
          value="2"
          sx={{
            height: '100%', 
            overflowY: 'auto', 
          }}
          >
          <AdminProductsComp/>    
          </TabPanel>
          <TabPanel 
          value="3"
          sx={{
              height: '100%', 
              overflowY: 'auto', 
           }}
          >
          <AdminCostumersComp/>
          </TabPanel>
          <TabPanel 
          value="4"
          sx={{
            height: '100%',  
            overflowY: 'auto', 
         }}
         >
          <StatisticsPage />
         </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default AdminComp;
