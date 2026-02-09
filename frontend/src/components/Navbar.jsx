import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/navbar.css';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">⬡</span>
          Fog Compute Grid
        </Link>

        <div className="navbar-mobile-toggle" onClick={toggleMobile}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`navbar-nav ${mobileOpen ? 'open' : ''}`}>
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/network" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Network
          </NavLink>
          <NavLink 
            to="/analytics" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Analytics
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            About
          </NavLink>
        </div>

        <Link to="/dashboard" className="navbar-cta">
          Start Computing
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
