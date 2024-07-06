import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { format, isBefore, isAfter, parseISO } from 'date-fns';
import { Button } from '@mui/material';

const initialData = [
  { id: 4, name: "James Houston", obligations: "Test VISA", date: '2024-07-20', status: 'pendiente'},
  { id: 4, name: "James Houston", obligations: "Test VISA 2", date: '2024-08-20', status: 'notificado'},
  { id: 4, name: "James Houston", obligations: "Test VISA 3", date: '2024-09-20', status: 'pendiente'},
  { id: 4, name: "James Houston", obligations: "Test VISA 4", date: '2024-10-20', status: 'notificado'},
  { id: 4, name: "James Houston", obligations: "Test VISA 5", date: '2024-11-20', status: 'expirado'},
  { id: 4, name: "James Houston", obligations: "Test VISA 6", date: '2024-12-20', status: 'pendiente'},
  { id: 4, name: "James Houston", obligations: "Test VISA 7", date: '2023-01-20', status: 'expirado'},
];

const ClienteProfile = () => {
  const [data, setData] = useState([]);

  // Filtrar y ordenar datos
  useEffect(() => {
    const today = new Date();
    const filteredData = initialData
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setData(filteredData);
  }, []);

  const handleStatusUpdate = (newStatus, rowIndex) => {
    console.log('Updating status:', newStatus, 'for row index:', rowIndex);
    setData(prevData => {
      const newData = [...prevData];
      newData[rowIndex] = { ...newData[rowIndex], status: newStatus };
      return newData;
    });
  };

  const columns = [
    { name: 'id', label: 'ID', options: { filter: false, sort: false } },
    { name: 'name', label: 'Nombre', options: { filter: false, sort: false } },
    { name: 'obligations', label: 'Obligaciones', options: { filter: false, sort: false } },
    {
      name: "date",
      label: "Fecha límite",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return format(new Date(value), 'dd/MM/yyyy'); // Formatea la fecha
        }
      }
    },
    { 
      name: "status", 
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
          const status = tableMeta.rowData[4];
          const date = tableMeta.rowData[3];
          const canNotify = (status === 'pendiente' || status === 'expirado') && isBefore(new Date(), parseISO(date));
          return (
            <Button
              variant="contained"
              color= "success"
              onClick={() => handleStatusUpdate('notificado', rowIndex)}
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
    <MUIDataTable
      title={"Historial Cliente"}
      data={data}
      columns={columns}
      options={{
        selectableRows: 'none',
        sortOrder: {
          name: 'date',
          direction: 'asc',
        },
        onCellClick: (colData, cellMeta) => {
          if (cellMeta.colIndex === 5) { // Assuming 'Actions' is the last column
            const { rowIndex } = cellMeta;
            const row = data[rowIndex];
            if ((row.status === 'pendiente' || row.status === 'expirado') && isBefore(new Date(), parseISO(row.date))) {
              handleStatusUpdate('notificado', rowIndex);
            }
          }
        }
      }}
    />
  );
};

export default ClienteProfile;

/*
import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { format, isBefore, parseISO, isAfter } from 'date-fns';
import axios from 'axios'; // Importa Axios

const ClienteProfile = ({ clientId }) => {
  const [data, setData] = useState([]);

  // Función para cargar datos desde el servidor
  const fetchClientData = async () => {
    try {
      const response = await axios.get(`/api/clientes/${clientId}/obligaciones`); // Endpoint para obtener datos del cliente
      setData(response.data);
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  useEffect(() => {
    fetchClientData(); // Llama a la función al cargar el componente
  }, [clientId]); // Asegúrate de actualizar cuando cambie el clientId

  const handleStatusUpdate = async (newStatus, rowIndex) => {
    const updatedData = [...data];
    updatedData[rowIndex].status = newStatus;
    setData(updatedData);

    // Ejemplo de cómo podrías actualizar el estado en el servidor
    try {
      await axios.put(`/api/obligaciones/${updatedData[rowIndex].id}`, { status: newStatus });
      console.log('Status updated successfully.');
    } catch (error) {
      console.error('Error updating status:', error);
      // Si hay un error, podrías revertir los cambios en el estado local
      updatedData[rowIndex].status = data[rowIndex].status;
      setData(updatedData);
    }
  };

  const columns = [
    { name: 'id', label: 'ID', options: { filter: false, sort: false } },
    { name: 'name', label: 'Nombre', options: { filter: false, sort: false } },
    { name: 'obligations', label: 'Obligaciones', options: { filter: false, sort: false } },
    {
      name: "date",
      label: "Fecha límite",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return format(new Date(value), 'dd/MM/yyyy'); // Formatea la fecha
        }
      }
    },
    { 
      name: "status", 
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
          const status = tableMeta.rowData[4];
          const date = tableMeta.rowData[3];
          const canNotify = (status === 'pendiente' || status === 'expirado') && isBefore(new Date(), parseISO(date));
          return (
            <button
              onClick={() => handleStatusUpdate('notificado', rowIndex)}
              disabled={!canNotify}
            >
              Notificar
            </button>
          );
        }
      } 
    },
  ];

  return (
    <MUIDataTable
      title={"Historial Cliente"}
      data={data}
      columns={columns}
      options={{
        selectableRows: 'none',
        sortOrder: {
          name: 'date',
          direction: 'asc',
        },
        onCellClick: (colData, cellMeta) => {
          if (cellMeta.colIndex === 5) { // Assuming 'Actions' is the last column
            const { rowIndex } = cellMeta;
            const row = data[rowIndex];
            if ((row.status === 'pendiente' || row.status === 'expirado') && isBefore(new Date(), parseISO(row.date))) {
              handleStatusUpdate('notificado', rowIndex);
            }
          }
        }
      }}
    />
  );
};

export default ClienteProfile;
*/