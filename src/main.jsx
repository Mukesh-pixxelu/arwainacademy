import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './cart/CartContext.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import { CourseProvider } from './courses/CourseContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <AuthProvider>
        <CourseProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)