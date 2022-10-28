import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';

import './styles/commons/commons.css';

export default function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    console.log(user);
    if (localStorage.getItem('auth') && localStorage.getItem('auth') === "ok") {
      setUser(true);
    }
  }, []);

  return (
      <BrowserRouter basename='/okr'>
      <React.StrictMode>
      <Routes>
        {!user &&
        <><Route path='/login' element={<Login authenticate={() => setUser(true)}/>} /><Route path='/signup' element={<Signup />} /></>
        }
        {user &&
        <Route exact path='/dashboard' element={<Dashboard />} />
        }
        <Route path='/' element={<Main />} />
        <Route path='*' element={user ? <Dashboard /> : <Login />} />
      </Routes>
      </React.StrictMode>
    </BrowserRouter>
  );
}
