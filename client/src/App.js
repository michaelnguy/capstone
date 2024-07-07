import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GuardRoute } from './util/AuthRoute';
import { AuthProvider } from './context/auth';

import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

import './stylesheets/App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/app' element={<GuardRoute />}>
            <Route exact path='/app' element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
