import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'; // Usando CSS Modules

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Cerrar sesión');
    navigate('/login');
  };

  return (
    <header>
      <nav className={styles.nav}>
        <label className={styles.logo}>TaskTracker</label>
        <ul className={styles.ul}>
          <li><Link to="/" className={styles.link}>Home</Link></li>
          <li><Link to="/historial" className={styles.link}>Historial</Link></li>
          <li><button onClick={handleLogout} className={styles.button}>Log Out</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
