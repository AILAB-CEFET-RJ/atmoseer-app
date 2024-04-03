import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Geolocation from './Geolocation.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Geolocation />
  </React.StrictMode>,
)
