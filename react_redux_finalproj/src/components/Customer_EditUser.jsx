import { useState, useEffect,memo } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import { CssBaseline } from '@mui/material'; 
import Checkbox from '@mui/material/Checkbox'; 
import FormControlLabel from '@mui/material/FormControlLabel'; 
import { useNavigate } from 'react-router-dom';


function EditUserCopm() {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const edituser = users.find(user => user.username === sessionStorage.username);

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false); // Track form validation errors
  const navigate = useNavigate();

  useEffect(() => {
    if (edituser) {
      setFirstName(edituser.firstname);
      setLastName(edituser.lastname);
      setUserName(edituser.username);
      setPassword(edituser.password);
      setIsChecked(edituser.isChecked);
    }
  }, [edituser]); 

  const SaveDataUser = () => {
    if (!firstname || !lastname || !username || !password) {
      setError(true); 
      alert('All fields must be filled out.');
      return;
    }

    const index = users.findIndex((user) => (user.username === username && user.id!==edituser.id));
    if(index !== -1){
        alert('UserName is already taken, please choose another one');
        return;
    } else {
      // Get current date and format it as day/month/year
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

      dispatch({
        type: 'UpdateUser',
        payload: {
          id:edituser.id,
          firstname: firstname,
          lastname: lastname,
          username: username,
          password: password,
          isChecked: isChecked,
          productsB: edituser.productsB,
          registrationDate:edituser.registrationDate
        },
      });
      setError(false); 
      sessionStorage.username = username
    }
  };

  return (
    <>
      <CssBaseline /> 
      <div style={styles.container}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': {
              m: 0, 
              width: '100%', 
            },
          }}
          noValidate
          autoComplete="off"
          style={styles.formBox}
        >
          <h3>First name:</h3>
          <TextField
            required
            value={firstname}  
            onChange={(e) => setFirstName(e.target.value)}
            size="small"
            error={error && !firstname} 
            helperText={error && !firstname ? 'First Name is required' : ''}
            inputProps={{ style: { textAlign: 'center' } }}  
          />
          <h3>Last name:</h3>
          <TextField
            required
            value={lastname}  
            onChange={(e) => setLastName(e.target.value)}
            size="small"
            error={error && !lastname} 
            helperText={error && !lastname ? 'Last Name is required' : ''}
            inputProps={{ style: { textAlign: 'center' } }} 
          />
          <h3>User name:</h3>
          <TextField
            required
            value={username}  
            onChange={(e) => setUserName(e.target.value)}
            size="small"
            error={error && !username} 
            helperText={error && !username ? 'Username is required' : ''}
            inputProps={{ style: { textAlign: 'center' } }}  
          />
          <h3>Password:</h3>
          <TextField
            required
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            error={error && !password} 
            helperText={error && !password ? 'Password is required' : ''}
            inputProps={{ style: { textAlign: 'center' } }}  
          /><br /><br />
          
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                name="acceptTerms"
              />
            }
            label="Allow others to see my orders"
          />
          
          <Button
            variant="contained"
            onClick={SaveDataUser}
            style={styles.submitButton}
          >
            Save
          </Button>
        </Box>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    backgroundColor: '#f0f0f0', // Gray background for the whole page
  },
  formBox: {
    backgroundColor: '#ffffff', // White background for the form box
    padding: '20px', // Padding inside the form box
    borderRadius: '8px', // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow effect for better visibility
    width: '90%',
    maxWidth: '400px', // Max width for the form
  },
  submitButton: {
    backgroundColor: '#007bff', // Blue button
    width: '100%', // Make the button width the same as the text fields
    marginTop: '16px', // Add some space above the button
  },
};

export default memo(EditUserCopm);
