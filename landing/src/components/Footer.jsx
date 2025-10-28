import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <span className="logo-icon">🎵</span>
              <span className="logo-text">Dase Market</span>
            </Link>
            <p className="footer-description">
              Your premier marketplace for connecting with talented producers,
              managing adverts, and showcasing creative work.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h3 className="footer-title">Resources</h3>
            <ul className="footer-links">
              <li><Link to="/producers">Producers</Link></li>
              <li><Link to="/adverts">Adverts</Link></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Help Center</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="contact-info">
              <li>
                <Mail size={18} />
                <span>info@dasemarket.com</span>
              </li>
              <li>
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <MapPin size={18} />
                <span>123 Market St, Suite 100<br />San Francisco, CA 94103</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} Dase Market. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

