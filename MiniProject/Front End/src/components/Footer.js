import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/feedback" className="footer-link">Feedback</Link>
          <Link to="/inspiration" className="footer-link">Inspiration</Link>
          <Link to="/aboutus" className="footer-link">About Us</Link>
          <Link to="/ourteam" className="footer-link">Our Team</Link>
          <Link to="/contact" className="footer-link">Contact Us</Link>
        </div>
        <p className="footer-text">&copy; 2024 TYPIFY.</p>
      </div>
    </footer>
  );
};

