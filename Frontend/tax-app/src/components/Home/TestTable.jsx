import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { format, isBefore, parseISO } from 'date-fns';

const initialData = [
  { id: 11, name: "Joe James", obligations: "Test Corp", date: '2024-09-01', status: 'pendiente'},
  { id: 11, name: "Joe James", obligations: "Test Corp 2", date: '2024-02-15', status: 'expirado'},
  { id: 2, name: "John Walsh", obligations: "Test DIAN", date: '2024-02-15', status: 'expirado'},
  { id: 3, name: "Bob Herm", obligations: "Test ADUANA", date: '2024-09-30', status: 'pendiente'},
  { id: 3, name: "Bob Herm", obligations: "Test ADUANA 2", date: '2024-07-30', status: 'notificado'},
  { id: 4, name: "James Houston", obligations: "Test VISA", date: '2024-07-20', status: 'pendiente'},
  { id: 43, name: "James Houston", obligations: "Test VISA 2", date: '2024-08-20', status: 'notificado'},
  { id: 4, name: "James Houston", obligations: "Test VISA 3", date: '2024-09-20', status: 'pendiente'},
  { id: 4, name: "James Houston", obligations: "Test VISA 4", date: '2024-10-20', status: 'pendiente'},
  { id: 4, name: "James Houston", obligations: "Test VISA 5", date: '2024-11-20', status: 'expirado'},
  { id: 4, name: "James Houston", obligations: "Test VISA 6", date: '2024-12-20', status: 'pendiente'},
  { id: 4, name: "James Houston", obligations: "Test VISA 7", date: '2025-01-20', status: 'pendiente'},
];

const ClienteTable = () => {
  const [data, setData] = useState(initialData);


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
        sort: false,
        customBodyRender: (value) => {
          return format(new Date(value), 'dd/MM/yyyy'); // Formatea la fecha
        }
      }
    },
    { 
      name: "status", 
      label: "Estado", 
      options: { 
        filter: false, 
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

export default ClienteTable;
