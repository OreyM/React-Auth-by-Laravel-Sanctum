import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext.jsx'

import App from './views/App'
import './assets/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
