import { motion } from 'framer-motion';
import type { Era, SubEvent, Decision } from '../data/gameData';

interface Props {
  era: Era;
  event: SubEvent;
  stepNumber: number;
  totalSteps: number;
  onDecide: (decision: Decision) => void;
}

export default function DecisionPanel({ era, event, stepNumber, totalSteps, onDecide }: Props) {
  return (
    <div className={`flex-1 flex flex-col bg-gradient-to-br ${era.color} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 p-8 md:p-12 items-center justify-center">
        
        {/* Progress */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2">
           {Array.from({length: totalSteps}).map((_, i) => (
             <div key={i} className={`w-12 h-2 rounded-full ${i < stepNumber ? 'bg-amber-400' : 'bg-white/20'}`} />
           ))}
        </div>

        <motion.div
          key={event.question} // Animate on new question
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 w-full max-w-4xl"
        >
          <div className="bg-white/10 border border-white/20 p-6 rounded-2xl mb-8 backdrop-blur-sm">
            <p className="text-xl text-white/90 leading-relaxed font-medium">
              {event.context}
            </p>
          </div>
          <h3 className="text-sm text-amber-400 uppercase tracking-[0.3em] font-bold mb-3">Quyết định {stepNumber}/{totalSteps}</h3>
          <p className="text-3xl md:text-5xl text-white font-black drop-shadow-lg leading-tight">
            {event.question}
          </p>
        </motion.div>

        <div className="w-full max-w-5xl grid gap-4">
          {event.decisions.map((decision, i) => (
            <motion.button
              key={`${event.question}-${decision.id}`}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.15, type: 'spring', damping: 20 }}
              onClick={() => onDecide(decision)}
              className="w-full text-left p-6 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-amber-400/50 rounded-2xl transition-all group backdrop-blur-sm shadow-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl font-black text-white/30 group-hover:text-amber-400 transition-colors mt-1 shrink-0 w-12">
                  {decision.id}.
                </span>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {decision.label}
                  </h4>
                  <p className="text-white/60 group-hover:text-white/90 text-base leading-relaxed transition-colors">
                    {decision.text}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
