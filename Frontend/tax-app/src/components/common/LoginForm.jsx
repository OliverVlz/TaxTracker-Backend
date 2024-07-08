import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginForm.module.css';

export function LoginForm({ handleLogin }) {
  const [usuario, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que ambos campos estén llenos
    if (!usuario || !password) {
      setError('Por favor completa ambos campos');
      return;
    }

    console.log('Enviando solicitud de login con usuario:', usuario, 'y password:', password);

    try {
      const response = await axios.get('http://localhost:8080/Usuario/Login', {
        params: {
          usuario: usuario,
          password: password,
        }
      });
  
      console.log('Respuesta del servidor:', response);
  
      if (response.status === 200) {
        handleLogin(usuario);
        navigate('/'); // Redirige al usuario a la página principal después del inicio de sesión
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.appTitle}>Tax-Tracker</h1>
      <div className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h1 className={styles.formTitle}>Login</h1>
          <input
            type="text"
            className={styles.input}
            placeholder="Username"
            value={usuario}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={styles.errorText}>{error}</p>}
          <button type="submit" className={styles.submitButton}>Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};
