import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { format, isBefore, parseISO } from 'date-fns';

const initialData = [
  { id: 11, name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY", date: '2024-09-01', status: 'pendiente' },
  { id: 2, name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT", date: '2024-10-15', status: 'pendiente' },
  { id: 3, name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL", date: '2024-05-30', status: 'pendiente' },
  { id: 4, name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX", date: '2024-07-05', status: 'pendiente' },
];

const ClienteTable = () => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const updatedData = initialData.map(item => {
      if (item.status === 'pendiente' && isBefore(parseISO(item.date), new Date())) {
        return { ...item, status: 'vencido' };
      }
      return item;
    });
    setData(updatedData);
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
    { name: "name", label: "Name", options: { filter: true, sort: true } },
    { name: "company", label: "Company", options: { filter: true, sort: false } },
    { name: "city", label: "City", options: { filter: true, sort: false } },
    { name: "state", label: "State", options: { filter: true, sort: false } },
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return format(new Date(value), 'dd/MM/yyyy'); // formatea la fecha
        }
      }
    },
    { 
      name: "status", 
      label: "Status", 
      options: { 
        filter: true, 
        sort: false, 
        customBodyRender: (value) => {
          const color = value === 'exitoso' ? 'green' : value === 'vencido' ? 'red' : 'black';
          return <span style={{ color }}>{value}</span>;
        }
      } 
    },
    { 
      name: "actions", 
      label: "Actions", 
      options: { 
        filter: false, 
        sort: false, 
        customBodyRender: (value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const status = tableMeta.rowData[5];
          const date = tableMeta.rowData[4];
          const canPay = (status === 'pendiente' || status === 'vencido') && isBefore(new Date(), parseISO(date));
          return (
            <button
              onClick={() => handleStatusUpdate('exitoso', rowIndex)}
              disabled={!canPay}
            >
              Pagar
            </button>
          );
        }
      } 
    },
    {
      name: "profile",
      label: "Profile",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <button
              onClick={() => {
                const clientId = data[tableMeta.rowIndex].id; // Get the client's id
                window.location.href = `/profile/${clientId}`;
              }}
            >
              View Profile
            </button>
          );
        }
      }
    },
  ];

  return (
    <MUIDataTable
      title={"Clientes"}
      data={data}
      columns={columns}
      options={{
        filterType: 'checkbox',
        selectableRows: 'none',
        onCellClick: (colData, cellMeta) => {
          if (cellMeta.colIndex === 6) { // Assuming 'Actions' is the last column
            const { rowIndex } = cellMeta;
            const row = data[rowIndex];
            if ((row.status === 'pendiente' || row.status === 'vencido') && isBefore(new Date(), parseISO(row.date))) {
              handleStatusUpdate('exitoso', rowIndex);
            }
          }
        }
      }}
    />
  );
};

export default ClienteTable;
