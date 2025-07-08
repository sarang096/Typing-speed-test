import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav>
      <Link to="/home" className="title">TYPIFY.</Link>
      <ul>
        {/* <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          // <Link to="/signup">Sign Up</Link>  Link to signup page 
        </li> */}
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        {/* <li>
          <Link to="/settings">Settings</Link>
        </li> */}
        {/* <li>
          <Link to="/aboutus">About Us</Link>
        </li> */}
        <li>
          <Link to="/profile">Community</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/signout">Sign Out</Link> 
        </li>
      </ul>
    </nav>
  );
};
