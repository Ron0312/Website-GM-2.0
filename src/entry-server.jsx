import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

export function render(url, context = {}) {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <ErrorBoundary>
        <App path={url} context={context} />
      </ErrorBoundary>
    </React.StrictMode>
  )
  return { html }
}
