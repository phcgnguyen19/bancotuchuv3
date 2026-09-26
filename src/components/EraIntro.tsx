import { motion } from 'framer-motion';
import type { Era } from '../data/gameData';

interface Props {
  era: Era;
  onContinue: () => void;
}

export default function EraIntro({ era, onContinue }: Props) {
  return (
    <div className={`flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br ${era.color} relative overflow-hidden`}>
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      
      {/* Year */}
      <motion.div
        initial={{ scale: 3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10"
      >
        <h1 className={`text-8xl md:text-[12rem] font-black tracking-tighter ${era.accentColor} drop-shadow-2xl leading-none`}>
          {era.year}
        </h1>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-10 mt-6"
      >
        <h2 className="text-4xl md:text-6xl font-black text-white mb-3 drop-shadow-lg">
          {era.title}
        </h2>
        <p className="text-xl md:text-2xl text-white/60 italic font-medium">
          {era.subtitle}
        </p>
      </motion.div>

      {/* Context */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 mt-10 max-w-4xl"
      >
        <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium">
          {era.introContext}
        </p>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={onContinue}
        className="relative z-10 mt-12 px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xl rounded-2xl backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
      >
        Tiếp tục →
      </motion.button>
    </div>
  );
}
