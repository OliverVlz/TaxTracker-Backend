import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { format, isBefore, parseISO } from 'date-fns';
import { Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify'; // Importa toast de react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Asegúrate de importar el CSS de react-toastify

const ClienteProfile = ({ clientId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ObligacionesClientes/`);
        const filteredData = response.data
          .filter(item => item.clientesEntity.id_cliente === parseInt(clientId, 10))
          .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    fetchClientData();
  }, [clientId]);

  const handleStatusUpdate = async (rowIndex) => {
    try {
      const updatedData = [...data];
      const obligacionId = updatedData[rowIndex].id_obligaciones_cliente;
  
      // Realizar la petición para actualizar el estado
      await axios.get(`http://localhost:8080/ObligacionesClientes/${obligacionId}`);
  
      // Mostrar notificación de éxito
      toast.success('Notificado correctamente', {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      // Actualizar el estado local con los nuevos datos
      const response = await axios.get(`http://localhost:8080/ObligacionesClientes/`);
      const filteredData = response.data
        .filter(item => item.clientesEntity.id_cliente === parseInt(clientId, 10))
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      setData(filteredData);
  
    } catch (error) {
      console.error('Error updating estado:', error);
      // Mostrar notificación de error
      toast.error('Error al notificar', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const columns = [
    { name: 'id_obligaciones_cliente', label: 'ID Obligación', options: { filter: false, sort: false} },
    {
      name: "obligacionesEntity",
      label: "Obligaciones",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => value.nombre
      }
    },
    { 
      name: 'valor', 
      label: 'Valor', 
      options: { 
        filter: false, 
        sort: false 
      } 
    },
    {
      name: "fecha",
      label: "Fecha límite",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => format(new Date(value), 'dd/MM/yyyy')
      }
    },
    { 
      name: "estado", 
      label: "Estado", 
      options: { 
        filter: true, 
        sort: false, 
        customBodyRender: (value) => {
          const color = value === 'notificado' ? 'green' : value === 'expirado' ? 'red' : 'black';
          return <span style={{ color }}>{value}</span>;
        }
      } 
    },
    { 
      name: "actions", 
      label: "Notificación", 
      options: { 
        filter: false, 
        sort: false, 
        customBodyRender: (value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const estado = tableMeta.rowData[4];
          const fecha = tableMeta.rowData[3];
          const canNotify = (estado === 'pendiente' || estado === 'expirado') && isBefore(new Date(), parseISO(fecha));
          return (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleStatusUpdate(rowIndex)}
              disabled={!canNotify}
            >
              Notificar
            </Button>
          );
        }
      } 
    },
  ];

  return (
    <>
      <div>
        {/* Información del cliente */}
        <h2>Nombre Cliente: {data.length > 0 && data[0].clientesEntity.nombre}</h2>
        <h3>ID Cliente: {data.length > 0 && data[0].clientesEntity.id_cliente}</h3>
        {/* Más contenido puede ir aquí */}
      </div>
    
      {/* Tabla de historial */}
      <MUIDataTable
        title={"Historial Cliente"}
        data={data}
        columns={columns}
        options={{
          selectableRows: 'none',
          sortOrder: {
            name: 'fecha',
            direction: 'asc',
          },
        }}
      />
    </>
  );
};

export default ClienteProfile;
