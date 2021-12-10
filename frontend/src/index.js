import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import { DocumentProvider } from './contexts/DocumentContextV2'
import { NotificationProvider } from './contexts/NotificationContext'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <DocumentProvider>
      <NotificationProvider>
        <Router>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Router>
      </NotificationProvider>
    </DocumentProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
