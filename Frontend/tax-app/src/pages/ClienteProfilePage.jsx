import React from 'react';
import { useParams } from 'react-router-dom';
import ClienteProfile from '../components/ClienteProfile/ClienteProfile';
import styles from './ClienteProfilePage.module.css';

const ClienteProfilePage = () => {
  const { id } = useParams();
  // Supongamos que tienes un método para obtener el nombre del cliente según el ID
  //const clientName = "Nombre del cliente"; // Cambia esto según tu lógica para obtener el nombre del cliente

  return (
    <>
      <div className={styles.container}>
        {/*<h1 className={styles.perfil}>Perfil del Cliente</h1>*/}
        {/*<div className={styles.nombre}>*/}
          <h1>Perfil de Cliente</h1>
        {/*</div>*/}
      </div>
      <div>
        <ClienteProfile clientId={id} />
      </div>
    </>
  );
};

export default ClienteProfilePage;
