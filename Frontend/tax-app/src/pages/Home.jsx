import React from 'react';
{/*import ClienteTable from '../components/Home/ClienteTable';*/}
import { ClienteTableBase } from '../components/Home/ClienteTableBase';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      {/*<ClienteTable />*/}
      <ClienteTableBase />
    </div>
  );
};

export default Home;
