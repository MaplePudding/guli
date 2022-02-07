import React, { useState, useEffect } from 'react';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';

import './App.css';

interface AppProps {}

function App({}: AppProps) {

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Admin />} />
      </Routes>
    </HashRouter> 
  );
}

export default App;
