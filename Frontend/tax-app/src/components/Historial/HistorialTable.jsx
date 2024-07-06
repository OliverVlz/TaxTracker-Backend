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
  { id: 11, name: "Joe James", obligations: "Test Corp", date: '2023-09-01', status: 'pendiente'},
  { id: 11, name: "Joe James", obligations: "Test Corp 2", date: '2022-02-15', status: 'expirado'},
  { id: 2, name: "John Walsh", obligations: "Test DIAN", date: '2021-02-15', status: 'expirado'},
  { id: 3, name: "Bob Herm", obligations: "Test ADUANA", date: '2021-09-30', status: 'pendiente'},
  { id: 3, name: "Bob Herm", obligations: "Test ADUANA 2", date: '2020-07-30', status: 'notificado'},
  { id: 4, name: "James Houston", obligations: "Test VISA", date: '2024-07-20', status: 'pendiente'},
  { id: 4, name: "James Houston", obligations: "Test VISA 2", date: '2020-08-20', status: 'notificado'},
  { id: 4, name: "James Houston", obligations: "Test VISA 3", date: '2024-09-20', status: 'pendiente'},
  { id: 4, name: "James Houston", obligations: "Test VISA 4", date: '2024-10-20', status: 'pendiente'},
  { id: 4, name: "James Houston", obligations: "Test VISA 5", date: '2024-11-20', status: 'expirado'},
  { id: 4, name: "James Houston", obligations: "Test VISA 6", date: '2024-12-20', status: 'pendiente'},
  { id: 4, name: "James Houston", obligations: "Test VISA 7", date: '2025-01-20', status: 'pendiente'},
];

export const HistorialTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const filteredData = initialData
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setData(filteredData);
  }, []);

  //Columns
  const columns = [
    { name: 'id', label: 'ID', options: { filter: true, sort: true } },
    { name: 'name', label: 'Nombre', options: { filter: true, sort: true } },
    { name: 'obligations', label: 'Obligaciones Pendientes', options: { filter: true, sort: true } },
    {
      name: "date",
      label: "Fecha limite",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return format(new Date(value), 'dd/MM/yyyy'); // formatea la fecha
        }
      }
    },
    { 
      name: "status", 
      label: "Estado", 
      options: { 
        filter: true, 
        sort: true, 
        customBodyRender: (value) => {
          const color = value === 'notificado' ? 'green' : value === 'expirado' ? 'red' : 'black';
          return <span style={{ color }}>{value}</span>;
        }
      } 
    },
    {
      name: "profile",
      label: "Perfil",
      options: {
        filter: true,
        sort: true,
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
      }}
    />
  );
}

/*
import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { format } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const HistorialTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistorialData = async () => {
      try {
        const response = await axios.get('https://tu-api.com/historial-clientes'); // Reemplaza con la URL de tu API
        const historialData = response.data; // Suponiendo que la API devuelve un arreglo de datos
        const formattedData = formatData(historialData); // Formatea los datos según lo necesites
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHistorialData();
  }, []);

  const formatData = (data) => {
    return data.map(item => ({
      id: item.id,
      name: item.name,
      obligations: item.obligations,
      date: item.date,
      status: item.status,
    }));
  };

  const columns = [
    { name: 'id', label: 'ID', options: { filter: true, sort: true } },
    { name: 'name', label: 'Nombre', options: { filter: true, sort: true } },
    { name: 'obligations', label: 'Obligaciones Pendientes', options: { filter: true, sort: true } },
    {
      name: "date",
      label: "Fecha límite",
      options: {
        filter: true,
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
        sort: true, 
        customBodyRender: (value) => {
          const color = value === 'notificado' ? 'green' : value === 'expirado' ? 'red' : 'black';
          return <span style={{ color }}>{value}</span>;
        }
      } 
    },
    {
      name: "profile",
      label: "Perfil",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const clientId = tableMeta.rowData[0]; // Obtener el ID del cliente desde la fila actual
          return (
            <button
              onClick={() => {
                navigate(`/profile/${clientId}`); // Navega a la página del perfil del cliente
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
      }}
    />
  );
};

*/