// frontend/src/components/Layout/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
        <nav>
          <ul className={styles.navList}>
            <li><Link to="/about" className={styles.navLink}>About</Link></li>
            <li><Link to="/contact" className={styles.navLink}>Contact</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
