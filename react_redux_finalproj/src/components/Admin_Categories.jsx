import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';
import AdminCategoryComp from './Admin_category';
import { useState,memo } from 'react';
import TextField from '@mui/material/TextField';


function AdminCategoriesComp() {
    const [newcategory, setNewCategory] = useState('');
    const Categories = useSelector((state) => state.categories);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: 'gray',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      }));

    const ADDCategory = () => {
        if (!newcategory) {
            setError(true); 
            alert('New Category field must be filled out.');
            return;
        }
        
            dispatch({
          type: 'ADDCategory',
          payload: newcategory,
        });
    
        setNewCategory('');
        setError(false);
    }

  return (
    <>
    <div
      style={{
        backgroundColor: '#d3d3d3',
        height: '100%',
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box', 
      }}
    > 
      <h1 style={{textAlign: 'left', marginBottom: '20px'}}>Categories</h1>
      <Box sx={{ width: '100%', typography: 'body1', height: 'fit-contant', backgroundColor:"#f5f5f5", marginBottom: '10px'}}>
        <Stack spacing={1}>
          {Categories && Categories.length > 0 ? (
            Categories.map((cat, index) => (
              <AdminCategoryComp key={index} category={cat} />
            ))
          ) : (
            <p>No categories available</p> // Fallback message if no categories
          )}
        </Stack>
        <br />
        
        
        <div
          style={{
            display: 'flex',
            alignItems: 'center', // Vertically center the text and buttons
            width: '100%',
          }}
        >
          
          <TextField
            label="Add New Category"
            value={newcategory}
            onChange={(e) => setNewCategory(e.target.value)}
            size="small"
            error={error && !newcategory} 
            helperText={error && !newcategory ? 'Category is required' : ''}
            sx={{ width: '90%', height: '40px' }}  // 90% width, consistent height
          />
          
          
          <button 
            style={{ 
              marginLeft: '5px', 
              width: '9%', 
              height: '40px', // Same height as TextField
              backgroundColor: 'green', 
              color: '#fff', 
              border: 'none', 
              cursor: 'pointer',
              borderRadius: '8px'
              
            }} 
            onClick={ADDCategory}
            
          >
            ADD
          </button>
        </div><br></br>
      </Box>
    </div>
    </>
  );
}

export default memo(AdminCategoriesComp);
