import { useState } from 'react';
import './App.css';
import { Login } from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import ClienteProfile from './pages/ClienteProfile';
import Historial from './pages/Historial';

function App() {
  const [user, setUser] = useState(null); // Estado para el usuario autenticado

  const handleLogin = (username) => {
    setUser(username); // Establecer el usuario autenticado en el estado
  };

  return (
    <div className="App">
      {user ? (
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
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;