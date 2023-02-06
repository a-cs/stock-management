import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './hooks/auth';

import './styles/global.css';

const App: React.FC = () => (
  <>
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
    <ToastContainer theme="colored" />
  </>
);
export default App;
