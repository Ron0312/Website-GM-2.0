import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fontsource/inter'; // Defaults to weight 400
import '@fontsource/inter/700.css'; // Bold

ReactDOM.hydrateRoot(document.getElementById('root'),
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
