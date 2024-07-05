import { useState } from 'react';
import './App.css';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

function App() {
  const [user, setUser] = useState(null); // Estado para el usuario autenticado

  const handleLogin = (username) => {
    setUser(username); // Establecer el usuario autenticado en el estado
  };

  return (
    <div className="App">
      {user ? <Home /> : <Login handleLogin={handleLogin} />}
    </div>
  );
}

export default App;
