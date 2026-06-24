"use client";

import { DashboardLayout } from "./_components/DashboardLayout";

export default function DashboardPage() {
  return (
    <main className="flex-1 page-with-nav relative min-h-screen bg-[#03040a] p-4 md:p-8 overflow-x-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-sky-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto mb-8">
        <h1 className="font-mono text-2xl uppercase tracking-[0.2em] text-white flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)] animate-pulse" />
          Data Intelligence Layer
        </h1>
        <p className="mt-2 font-sans text-sm text-slate-400">
          Real-time telemetry uplink, orbital tracking, and atmospheric conditions monitoring.
        </p>
      </div>

      <div className="relative z-10">
        <DashboardLayout />
      </div>

    </main>
  );
}
