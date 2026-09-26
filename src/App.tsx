import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { eras, INITIAL_STATS, CRISIS_THRESHOLD, type Decision } from './data/gameData';
import StatBar from './components/StatBar';
import EraIntro from './components/EraIntro';
import AdvisorDebate from './components/AdvisorDebate';
import DecisionPanel from './components/DecisionPanel';
import Retrospective from './components/Retrospective';
import GameTimeline from './components/GameTimeline';

type Phase = 'start' | 'era-intro' | 'debate' | 'decision' | 'retrospective' | 'timeline' | 'gameover';

export default function App() {
  const [phase, setPhase] = useState<Phase>('start');
  const [eraIndex, setEraIndex] = useState(0);
  const [subEventIndex, setSubEventIndex] = useState(0);

  const [independence, setIndependence] = useState(INITIAL_STATS.independence);
  const [development, setDevelopment] = useState(INITIAL_STATS.development);
  const [diplomacy, setDiplomacy] = useState(INITIAL_STATS.diplomacy);
  const [alignmentTotal, setAlignmentTotal] = useState(0);
  
  // Store all choices made by player flatly
  const [playerChoices, setPlayerChoices] = useState<Decision[]>([]);
  // Store just the current era's choices for the retrospective
  const [currentEraChoices, setCurrentEraChoices] = useState<Decision[]>([]);

  const currentEra = eras[eraIndex];
  const currentEvent = currentEra?.events[subEventIndex];

  const handleStart = () => {
    setIndependence(INITIAL_STATS.independence);
    setDevelopment(INITIAL_STATS.development);
    setDiplomacy(INITIAL_STATS.diplomacy);
    setAlignmentTotal(0);
    setEraIndex(0);
    setSubEventIndex(0);
    setCurrentEraChoices([]);
    setPlayerChoices([]);
    setPhase('era-intro');
  };

  const handleDecide = (decision: Decision) => {
    setPlayerChoices(prev => [...prev, decision]);
    setCurrentEraChoices(prev => [...prev, decision]);

    const newIndep = Math.max(0, Math.min(100, independence + decision.effects.independence));
    const newDev = Math.max(0, Math.min(100, development + decision.effects.development));
    const newDiplo = Math.max(0, Math.min(100, diplomacy + decision.effects.diplomacy));

    setIndependence(newIndep);
    setDevelopment(newDev);
    setDiplomacy(newDiplo);
    setAlignmentTotal(prev => prev + decision.alignmentScore);

    // Check game over
    if (newIndep <= CRISIS_THRESHOLD || newDev <= CRISIS_THRESHOLD || newDiplo <= CRISIS_THRESHOLD) {
      setPhase('gameover');
      return;
    }

    // Go to next sub-event or retrospective
    if (subEventIndex < currentEra.events.length - 1) {
      setSubEventIndex(prev => prev + 1);
      // We skip debate for subsequent events in the same era to keep flow fast,
      // Or we can just go straight to decision. Let's go straight to decision.
      setPhase('decision');
    } else {
      setPhase('retrospective');
    }
  };

  const handleNextEra = () => {
    if (eraIndex < eras.length - 1) {
      setEraIndex(i => i + 1);
      setSubEventIndex(0);
      setCurrentEraChoices([]);
      setPhase('era-intro');
    } else {
      triggerConfetti();
      setPhase('timeline');
    }
  };

  const triggerConfetti = () => {
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 };
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const interval = setInterval(() => {
      if (Date.now() > animationEnd) return clearInterval(interval);
      const count = 50 * ((animationEnd - Date.now()) / duration);
      confetti({ ...defaults, particleCount: count, origin: { x: rand(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount: count, origin: { x: rand(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const showStats = phase !== 'start' && phase !== 'timeline';

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 overflow-hidden font-sans">
      
      {showStats && (
        <StatBar
          independence={independence}
          development={development}
          diplomacy={diplomacy}
          alignmentTotal={alignmentTotal}
          eraIndex={eraIndex}
          totalEras={eras.length}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={`${phase}-${eraIndex}-${subEventIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 flex flex-col overflow-hidden"
        >

          {phase === 'start' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,58,138,0.3),_transparent_70%)] pointer-events-none" />
              <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10">
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500 mb-2 tracking-tighter leading-tight">
                  HÀNH TRÌNH
                </h1>
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-600 mb-6 tracking-tighter leading-tight">
                  ĐỔI MỚI
                </h1>
              </motion.div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl text-blue-200/60 max-w-3xl mb-4 font-medium relative z-10">
                Trải nghiệm 80 năm lịch sử Việt Nam qua lăng kính quyết sách
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-sm text-slate-500 max-w-2xl mb-12 relative z-10">
                Môn: Tư tưởng Hồ Chí Minh (HCM202) · Chủ đề: Độc lập tự chủ trong hội nhập quốc tế
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                onClick={handleStart}
                className="relative z-10 px-12 py-5 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-2xl rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.3)] transition-all hover:scale-105 active:scale-95"
              >
                BẮT ĐẦU HÀNH TRÌNH
              </motion.button>
            </div>
          )}

          {phase === 'era-intro' && (
            <EraIntro era={currentEra} onContinue={() => setPhase('debate')} />
          )}

          {phase === 'debate' && (
            <AdvisorDebate era={currentEra} onContinue={() => setPhase('decision')} />
          )}

          {phase === 'decision' && currentEvent && (
            <DecisionPanel 
              era={currentEra} 
              event={currentEvent} 
              stepNumber={subEventIndex + 1}
              totalSteps={currentEra.events.length}
              onDecide={handleDecide} 
            />
          )}

          {phase === 'retrospective' && (
            <Retrospective era={currentEra} eraChoices={currentEraChoices} onContinue={handleNextEra} />
          )}

          {phase === 'timeline' && (
            <GameTimeline playerChoices={playerChoices} totalAlignment={alignmentTotal} onRestart={handleStart} />
          )}

          {phase === 'gameover' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-red-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/60 pointer-events-none" />
              <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="relative z-10">
                <h2 className="text-6xl md:text-8xl font-black text-red-500 mb-6 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                  QUỐC GIA LÂM NGUY
                </h2>
              </motion.div>
              <p className="text-2xl text-red-200 max-w-3xl mb-12 relative z-10 font-medium">
                {independence <= CRISIS_THRESHOLD
                  ? 'Đất nước đã mất hoàn toàn nền độc lập tự chủ. Chủ quyền quốc gia bị các thế lực bên ngoài thâu tóm.'
                  : development <= CRISIS_THRESHOLD
                  ? 'Nền kinh tế sụp đổ hoàn toàn. Đất nước rơi vào tình trạng khủng hoảng và đói nghèo cùng cực.'
                  : 'Quan hệ ngoại giao đổ vỡ. Đất nước bị cô lập hoàn toàn trên trường quốc tế.'}
              </p>
              <button
                onClick={handleStart}
                className="relative z-10 px-12 py-4 bg-red-600 hover:bg-red-500 text-white font-black text-xl rounded-2xl shadow-lg transition-all hover:scale-105"
              >
                Viết Lại Lịch Sử
              </button>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
