import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { format, isAfter, parseISO } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const CTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingObligations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ObligacionesClientes/');
        const today = new Date();
        const filteredData = response.data
          .filter(item => item.estado === 'pendiente' && isAfter(parseISO(item.fecha), today))
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
        filter: false, 
        sort: false,
        customBodyRender: (value) => value.id_cliente
      } 
    },
    {
      name: 'clientesEntity',
      label: 'Nombre Cliente',
      options: { 
        filter: false, 
        sort: false,
        customBodyRender: (value) => value.nombre
      }
    },
    {
      name: 'obligacionesEntity',
      label: 'Obligación Cliente',
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
      name: 'estado', 
      label: 'Estado', 
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
      name: "profile",
      label: "Perfil",
      options: {
        filter: false,
        sort: false,
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
      title={'Prioridades de Clientes'}
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