import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Global, css } from '@emotion/react'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=Material+Icons&family=Bungee+Shade&family=Poppins');

        html,
        body {
          margin: 0;
          padding: 0;
        }

        html,
        body,
        input,
        button {
          font-family: Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI',
            'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}
    />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path=':customRoom' element={<App />} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
