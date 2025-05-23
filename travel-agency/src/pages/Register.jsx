import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import '../styles/Auth.css';


const Register = () => {
  const [credentials, setCredentials] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

 const handleClick = async (e) => {
    e.preventDefault();
    console.log("Sending credentials:", credentials);  

    try {
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const result = await res.json();
        if (!res.ok) {
            alert(result.message || 'Greška prilikom registracije.');
            return;
        }

        dispatch({ type: 'REGISTER_SUCCESS', payload: result.data }); 
        navigate('/login');
    } catch (err) {
        alert(err.message);
    }
};



  return (
   <div className="auth-container">
      <h2>Registracija</h2>
      <form className="auth-form" onSubmit={handleClick}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
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
          placeholder="password"
          onChange={handleChange}
          required
        />
        <button type="submit">Registruj se</button>
      </form>
      <div className="auth-footer">
        Već imate račun? <Link to="/login">Prijavite se ovdje</Link>.
      </div>
    </div>
  );
};

export default Register;
