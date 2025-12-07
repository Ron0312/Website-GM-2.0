import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Fonts loaded via CDN in index.html to resolve build issues
// import '@fontsource/inter/400.css';
// import '@fontsource/inter/700.css';

ReactDOM.hydrateRoot(document.getElementById('root'),
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
