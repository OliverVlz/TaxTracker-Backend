import React from 'react';
import { useParams } from 'react-router-dom';

const ClienteProfile = () => {
  const { idCliente } = useParams();

  return (
    <div>
      <h1>Perfil del Cliente {idCliente}</h1>
      {/* Muestra los detalles del cliente */}
    </div>
  );
};

export default ClienteProfile;
