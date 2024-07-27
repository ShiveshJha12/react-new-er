import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Events from './pages/Events';
import Finances from './pages/Finances';
import AddEvent from './components/AddEvent';
import AddFinance from './components/AddFinance';

const App = () => {
  // const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    // On initial load, get the token and username from localStorage
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    setToken(storedToken);
    setUsername(storedUsername || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername('');
  };

  return (
    <Router>
      <div>
        {username && <h1>Welcome, {username}!</h1>} {/* Display username */}
        <button onClick={handleLogout}>Logout</button>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} />} />
          <Route path="/events" element={<Events />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/addfinance" element={<AddFinance />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
