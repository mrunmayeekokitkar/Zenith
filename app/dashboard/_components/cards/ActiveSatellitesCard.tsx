import { TelemetryCard } from "../TelemetryCard";
import { motion } from "framer-motion";

export function ActiveSatellitesCard({ count, loading }: { count?: number, loading: boolean }) {
  return (
    <TelemetryCard 
      title="Active Satellites in Range" 
      loading={loading} 
      delay={0.3}
      icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20M4 4l16 16M20 4L4 20"/></svg>}
    >
      <div className="flex flex-col items-center justify-center py-2">
        <div className="relative">
          <motion.div 
            className="font-mono text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={count}
          >
            {count ?? 0}
          </motion.div>
          
          {/* Subtle glowing ring */}
          <div className="absolute inset-0 -m-4 rounded-full border border-sky-500/20 animate-[spin_4s_linear_infinite]" />
          <div className="absolute inset-0 -m-6 rounded-full border border-dashed border-purple-500/20 animate-[spin_6s_linear_infinite_reverse]" />
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-slate-500">Tracked Objects</p>
      </div>
    </TelemetryCard>
  );
}
