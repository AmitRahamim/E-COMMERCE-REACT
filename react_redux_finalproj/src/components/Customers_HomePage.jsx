import * as React from 'react';
import Box from '@mui/material/Box';
import { Tab } from '@mui/material'; 
import { TabContext, TabList, TabPanel } from '@mui/lab'; 
import { useState } from 'react';
import EditUserCopm from './Customer_EditUser';
import {useNavigate } from 'react-router-dom';
import MyOrderPageCopm from './Custmoer_MyOrderPage';
import ProductsPage from './ProductsPage';

function CustomersComp() {
  const [value, setValue] = useState('1'); // State for keeping track of selected tab
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Logout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('username');
    navigate('/');
  };

  return (
    <>
      <h1 style={{textAlign: 'center',marginBottom: '20px'}}>Welcome {sessionStorage.username}</h1>
      <Box sx={{ width: '100%', typography: 'body1',height: '100vh' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 5, borderColor: 'divider' }}><br></br>
            <TabList onChange={handleChange} aria-label="tabs example" centered>
              <Tab label="Products" value="1" />
              <Tab label="My Orders" value="2" />
              <Tab label="My Account" value="3" />
              <Tab label="Logout" onClick={Logout} value="4"  />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            sx={{
              height: '100%', // Make TabPanel fill the remaining space 
              overflowY: 'auto', // Allow scrolling if the content overflows
            }}
          >
          <ProductsPage/>
          </TabPanel>
          <TabPanel 
          value="2"
          sx={{
            height: '100%', 
            overflowY: 'auto', 
          }}
          >
          <MyOrderPageCopm/>
          </TabPanel>
          <TabPanel 
          value="3"
          sx={{
              height: '100%', 
              overflowY: 'auto', 
           }}
          >
          <EditUserCopm/>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default CustomersComp;
