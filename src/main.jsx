import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fontsource/inter/400.css'; // Defaults to weight 400
import '@fontsource/inter/700.css'; // Bold
import ErrorBoundary from './components/ErrorBoundary.jsx';

ReactDOM.hydrateRoot(document.getElementById('root'),
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
