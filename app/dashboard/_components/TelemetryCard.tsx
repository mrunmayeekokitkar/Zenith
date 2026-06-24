"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TelemetryCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  loading?: boolean;
  className?: string;
  delay?: number;
}

export function TelemetryCard({ title, icon, children, loading, className = "", delay = 0 }: TelemetryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl ${className}`}
    >
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        {icon && <div className="text-sky-400">{icon}</div>}
        <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400 font-medium">
          {title}
        </h3>
      </div>

      {/* Content or Skeleton */}
      <div className="relative min-h-[100px]">
        {loading ? (
          <div className="absolute inset-0 flex flex-col gap-3">
            <div className="h-4 w-3/4 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
