import React, { useState } from 'react';

export default function WaterCheck({ poolName = "Sportbecken" }) {
  const [ph, setPh] = useState(7.0);
  const [chlorine, setChlorine] = useState(0.3);
  const [saved, setSaved] = useState(false);

  // Status-Logik
  const getPhStatus = (val) => {
    if (val < 6.5) return { color: 'bg-red-100 text-red-800', msg: 'Zu niedrig (Säuresturz Gefahr)' };
    if (val > 7.6) return { color: 'bg-red-100 text-red-800', msg: 'Zu hoch (Chlor wirkt nicht)' };
    if (val < 6.8 || val > 7.4) return { color: 'bg-yellow-100 text-yellow-800', msg: 'Achtung' };
    return { color: 'bg-green-100 text-green-800', msg: 'Optimal' };
  };

  const getClStatus = (val) => {
    if (val < 0.3) return { color: 'bg-red-100 text-red-800', msg: 'Zu wenig! (Verkeimung)' };
    if (val > 0.6) return { color: 'bg-yellow-100 text-yellow-800', msg: 'Hoch' };
    return { color: 'bg-green-100 text-green-800', msg: 'Optimal' };
  };

  const phStat = getPhStatus(ph);
  const clStat = getClStatus(chlorine);

  const handleSave = () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-auto border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">💧 {poolName}</h2>
        <span className="text-xs font-mono text-slate-400">{new Date().toLocaleTimeString().slice(0,5)} Uhr</span>
      </div>

      {/* pH Wert Control */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
            <label className="text-slate-500 font-medium">pH-Wert</label>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${phStat.color}`}>
                {ph.toFixed(1)} • {phStat.msg}
            </span>
        </div>
        <input
            type="range"
            min="6.0" max="8.0" step="0.1"
            value={ph}
            onChange={(e) => setPh(parseFloat(e.target.value))}
            className="w-full h-12 accent-blue-600 cursor-pointer touch-none"
        />
        <div className="flex justify-between text-xs text-slate-400 px-1 mt-1">
            <span>6.0</span>
            <span className="font-bold text-green-600">7.0</span>
            <span>8.0</span>
        </div>
      </div>

      {/* Chlor Wert Control */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
            <label className="text-slate-500 font-medium">Freies Chlor (mg/l)</label>
             <span className={`px-3 py-1 rounded-full text-sm font-bold ${clStat.color}`}>
                {chlorine.toFixed(1)} • {clStat.msg}
            </span>
        </div>
         <input
            type="range"
            min="0.0" max="2.0" step="0.1"
            value={chlorine}
            onChange={(e) => setChlorine(parseFloat(e.target.value))}
            className="w-full h-12 accent-cyan-500 cursor-pointer touch-none"
        />
         <div className="flex justify-between text-xs text-slate-400 px-1 mt-1">
            <span>0.0</span>
            <span className="font-bold text-green-600">0.3 - 0.6</span>
            <span>2.0</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleSave}
        className={`w-full py-4 rounded-xl text-lg font-bold transition-all transform active:scale-95 ${
            saved
            ? 'bg-green-500 text-white'
            : 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700'
        }`}
      >
        {saved ? 'Gespeichert! ✓' : 'Werte eintragen'}
      </button>

      <p className="text-center text-slate-400 text-xs mt-4">
        Automatische Synchronisierung aktiv
      </p>
    </div>
  );
}
