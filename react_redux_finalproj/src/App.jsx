import RegisterUserCopm from './components/RegisterUserPage'
import LogInComp from './components/LogInPage';
import { Routes, Route } from 'react-router-dom';
import AdminComp from './components/AdminPage';
import CustomersComp from './components/Customers_HomePage';
import PrivateRoute from './components/PrivateRoute';
import Error from './components/error';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LogInComp />} />
      <Route path="/Register" element={<RegisterUserCopm />} />
      <Route path="*" element={<Error/>} />
      
      {/* Use PrivateRoute for protected routes */}
      <Route 
        path="/adminpage" 
        element={<PrivateRoute element={<AdminComp />} />} 
      />
      
      <Route 
        path="/customers" 
        element={<PrivateRoute element={<CustomersComp />} />} 
      />
    </Routes>
  );
}

export default App;