import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ClienteProfile from './pages/ClienteProfile';
import Historial from './pages/Historial';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cliente/:id" element={<ClienteProfile />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </Router>
  );
};

export default App;

	