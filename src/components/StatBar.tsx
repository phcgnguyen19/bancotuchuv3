import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe } from 'lucide-react';

interface Props {
  independence: number;
  development: number;
  diplomacy: number;
  alignmentTotal: number;
  eraIndex: number;
  totalEras: number;
}

const clamp = (v: number) => Math.max(0, Math.min(100, Math.round(v)));

export default function StatBar({ independence, development, diplomacy, alignmentTotal, eraIndex, totalEras }: Props) {
  const bars = [
    { label: 'Độc Lập', value: independence, icon: <ShieldCheck className="w-5 h-5" />, gradient: 'from-red-500 to-yellow-500', textColor: 'text-yellow-400' },
    { label: 'Phát Triển', value: development, icon: <Zap className="w-5 h-5" />, gradient: 'from-emerald-500 to-green-400', textColor: 'text-emerald-400' },
    { label: 'Ngoại Giao', value: diplomacy, icon: <Globe className="w-5 h-5" />, gradient: 'from-blue-500 to-cyan-400', textColor: 'text-cyan-400' },
  ];

  return (
    <div className="w-full bg-black/80 backdrop-blur-md text-white px-6 py-3 flex items-center justify-between gap-6 shadow-xl z-50 relative border-b border-white/10">
      
      {/* Era counter */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Kỷ nguyên</span>
        <div className="flex gap-1">
          {Array.from({ length: totalEras }).map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full border ${i <= eraIndex ? 'bg-amber-400 border-amber-300' : 'bg-slate-700 border-slate-600'}`} />
          ))}
        </div>
      </div>

      {/* Stat bars */}
      <div className="flex gap-6 flex-1 justify-center">
        {bars.map((bar) => (
          <div key={bar.label} className="flex items-center gap-2 min-w-[160px]">
            <div className={`flex items-center gap-1 font-bold text-xs whitespace-nowrap ${bar.textColor}`}>
              {bar.icon}
              <span>{bar.label}</span>
            </div>
            <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
              <motion.div
                className={`h-full bg-gradient-to-r ${bar.gradient} rounded-full`}
                animate={{ width: `${clamp(bar.value)}%` }}
                transition={{ type: 'spring', bounce: 0.2 }}
              />
            </div>
            <span className="w-8 text-right font-mono text-xs font-bold text-slate-300">{clamp(bar.value)}</span>
          </div>
        ))}
      </div>

      {/* Alignment score */}
      <div className="flex items-center gap-2 shrink-0 bg-amber-900/30 border border-amber-700/30 rounded-lg px-3 py-1.5">
        <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Đường lối</span>
        <span className="text-lg font-black text-amber-300 font-mono">{alignmentTotal}</span>
        <span className="text-xs text-amber-600">/100</span>
      </div>
    </div>
  );
}
