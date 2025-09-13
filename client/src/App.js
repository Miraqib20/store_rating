import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Login from './components/Login';
import Register from './components/Register';
import { setAuthToken } from './api';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(savedUser);
      setAuthToken(token);
      if (savedUser.role === 'ADMIN') navigate('/admin');
      else navigate('/user');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
    </Routes>
  );
}

export default App;
