import logo from './logo.svg'; // If logo is not used, consider removing this import
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import Loginadmin from './Component/Loginadmin';
import Registration from './Component/Registration';
import Admin from './Component/Admin';
import Customer from './Component/Customer';
import Addquery from './Component/Addquery';
import Edit from './Component/Edit';

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Loginadmin" element={<Loginadmin />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/Addquery" element={<Addquery />} />
          <Route path="/Edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
