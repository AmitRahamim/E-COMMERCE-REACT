import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('All');

  const products = useSelector((state) => state.products); // Fetch products from the Redux store
  const users = useSelector((state) => state.users); // Fetch users from the Redux store
  
  // Create an array of all customer names (from the users list)
  const customers = ['All', ...users.map((user) => user.firstname)];

  const handleChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  // Create an object to store the quantity per customer
  const productQuantities = {};

  // Loop through all products and create a quantity map for each customer
  products.forEach((product) => {
    product.boughtB.forEach((entry) => {
      if (!productQuantities[entry.name]) {
        productQuantities[entry.name] = { ...productQuantities[entry.name], [product.title]: 0 };
      }
      productQuantities[entry.name][product.title] = (productQuantities[entry.name][product.title] || 0) + parseInt(entry.Qty);
    });
  });

  // Get the selected customer data or use "All" for aggregate data
  const selectedData = selectedCustomer === 'All' 
    ? products.reduce((acc, product) => {
        product.boughtB.forEach((entry) => {
          acc[product.title] = (acc[product.title] || 0) + parseInt(entry.Qty);
        });
        return acc;
      }, {})
    : productQuantities[selectedCustomer] || products.reduce((acc, product) => {
        acc[product.title] = 0;
        return acc;
      }, {});

  // Generate unique random colors
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Generate a unique random color for each product
  const backgroundColors = Object.keys(selectedData).map(() => getRandomColor());

  const data = {
    labels: Object.keys(selectedData), // The product names
    datasets: [
      {
        label: 'Quantity',
        data: Object.values(selectedData), // The quantities for each product
        backgroundColor: backgroundColors, // Use the unique random colors
      },
    ],
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <FormControl fullWidth>
        <InputLabel id="customer-select-label">Select Customer</InputLabel>
        <Select
          labelId="customer-select-label"
          id="customer-select"
          value={selectedCustomer}
          label="Select Customer"
          onChange={handleChange}
        >
          {customers.map((customer) => (
            <MenuItem key={customer} value={customer}>
              {customer}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <h3>Products Quantity Per Customer</h3>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
