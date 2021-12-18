import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import { DocumentProvider } from './contexts/DocumentContext'
import { NotificationProvider } from './contexts/NotificationContext'

ReactDOM.render(
  <React.StrictMode>
    <DocumentProvider>
      <NotificationProvider>
        <Router>
          <App />
        </Router>
      </NotificationProvider>
    </DocumentProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
