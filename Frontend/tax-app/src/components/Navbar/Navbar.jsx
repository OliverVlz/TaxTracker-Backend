import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Usando CSS Modules

const Navbar = ({ user, handleLogout }) => {
  return (
    <header>
      <nav className={styles.nav}>
        <label className={styles.logo}>TaskTracker</label>
        <ul className={styles.ul}>
          <li><Link to="/" className={styles.link}>Home</Link></li>
          <li><Link to="/historial" className={styles.link}>Historial</Link></li>
          {user ? (
            <li><button onClick={handleLogout} className={styles.button}>Log Out</button></li>
          ) : (
            <li><Link to="/login" className={styles.link}>Logout</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
