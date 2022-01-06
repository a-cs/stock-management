import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

import { AuthProvider } from './hooks/auth';

import './styles/global.css';

const App: React.FC = () => (
  <>
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  </>
);
export default App;
