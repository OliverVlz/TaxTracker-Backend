import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Importa ToastContainer y toast desde react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Asegúrate de importar los estilos de react-toastify
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ClienteProfilePage from './pages/ClienteProfilePage';
import Historial from './pages/Historial';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (username) => {
    console.log('Usuario autenticado:', username);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const shouldShowNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <div>
      <ToastContainer /> {/* Aquí se coloca ToastContainer para mostrar las notificaciones */}
      {shouldShowNavbar && <Navbar handleLogout={handleLogout} isAuthenticated={isAuthenticated} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ObligacionesClientes/:id" element={<ClienteProfilePage />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
