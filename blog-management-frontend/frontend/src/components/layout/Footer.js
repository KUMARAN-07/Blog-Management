// frontend/src/components/Layout/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
      <nav>
        <ul style={styles.navList}>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </footer>
  );
};

// Simple inline styles
const styles = {
  footer: {
    textAlign: 'center',
    padding: '10px',
    background: '#222',
    color: 'white',
    marginTop: '20px',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
};

export default Footer;
