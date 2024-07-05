import { useState } from 'react';
import styles from './Login.module.css';

export function Login({ handleLogin }) {
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Validar que ambos campos estén llenos
      if (!username || !password) {
        setError('Por favor completa ambos campos');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          handleLogin(username);
        } else {
          setError('Credenciales incorrectas');
        }
      } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        setError('Error en la autenticación');
      }
    };
  
    return (
      <div className={styles.container}>
        <h1 className={styles.appTitle}>Tax-Tracker</h1>
        <div className={styles.loginContainer}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <h1 className={styles.containertitle}>Login</h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className={styles.errorText}>{error}</p>}
            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
      </div>
    );
  };


