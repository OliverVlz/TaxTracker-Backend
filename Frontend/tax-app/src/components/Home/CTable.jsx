/*import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { format, isAfter, parseISO } from 'date-fns';
import axios from 'axios';

export const CTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPendingObligations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/obligations/pending');
        const today = new Date();

        const filteredData = response.data
          .filter(item => item.status === 'pendiente' && isAfter(parseISO(item.date), today))
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setData(filteredData);
      } catch (error) {
        console.error('Error fetching pending obligations:', error);
      }
    };

    fetchPendingObligations();
  }, []);

  const columns = [
    { name: 'id', label: 'ID', options: { filter: false, sort: false } },
    { name: 'name', label: 'Nombre', options: { filter: false, sort: false } },
    { name: 'obligations', label: 'Obligaciones Pendientes', options: { filter: false, sort: false } },
    {
      name: "date",
      label: "Fecha límite",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return format(new Date(value), 'dd/MM/yyyy');
        }
      }
    },
    {
      name: "profile",
      label: "Perfil",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const clientId = tableMeta.rowData[0]; // Obtener el ID del cliente desde la fila actual
          return (
            <button
              onClick={() => {
                window.location.href = `/profile/${clientId}`;
              }}
            >
              Ver Perfil
            </button>
          );
        }
      }
    },
  ];

  return (
    <MUIDataTable
      title={'Prioridades de Clientes'}
      data={data}
      columns={columns}
      options={{
        selectableRows: 'none',
        sortOrder: {
          name: 'date',
          direction: 'asc',
        },
      }}
    />
  );
}

*/
import MUIDataTable from 'mui-datatables';
import { useState, useEffect } from 'react';
import { format, isAfter, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const initialData = [
  { id: 11, name: "Joe James", obligations: "Test Corp", date: '2024-09-01', status: 'pendiente'},
  { id: 11, name: "Joe James", obligations: "Test Corp 2", date: '2024-02-15', status: 'expirado'},
  { id: 2, name: "John Walsh", obligations: "Test DIAN", date: '2024-02-15', status: 'expirado'},
  { id: 3, name: "Bob Herm", obligations: "Test ADUANA", date: '2024-09-30', status: 'pendiente'},
  { id: 3, name: "Bob Herm", obligations: "Test ADUANA 2", date: '2024-07-30', status: 'notificado'},
  { id: 4, name: "James Houston", obligations: "Test VISA", date: '2024-07-20', status: 'pendiente'},
  { id: 4, name: "James Houston", obligations: "Test VISA 2", date: '2024-08-20', status: 'notificado'},
  { id: 4, name: "James Houston", obligations: "Test VISA 3", date: '2024-09-20', status: 'pendiente'},
  { id: 4, name: "James Houston", obligations: "Test VISA 4", date: '2024-10-20', status: 'pendiente'},
  { id: 4, name: "James Houston", obligations: "Test VISA 5", date: '2024-11-20', status: 'expirado'},
  { id: 4, name: "James Houston", obligations: "Test VISA 6", date: '2024-12-20', status: 'pendiente'},
  { id: 4, name: "James Houston", obligations: "Test VISA 7", date: '2025-01-20', status: 'pendiente'},
];

export const CTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const filteredData = initialData
      .filter(item => item.status === 'pendiente' || isAfter(parseISO(item.date), today))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setData(filteredData);
  }, []);

  //Columns
  const columns = [
    { name: 'id', label: 'ID', options: { filter: false, sort: false } },
    { name: 'name', label: 'Nombre', options: { filter: false, sort: false } },
    { name: 'obligations', label: 'Obligaciones Pendientes', options: { filter: false, sort: false } },
    {
      name: "date",
      label: "Fecha limite",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return format(new Date(value), 'dd/MM/yyyy'); // formatea la fecha
        }
      }
    },
    {
      name: "profile",
      label: "Perfil",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const clientId = tableMeta.rowData[0]; // Obtener el ID del cliente desde la fila actual
          return (
            <button
              onClick={() => {
                window.location.href = `/profile/${clientId}`;
              }}
            >
              Ver Perfil
            </button>
          );
        }
      }
    },
  ];
  //render
  return (
    <MUIDataTable
      title={'Prioridades de Clientes'}
      data={data}
      columns={columns}
      options={{
        selectableRows: 'none',
        sortOrder: {
          name: 'date',  
          direction: 'asc', 
        },
        customBodyRender: (value, tableMeta) => {
          const clientId = tableMeta.rowData[0]; // Obtener el ID del cliente desde la fila actual
          return (
            <button
              onClick={() => navigate(`/profile/${clientId}`)}
            >
              Ver Perfil
            </button>
          );
        },
      }}
    />
  );
}