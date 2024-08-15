import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { GuardRoute } from './util/AuthRoute';
import { AuthProvider } from './context/auth';

import { SelectedComponentProvider } from './context/selectedComponentContext';

import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Privacy from './pages/privacy';

import './stylesheets/App.css';

function App() {
  return (
    <AuthProvider>
      <SelectedComponentProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/app/*' element={<GuardRoute />}>
              <Route path='*' element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </SelectedComponentProvider>
    </AuthProvider>
  );
}

export default App;
