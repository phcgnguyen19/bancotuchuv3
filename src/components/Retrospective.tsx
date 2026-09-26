import { motion } from 'framer-motion';
import { Check, X, BookOpen, Star } from 'lucide-react';
import type { Era, Decision } from '../data/gameData';

interface Props {
  era: Era;
  eraChoices: Decision[];
  onContinue: () => void;
}

export default function Retrospective({ era, eraChoices, onContinue }: Props) {
  const eraTotalScore = eraChoices.reduce((sum, c) => sum + c.alignmentScore, 0);
  const maxPossible = era.events.length * 10; // 10 is max score per decision
  const scoreRatio = eraTotalScore / maxPossible;
  
  const scoreColor = scoreRatio >= 0.8 ? 'text-emerald-400' : scoreRatio >= 0.5 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="flex-1 flex flex-col bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(30,58,138,0.3),_transparent_60%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-10 shrink-0">
          <h3 className="text-sm text-slate-500 uppercase tracking-[0.3em] font-bold mb-2">Phân tích hồi cứu</h3>
          <h2 className={`text-4xl font-black ${era.accentColor}`}>{era.year} — {era.title}</h2>
        </motion.div>

        {/* Choices Comparison Grid */}
        <div className="grid gap-8 mb-10 shrink-0">
          {era.events.map((event, index) => {
            const playerChoice = eraChoices[index];
            const historicalChoice = event.decisions.find(d => d.isHistorical);
            const isMatch = playerChoice?.isHistorical;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.2 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 relative"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center font-black text-slate-400">
                  {index + 1}
                </div>
                
                <h4 className="text-white/60 text-sm font-bold uppercase mb-4">{event.question}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Player */}
                  <div className={`p-4 rounded-xl border ${isMatch ? 'bg-emerald-950/30 border-emerald-700/50' : 'bg-red-950/30 border-red-700/50'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {isMatch ? <Check className="w-5 h-5 text-emerald-400" /> : <X className="w-5 h-5 text-red-400" />}
                        <span className="text-sm font-bold text-white uppercase">Bạn đã chọn</span>
                      </div>
                      <span className="text-sm font-bold text-amber-400">+{playerChoice?.alignmentScore} điểm</span>
                    </div>
                    <p className="text-white/90 font-medium">{playerChoice?.label}</p>
                  </div>

                  {/* Historical */}
                  <div className="p-4 rounded-xl border bg-blue-950/30 border-blue-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-bold text-white uppercase">Lịch sử đã chọn</span>
                    </div>
                    <p className="text-white/90 font-medium">{historicalChoice?.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Alignment Score summary */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-10 shrink-0"
        >
          <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 rounded-3xl px-8 py-4">
            <Star className={`w-12 h-12 ${scoreColor}`} />
            <div className="text-left">
              <div className="text-sm text-slate-500 uppercase tracking-wider font-bold">Điểm kỷ nguyên này</div>
              <div className={`text-4xl font-black ${scoreColor}`}>
                +{eraTotalScore} <span className="text-xl text-slate-600">/{maxPossible}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Analysis & Lesson */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0 mb-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-blue-950 to-indigo-950 p-6 rounded-2xl border border-blue-800/30"
          >
            <h4 className="text-amber-400 font-black uppercase tracking-wider text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-amber-400/50" />
              Đường lối của Đảng
            </h4>
            <p className="text-white/80 text-sm leading-relaxed">{era.partyAnalysis}</p>
            <p className="text-white/60 text-xs italic mt-3 pt-3 border-t border-blue-900/50">{era.historicalOutcome}</p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-center"
          >
            <h4 className="text-emerald-400 font-black uppercase tracking-wider text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-emerald-400/50" />
              Bài học rút ra
            </h4>
            <p className="text-white font-semibold text-lg leading-relaxed">{era.lesson}</p>
          </motion.div>
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center pb-8 mt-auto shrink-0"
        >
          <button
            onClick={onContinue}
            className="px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xl rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            Bước sang kỷ nguyên tiếp theo →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
