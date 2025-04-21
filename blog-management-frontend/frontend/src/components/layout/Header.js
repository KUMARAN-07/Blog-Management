// frontend/src/components/Layout/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div>
        <h1 style={styles.logo}><Link to="/">My Blog</Link></h1>
      </div>
      <nav>
        <ul style={styles.navList}>
          <li><Link to="/">Home</Link></li>
          {user ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={handleLogout} style={styles.logoutButton}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

// Simple inline styles
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#333',
    color: 'white',
    padding: '10px 20px',
  },
  logo: { margin: 0 },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '15px',
  },
  logoutButton: {
    background: 'red',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Header;
