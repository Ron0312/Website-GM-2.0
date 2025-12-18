import React, { Suspense, lazy } from 'react';
import ReactDOMServer from 'react-dom/server';
import pkg from 'react-helmet-async';
const { HelmetProvider } = pkg;
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

export function render(url, context = {}) {
  const helmetContext = {};

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <ErrorBoundary>
        <HelmetProvider context={helmetContext}>
          <App path={url} context={context} />
        </HelmetProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );

  const { helmet } = helmetContext;

  return { html, helmet };
}
