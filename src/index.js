import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import './index.css'
import { AuthProvider} from './contexts/AuthContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* wrap app with authprovider to allow authentication and alerts to pass through components */}
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>
);

