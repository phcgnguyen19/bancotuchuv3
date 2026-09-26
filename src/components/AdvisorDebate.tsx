import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Era } from '../data/gameData';

interface Props {
  era: Era;
  onContinue: () => void;
}

export default function AdvisorDebate({ era, onContinue }: Props) {
  const [msgIndex, setMsgIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto scroll to bottom when new message arrives
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgIndex]);

  useEffect(() => {
    // Auto advance messages every 2.5 seconds if we aren't at the end
    if (msgIndex < era.debate.length) {
      const timer = setTimeout(() => {
        setMsgIndex(prev => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [msgIndex, era.debate.length]);

  const visibleMessages = era.debate.slice(0, msgIndex);
  const isFinished = msgIndex >= era.debate.length;

  const handleSkip = () => {
    if (!isFinished) {
      setMsgIndex(era.debate.length);
    } else {
      onContinue();
    }
  };

  return (
    <div className={`flex-1 flex flex-col bg-gradient-to-br ${era.color} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 h-full">
        
        {/* Header */}
        <div className="text-center mb-6 shrink-0">
          <h3 className="text-sm text-white/40 uppercase tracking-[0.3em] font-bold mb-2">Hội đồng Cố vấn</h3>
          <h2 className={`text-2xl font-black ${era.accentColor}`}>Tranh biện Chiến lược</h2>
        </div>

        {/* Chat Container */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto pr-4 space-y-6 pb-20 scroll-smooth"
        >
          <AnimatePresence initial={false}>
            {visibleMessages.map((msg, i) => {
              const advisor = era.advisors.find(a => a.stance === msg.speaker)!;
              const isLeft = msg.speaker === 'hawk';
              const isCenter = msg.speaker === 'bamboo';
              const isRight = msg.speaker === 'dove';

              const bubbleColor = 
                isLeft ? 'bg-red-950/80 border-red-800/50 text-red-100' :
                isRight ? 'bg-sky-950/80 border-sky-800/50 text-sky-100' :
                'bg-amber-950/80 border-amber-800/50 text-amber-100';

              const alignmentClass = isCenter ? 'justify-center' : isRight ? 'justify-end' : 'justify-start';
              const textAlignment = isCenter ? 'text-center' : isRight ? 'text-right' : 'text-left';

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                  className={`flex w-full ${alignmentClass}`}
                >
                  <div className={`flex items-end gap-3 max-w-[80%] ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Avatar */}
                    <div className="shrink-0 flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-2xl shadow-lg">
                        {advisor.emoji}
                      </div>
                      <span className="text-[10px] font-bold text-white/50 uppercase">{advisor.name}</span>
                    </div>

                    {/* Bubble */}
                    <div className={`p-4 rounded-2xl border backdrop-blur-md shadow-xl ${bubbleColor} ${textAlignment}`}>
                      <p className="text-lg leading-relaxed font-medium">{msg.text}</p>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing indicator */}
          {!isFinished && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex justify-center mt-4"
            >
              <div className="bg-white/10 rounded-full px-4 py-2 flex gap-2 items-center border border-white/5">
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
          <motion.button
            layout
            onClick={handleSkip}
            className={`px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all ${
              isFinished 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105' 
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {isFinished ? 'Kết thúc phiên chầu →' : 'Bỏ qua tranh luận'}
          </motion.button>
        </div>

      </div>
    </div>
  );
}
