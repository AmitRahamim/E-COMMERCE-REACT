import { useState,memo } from 'react';
import { useSelector } from 'react-redux';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import { CssBaseline } from '@mui/material'; 
import { Link,useNavigate } from 'react-router-dom';



function LogInComp() {
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false); // Track form validation errors

  const Login = () => {
    if (!username || !password) {
        setError(true); 
        alert('All fields must be filled out.');
        return;
    }

    if (username === "admin" && password === "admin") {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('role', 'admin'); // Store role if needed
        navigate('/adminpage');
        return;
    }

    const user = users.find(user => user.username === username);
    if (user && user.password === password) {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('role', 'customer'); // Store role if needed
        sessionStorage.setItem('username', username);
        navigate('/customers');
    } else {
        alert('User or password is incorrect!');
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
          <h3 style={styles.header}>Next Gen E-Commerce </h3>
          <TextField
            required
            label="User Name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            size="small"
            error={error && !username} 
            helperText={error && !username ? 'Username is required' : ''}
          /><br /><br />
          
          <TextField
            required
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            error={error && !password} 
            helperText={error && !password ? 'Password is required' : ''}
          /><br /><br />
          
          <Button
            variant="contained"
            onClick={Login}
            style={styles.submitButton}
          >
            Log In
          </Button><br/>
          <h5 style={styles.header}> New User ? <Link to='/Register'>Register</Link> <br /> </h5>

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
    height: '100vh',
    backgroundColor: '#f0f0f0', // Gray background for the whole page
  },
  formBox: {
    backgroundColor: '#f0f0f0', // White background for the form box
    padding: '20px', // Padding inside the form box
    borderRadius: '8px', // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow effect for better visibility
    width: '90%',
    maxWidth: '400px', // Max width for the form
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px', // Space between header and form fields
  },
  submitButton: {
    backgroundColor: '#007bff', // Blue button
    width: '100%', // Make the button width the same as the text fields
    marginTop: '16px', // Add some space above the button
  },
};

export default memo(LogInComp);
