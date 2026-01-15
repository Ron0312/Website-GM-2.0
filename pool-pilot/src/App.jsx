import React from 'react';
import WaterCheck from './components/WaterCheck';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 px-4 pb-20">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Pool<span className="text-blue-600">Pilot</span>
        </h1>
        <p className="text-slate-500">Dein digitales Betriebstagebuch</p>
      </div>

      <div className="w-full max-w-md space-y-6">
        <WaterCheck poolName="Schwimmerbecken" />
        <WaterCheck poolName="Kinderbecken" />
      </div>

      {/* Fake Mobile Menu */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-3 px-6 flex justify-between items-center text-slate-400">
        <div className="flex flex-col items-center text-blue-600">
            <span className="text-2xl">📝</span>
            <span className="text-xs font-medium">Messen</span>
        </div>
        <div className="flex flex-col items-center">
            <span className="text-2xl">📊</span>
            <span className="text-xs font-medium">Berichte</span>
        </div>
        <div className="flex flex-col items-center">
            <span className="text-2xl">⚙️</span>
            <span className="text-xs font-medium">Einstellungen</span>
        </div>
      </nav>
    </div>
  );
}

export default App;
