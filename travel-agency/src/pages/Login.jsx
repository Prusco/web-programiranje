import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import '../styles/Auth.css';


const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();

    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        return;
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
      navigate('/'); 

    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
    }
  };

  return (
    <div className="auth-container">
      <h2>Prijava</h2>
      <form className="auth-form" onSubmit={handleClick}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Prijavi se</button>
      </form>
      <div className="auth-footer">
        Nemate račun? <Link to="/register">Registrirajte se</Link>
      </div>
    </div>

  );
};

export default Login;
