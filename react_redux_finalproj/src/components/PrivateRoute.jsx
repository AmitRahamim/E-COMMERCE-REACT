import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  
  if (!isLoggedIn) {
    return <Navigate to="/" />; // Redirect to login page if not logged in
  }

  return Component; // Allow access to the requested component if logged in
};

export default PrivateRoute;
