import { motion } from 'framer-motion';
import { Check, X, Star } from 'lucide-react';
import { eras, type Decision } from '../data/gameData';

interface Props {
  playerChoices: Decision[];
  totalAlignment: number;
  onRestart: () => void;
}

function getRating(score: number) {
  if (score >= 80) return { title: 'Nhà lãnh đạo kiệt xuất', emoji: '🏆', color: 'text-amber-400', desc: 'Bạn thấu hiểu sâu sắc đường lối cách mạng và biết vận dụng sáng tạo trong mọi hoàn cảnh.' };
  if (score >= 60) return { title: 'Cán bộ có triển vọng', emoji: '🎖️', color: 'text-emerald-400', desc: 'Bạn nắm vững phần lớn nguyên tắc, nhưng đôi lúc còn chưa xử lý linh hoạt.' };
  if (score >= 40) return { title: 'Cần trau dồi lý luận', emoji: '📚', color: 'text-yellow-400', desc: 'Bạn đã có nhận thức cơ bản nhưng cần nghiên cứu sâu hơn đường lối của Đảng.' };
  return { title: 'Lệch hướng nghiêm trọng', emoji: '⚠️', color: 'text-red-400', desc: 'Hầu hết quyết định đi ngược lại đường lối cách mạng. Hãy ôn lại bài học và thử lại!' };
}

export default function GameTimeline({ playerChoices, totalAlignment, onRestart }: Props) {
  const rating = getRating(totalAlignment);

  return (
    <div className="flex-1 flex flex-col bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(30,58,138,0.2),_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 p-6 md:p-12 overflow-y-auto">
        {/* Rating Header */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="text-center mb-12 shrink-0"
        >
          <div className="text-7xl mb-4">{rating.emoji}</div>
          <h2 className={`text-3xl md:text-5xl font-black ${rating.color} mb-3`}>{rating.title}</h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">{rating.desc}</p>
          <div className="mt-6 inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-8 py-3">
            <Star className="w-6 h-6 text-amber-400" />
            <span className="text-amber-400 font-black text-3xl">{totalAlignment}</span>
            <span className="text-white/40 font-bold text-lg">/100 điểm Phù hợp Đường lối</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto w-full">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-1 bg-slate-800 rounded-full" />

          {eras.map((era, eraIndex) => {
            const numEvents = era.events.length;
            const startIndex = eras.slice(0, eraIndex).reduce((sum, e) => sum + e.events.length, 0);
            const eraChoices = playerChoices.slice(startIndex, startIndex + numEvents);
            
            // Era overall match?
            const correctCount = eraChoices.filter(c => c?.isHistorical).length;
            const eraScore = eraChoices.reduce((sum, c) => sum + (c?.alignmentScore || 0), 0);
            const isPerfect = correctCount === numEvents;
            const isGood = correctCount > 0;

            return (
              <motion.div
                key={era.id}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + eraIndex * 0.2 }}
                className="relative pl-16 md:pl-20 pb-12"
              >
                {/* Dot */}
                <div className={`absolute left-[14px] md:left-[22px] top-1 w-5 h-5 rounded-full border-4 z-10 ${
                  isPerfect ? 'bg-emerald-400 border-emerald-600' : isGood ? 'bg-amber-400 border-amber-600' : 'bg-red-400 border-red-600'
                }`} />

                {/* Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
                    <div>
                      <span className={`text-sm font-bold ${era.accentColor} uppercase tracking-wider`}>{era.year}</span>
                      <h4 className="text-2xl font-bold text-white mt-1">{era.title}</h4>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-amber-400 font-mono font-black text-lg bg-amber-950/50 px-4 py-1.5 rounded-full">
                        +{eraScore} điểm
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    {era.events.map((event, eventIndex) => {
                      const choice = eraChoices[eventIndex];
                      const match = choice?.isHistorical;
                      return (
                         <div key={eventIndex} className="bg-black/30 p-4 rounded-xl">
                            <div className="flex items-start gap-3">
                              {match ? <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> : <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
                              <div>
                                <p className="text-white/60 text-xs uppercase font-bold mb-1">{event.question}</p>
                                <p className="text-white/90 text-sm font-medium">{choice?.label || 'Chưa chọn'}</p>
                              </div>
                            </div>
                         </div>
                      );
                    })}
                  </div>

                  <div className="bg-blue-950/30 p-4 rounded-xl border border-blue-900/50">
                    <p className="text-blue-300/80 text-sm font-bold uppercase mb-1">Bài học lịch sử</p>
                    <p className="text-white/80 text-sm leading-relaxed">{era.lesson}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Restart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center mt-8 pb-12"
        >
          <button
            onClick={onRestart}
            className="px-12 py-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-900 font-black text-xl rounded-2xl shadow-[0_0_40px_rgba(251,191,36,0.3)] transition-all hover:scale-105 active:scale-95"
          >
            Chơi Lại Từ Đầu
          </button>
        </motion.div>
      </div>
    </div>
  );
}
