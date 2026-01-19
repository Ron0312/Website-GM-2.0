import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Component failed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI for a component failure
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
            <AlertTriangle className="text-gray-400 mb-4" size={32} />
            <p className="text-gray-500 font-medium">Karte konnte nicht geladen werden.</p>
            <p className="text-sm text-gray-400 mt-2">Bitte versuchen Sie es später erneut.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ComponentErrorBoundary;
