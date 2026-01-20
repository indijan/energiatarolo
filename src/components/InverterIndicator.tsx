"use client";

import { motion } from "framer-motion";

const statusMap = {
  pending: {
    label: "Válaszra vár",
    led: "bg-slate-600",
    glow: "",
  },
  eligible: {
    label: "Indulhat",
    led: "bg-emerald-400",
    glow: "glow-green",
  },
  ineligible: {
    label: "Jogosultság kérdéses",
    led: "bg-rose-400",
    glow: "glow-red",
  },
};

export type EligibilityStatus = keyof typeof statusMap;

interface InverterIndicatorProps {
  status: EligibilityStatus;
}

export function InverterIndicator({ status }: InverterIndicatorProps) {
  const config = statusMap[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative mx-auto w-full max-w-xl"
    >
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -bottom-16 right-6 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl" />

      <div className="inverter-shadow relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,116,144,0.2),transparent_55%)]" />

        <div className="relative flex flex-col gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Jogosultság</p>
            <p className="text-xl font-semibold text-white">Előszűrés eredménye</p>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <div className="rounded-xl border border-cyan-500/20 bg-slate-900/80 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-2xl font-semibold text-white">{config.label}</p>
                  <div className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2">
                    <span className={`h-8 w-8 rounded-full ${config.led} ${config.glow}`} />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <div className="absolute right-5 top-4 h-10 w-10 rounded-full border border-white/10 bg-slate-900" />
              <div className="absolute left-5 top-4 h-10 w-10 rounded-full border border-white/10 bg-slate-900" />
              <div className="mt-14 grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="h-3 rounded-full bg-slate-800/80" />
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/80 p-3">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Állapot</span>
                  <span>{status === "pending" ? "--" : status === "eligible" ? "Zöld" : "Piros"}</span>
                </div>
                <motion.div
                  animate={{ width: ["20%", "80%", "20%"] }}
                  transition={{ duration: 3.6, repeat: Infinity }}
                  className="mt-3 h-1 rounded-full bg-cyan-400/60"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
