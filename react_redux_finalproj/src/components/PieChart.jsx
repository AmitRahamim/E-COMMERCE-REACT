import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    // Example data, you can replace this with dynamic data from your state or API
    const products = useSelector((state) => state.products);
    const dynamicproducts = products.map(prod => prod.title)
    const dynamicquantities =[];
    let tempcounter = 0;
    for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < products[i].boughtB.length; j++) {
            tempcounter+=+(products[i].boughtB[j].Qty);
        }
        dynamicquantities.push(tempcounter)
        tempcounter=0;
    }
    
    
    
    // Function to generate a random color
    const getRandomColor = (generatedColors) => {
        const letters = '0123456789ABCDEF';
        let color = '#';
    
        // Generate a random color
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    
        // Check if the generated color is already in the list
        if (generatedColors.has(color)) {
            return getRandomColor(generatedColors); // Recursively generate a new color if duplicate
        }
    
        // Add the new color to the set of generated colors
        generatedColors.add(color);
        return color;
    };
    
    // Create a set to track generated colors and ensure uniqueness
    const generatedColors = new Set();
    
    // Create an array of random unique colors based on the number of labels
    const backgroundColors = products.map(() => getRandomColor(generatedColors));
    
    

    const data = {
        labels: dynamicproducts,  // Set dynamic labels here
        datasets: [
            {
                data: dynamicquantities,  // The corresponding data values for each label
                backgroundColor: backgroundColors,  // Random colors for each segment
                hoverOffset: 4,  // Hover effect to make the slice pop out
            },
        ],
    };

    return (
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
            <h3>Total Sold Products</h3>
            <Pie data={data} />
        </div>
    );
};

export default PieChart;
