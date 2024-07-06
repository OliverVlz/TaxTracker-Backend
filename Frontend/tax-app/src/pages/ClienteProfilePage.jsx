import React from 'react';
import { useParams } from 'react-router-dom';
import ClienteProfile from '../components/ClienteProfile/ClienteProfile';

const ClienteProfilePage = () => {
  const { id } = useParams();

  return (
      <>
    <div>
      <h1>Perfil del Cliente: {id} </h1>
      <ClienteProfile clientId={id} />
    </div>
    </>
  );
};

export default ClienteProfilePage;
