import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PressRoom from './pages/PressRoom';
import Career from './pages/Career';
import Connect from './pages/Connect';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <div className="app-container">
                    <Navbar />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/press" element={<PressRoom />} />
                            <Route path="/career" element={<Career />} />
                            <Route path="/connect" element={<Connect />} />
                            <Route path="/policy" element={<PrivacyPolicy />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
