import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  
import '../styles/Header.css';  

const Header = () => {
  const { user, dispatch } = useContext(AuthContext);  

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });  
    localStorage.removeItem('user');  
  };

  return (
    <header className="header-container">
      <nav>
        <ul>
          <li>
            <Link to="/">Početna</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/login">Prijava</Link>
              </li>
              <li>
                <Link to="/register">Registracija</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <span className="user-icon">
                  {user.username || "👤"} 
                </span>
              </li>
              <li>
                <button onClick={handleLogout}>Odjava</button> 
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
