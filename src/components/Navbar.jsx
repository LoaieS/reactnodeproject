import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Sharanj Forum
      </Link>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/about" className="navbar-link">About</Link>
        <Link to="/contact" className="navbar-link">Contact</Link>
      </div>
      <div className="navbar-user">
        {user ? (
          <>
            <span>{user.username} ({user.role}) </span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link to="/auth" className="navbar-link">Sign In</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
