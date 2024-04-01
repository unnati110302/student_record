import './App.css';
import React, { useState } from 'react';
import CRUD from './CRUD';
import LoginForm from './Login';
import User from './User';
import UserManagement from './UserManagement';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [userName, setUserName] = useState('');
  const [role, setRole] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm setUserName={setUserName} setRole={setRole}/>} />
        <Route path="/crud" element={<CRUD userName={userName} role={role}/>} />
        <Route path="/user" element={<User userName={userName} role={role}/>} />
        <Route path="/userManagement" element={<UserManagement userName={userName} role={role}/>} />
      </Routes>
    </Router>
  );
}

export default App;