import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { format, isAfter, parseISO } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const HistorialTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingObligations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ObligacionesClientes/');
        const today = new Date();
        const filteredData = response.data
          .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching pending obligations:', error);
      }
    };
    fetchPendingObligations();
  }, []);

  const columns = [
    { 
      name: 'clientesEntity', 
      label: 'ID Cliente', 
      options: { 
        filter: true, 
        sort: true,
        customBodyRender: (value) => value.id_cliente
      } 
    },
    {
      name: 'clientesEntity',
      label: 'Nombre Cliente',
      options: { 
        filter: true, 
        sort: true,
        customBodyRender: (value) => value.nombre
      }
    },
    {
      name: 'obligacionesEntity',
      label: 'Obligación Cliente',
      options: { 
        filter: true, 
        sort: true,
        customBodyRender: (value) => value.nombre
      }
    },
    { 
      name: 'valor', 
      label: 'Valor', 
      options: { 
        filter: true, 
        sort: true 
      } 
    },
    {
      name: "fecha",
      label: "Fecha límite",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => format(new Date(value), 'dd/MM/yyyy')
      }
    },
    { 
      name: "estado", 
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
          const clientId = tableMeta.rowData[0].id_cliente;
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/ObligacionesClientes/${clientId}`)}
            >
              Ver Perfil
            </Button>
          );
        }
      }
    },
  ];
  return (
    <MUIDataTable
      title={''}
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
  );
}
