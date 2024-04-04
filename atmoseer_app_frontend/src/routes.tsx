import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GeolocationExample from './pages/Geolocation';
import { Home } from './pages/Home';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/forecast' element={<GeolocationExample />} />
        <Route path='*' element={<Navigate to='/home' />} />
      </Routes>
    </BrowserRouter>
  )
}