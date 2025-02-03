import { Box, useColorModeValue } from '@chakra-ui/react'
import { Route, Routes, useLocation  } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import ProductsPage from './pages/ProductsPage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import SeriesPreviewPage from './pages/SeriesPreviewPage';
import Series1 from './pages/Series1';
import Series2 from './pages/Series2';
import Series3 from './pages/Series3';


function App() {

  const location = useLocation();  // Get the current route/path

  // Hide Navbar on login and signup pages
  const hideNavbar = location.pathname === '/' || location.pathname === '/register';

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {!hideNavbar && <Navbar />} 

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<SeriesPreviewPage />} />
        <Route path='/products/all-products' element={<ProductsPage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/products/series1' element={<Series1/>}/>
        <Route path='/products/series2' element={<Series2/>}/>
        <Route path='/products/series3' element={<Series3/>}/>
      </Routes>
    </Box>

  )
}

export default App
