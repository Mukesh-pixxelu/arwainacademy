import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Courses from './pages/Courses.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Contact from './pages/Contact.jsx'
import TestimonialsPage from './pages/TestimonialsPage.jsx'
import FaqPage from './pages/FaqPage.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<Contact />} />
<<<<<<< HEAD
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
      </Routes>
=======
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/checkout" element={<Checkout />} />
      </Routes>    
>>>>>>> e3989e9e8fb1dd40e0a59175ffcece18a3e8cd68

      <Footer />
    </>
  )
}