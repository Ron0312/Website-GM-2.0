import React from 'react';
import { AlertTriangle, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={32} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Da ist etwas schiefgelaufen</h1>
            <p className="text-gray-600 mb-6">
              Ein unerwarteter Fehler ist aufgetreten. Wir wurden benachrichtigt. Bitte laden Sie die Seite neu.
            </p>
            <div className="space-y-3">
                <button
                onClick={() => window.location.reload()}
                className="w-full bg-gas text-white px-6 py-3 rounded-xl font-bold hover:bg-gas-dark transition-colors"
                >
                Seite neu laden
                </button>
                <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                <Home size={18} />
                Zur Startseite
                </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
