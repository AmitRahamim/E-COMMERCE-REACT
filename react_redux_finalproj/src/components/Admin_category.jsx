import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import TextField from '@mui/material/TextField';

function AdminCategoryComp(props) {
  const { category } = props; 
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false); // Track whether the category is being edited
  const [newCategoryName, setNewCategoryName] = useState(category); // The new category name when editing
  const [error, setError] = useState(false); // Track form validation errors

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  const DeleteCategory = () => {
    dispatch({ type: 'DELETECategory', payload: category });
  };

  const UpdateCategory = () => {
    if (isEditing) {
      // Only allow update if the new category name is not empty
      if (!newCategoryName.trim()) {
        setError(true); 
        return;
      }
      // Dispatch action to update the category
      dispatch({
        type: 'UPDATECategory',
        payload: { oldCategory: category, newCategory: newCategoryName.trim() }
      });
    }
    // Toggle the editing state
    setIsEditing(!isEditing);
    setError(false); // Reset error state when toggling back to display mode
  };

  return (
    <>
      <Item>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: 10,
            gap: '5px',
          }}
        >
          {isEditing ? (
            // Show TextField when editing
            <TextField
              required
              label="New Category"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              size="small"
              error={error && !newCategoryName.trim()} 
              helperText={error && !newCategoryName.trim() ? 'Category name is required' : ''}
              autoFocus // This helps ensure the text field is focused when editing
            />
          ) : (
            // Show category name as text when not editing
            <h2 style={{ textAlign: 'left', margin: 0 }}>{category}</h2>
          )}
          
          <div>
            <button style={{ marginRight: '5px' }} onClick={UpdateCategory}>
              Update
            </button>
            <button onClick={DeleteCategory}>Delete</button>
          </div>
        </div>
      </Item>
    </>
  );
}

export default AdminCategoryComp;
