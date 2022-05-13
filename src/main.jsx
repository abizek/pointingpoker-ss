import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path=':customRoom' element={<App />} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
