import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Services from './components/Services';
import Login from './components/Login';
import Register from './components/Register';
import Login_user_list from './components/Login_user_list';
import Users from './components/Users';
import Message from './components/Message';




function App() {
  return (
    <Router>
      <Routes>

        <Route path="/sideebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login-user' element={<Users/>} />
        <Route path='/user-profile' element={<Login_user_list/>} />
        <Route path='/message' element={<Message/>} />



      </Routes>
    </Router>
  );
}

export default App;
