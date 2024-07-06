import React from 'react';
import { HistorialTable } from '../components/Historial/HistorialTable';
import styles from './Historial.module.css';

const Historial = () => {
  return (
    <>
    <div className={styles.container}>
      <h1>Historial</h1>
    </div>

    <div>
      <HistorialTable />
    </div>
    </>
  );
};

export default Historial;
