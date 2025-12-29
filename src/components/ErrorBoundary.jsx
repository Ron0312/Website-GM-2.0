import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-red-100">
                <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={40} className="text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Ups, da ist etwas schiefgelaufen.</h1>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    Entschuldigen Sie die Unannehmlichkeit. Wir arbeiten bereits daran. Bitte laden Sie die Seite neu.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-gas text-white py-4 rounded-xl font-bold hover:bg-gas-dark transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                    <RefreshCw size={20} /> Seite neu laden
                </button>
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 text-left bg-gray-900 text-red-300 p-4 rounded-xl text-xs overflow-auto max-h-40">
                        {this.state.error && this.state.error.toString()}
                    </div>
                )}
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
