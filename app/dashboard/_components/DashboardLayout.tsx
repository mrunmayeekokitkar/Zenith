"use client";

import { useState, useEffect } from "react";
import { fetchTelemetryData, type TelemetryData } from "./lib/api-mock";
import { VisiblePlanetsCard } from "./cards/VisiblePlanetsCard";
import { ISSPositionCard } from "./cards/ISSPositionCard";
import { ActiveSatellitesCard } from "./cards/ActiveSatellitesCard";
import { ObservationConditions } from "./cards/ObservationConditions";
import { CosmicTwinScore } from "./cards/CosmicTwinScore";

export function DashboardLayout() {
  const [lat, setLat] = useState(19.0760); // Default Mumbai
  const [lng, setLng] = useState(72.8777);
  
  const [data, setData] = useState<TelemetryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    
    fetchTelemetryData(lat, lng).then((res) => {
      if (active) {
        setData(res);
        setLoading(false);
      }
    });

    return () => { active = false; };
  }, [lat, lng]);

  const handleManualRefresh = () => {
    setLoading(true);
    fetchTelemetryData(lat, lng).then(setData).finally(() => setLoading(false));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      
      {/* ── Input Header ── */}
      <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row gap-4 items-end justify-between">
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-initial">
            <label className="mb-1 block font-mono text-[9px] uppercase tracking-wider text-slate-500">Latitude</label>
            <input 
              type="number" step="0.0001" value={lat} onChange={e => setLat(Number(e.target.value))}
              className="w-full md:w-32 rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-sm text-slate-200 outline-none focus:border-sky-500/50 focus:bg-sky-500/10 transition-colors"
            />
          </div>
          <div className="flex-1 md:flex-initial">
            <label className="mb-1 block font-mono text-[9px] uppercase tracking-wider text-slate-500">Longitude</label>
            <input 
              type="number" step="0.0001" value={lng} onChange={e => setLng(Number(e.target.value))}
              className="w-full md:w-32 rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-sm text-slate-200 outline-none focus:border-sky-500/50 focus:bg-sky-500/10 transition-colors"
            />
          </div>
        </div>
        
        <button 
          onClick={handleManualRefresh}
          disabled={loading}
          className="w-full md:w-auto flex items-center justify-center gap-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-[10px] uppercase tracking-widest px-6 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {loading ? (
            <span className="h-4 w-4 rounded-full border-2 border-slate-950/20 border-t-slate-950 animate-spin" />
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          )}
          <span>Sync Telemetry</span>
        </button>
      </div>

      {/* ── Dashboard Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CosmicTwinScore score={data?.twinScore} loading={loading} />
        <ObservationConditions data={data?.weather} loading={loading} />
        <VisiblePlanetsCard data={data?.visiblePlanets} loading={loading} />
        <ISSPositionCard data={data?.issPosition} loading={loading} />
        <ActiveSatellitesCard count={data?.activeSatellites} loading={loading} />
      </div>

    </div>
  );
}
