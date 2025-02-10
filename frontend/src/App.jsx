import { Box, useColorModeValue } from '@chakra-ui/react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import ProductsPage from './pages/ProductsPage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import SeriesPreviewPage from './pages/SeriesPreviewPage';
import Series1 from './pages/Series1';
import Series2 from './pages/Series2';
import Series3 from './pages/Series3';

// protected routes for unauthorized peeps
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // hardcoded na toast message HAHAHAHAAHHA mb
    setTimeout(() => { 
      const toast = document.createElement("div");
      toast.textContent = "You must log in to access this page.";
      toast.style.position = "fixed";
      toast.style.bottom = "20px";
      toast.style.left = "50%";
      toast.style.transform = "translateX(-50%)";
      toast.style.background = "#f44336";
      toast.style.color = "white";
      toast.style.padding = "12px 20px";
      toast.style.borderRadius = "5px";
      toast.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.2)";
      toast.style.fontSize = "16px";
      toast.style.zIndex = "1000";
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.remove();
      }, 3000);
    }, 100);

    return <Navigate to="/" />;
  }

  return children;
};


function App() {
  const location = useLocation(); 

  const hideNavbar = location.pathname === '/' || location.pathname === '/register';

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Protected Routes */}
        <Route path='/products' element={<PrivateRoute><SeriesPreviewPage /></PrivateRoute>} />
        <Route path='/products/all-products' element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
        <Route path='/create' element={<PrivateRoute><CreatePage /></PrivateRoute>} />
        <Route path='/products/series1' element={<PrivateRoute><Series1 /></PrivateRoute>} />
        <Route path='/products/series2' element={<PrivateRoute><Series2 /></PrivateRoute>} />
        <Route path='/products/series3' element={<PrivateRoute><Series3 /></PrivateRoute>} />
      </Routes>
    </Box>
  );
}

export default App;