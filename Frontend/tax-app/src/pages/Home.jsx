import React from 'react';
import ClienteTable from '../components/Home/ClienteTable';
import { CTable } from '../components/Home/CTable';
import TestTable from '../components/Home/TestTable';
import styles from './Home.module.css';

const Home = () => {
  return (
    <>
    <div className={styles.container}>
      <h1>Tabla de prioridades</h1>
    </div>
    <div>
      <CTable />
      {/*<TestTable />*/}
      {/*<ClienteTable />*/}
    </div>
    </>
  );
};

export default Home;
