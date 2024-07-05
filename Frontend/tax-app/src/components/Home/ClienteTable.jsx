import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import ClienteTable from '../components/Home/ClienteTable';
import styles from './Home.module.css';

const Home = () => {
  // Datos simulados, en la práctica se obtendrían de una API
  const clientes = [
    { idCliente: 1, nombreCliente: 'Cliente 1', obligacionesPendientes: 2, fechaLimite: '2024-07-10' },
    // Más clientes...
  ];

  return (
    <div className={styles.home}>
      <Navbar />
      <div className={styles.container}>
        <h1>Lista de Clientes</h1>
        <ClienteTable clientes={clientes} />
      </div>
    </div>
  );
};

export default Home;
