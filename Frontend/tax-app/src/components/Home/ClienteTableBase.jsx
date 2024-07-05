import { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import axios from 'axios';  

export const ClienteTableBase = () => {
  //Configure Hooks
  const [data, setData] = useState([]);

  //Data with axios
  const endpoint = 'https://fakestoreapi.com/products';
  
  //Get data
  const getData = async () => {
    await axios.get(endpoint)
      .then(response => {
        const data = response.data;
        console.log(data);
        setData(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  //Columns
  const columns = [
    { name: 'id', label: 'ID', options: { filter: false, sort: false } },
    { name: 'title', label: 'Title', options: { filter: false, sort: false } },
    { name: 'price', label: 'Price', options: { filter: false, sort: false } },
    { name: 'category', label: 'Category', options: { filter: false, sort: false } },
    { name: 'description', label: 'Description', options: { filter: false, sort: false } },
  ];
  //render
  return (
    <MUIDataTable
      title={'Products'}
      data={data}
      columns={columns}
      options={{
        selectableRows: 'none',
      }}
    />
  );
}