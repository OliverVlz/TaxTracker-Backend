import React from 'react';
import { LoginForm } from '../components/common/LoginForm';

const Login = ({ handleLogin }) => {
  return (
    <div>
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
};

export default Login;

