import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Adverts from './pages/Adverts'
import Producers from './pages/Producers'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/adverts" element={<Adverts />} />
            <Route path="/producers" element={<Producers />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

