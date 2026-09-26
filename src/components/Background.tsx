import { motion } from 'framer-motion';

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-50 pointer-events-none">
      {/* Decorative Blobs */}
      <motion.div 
        animate={{ 
          x: [0, 100, -50, 0], 
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-3xl"
      />
      
      <motion.div 
        animate={{ 
          x: [0, -100, 50, 0], 
          y: [0, 100, -50, 0],
          scale: [1, 1.5, 0.8, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-amber-400/10 blur-3xl"
      />

      <motion.div 
        animate={{ 
          x: [0, 50, -100, 0], 
          y: [0, 50, -100, 0],
          scale: [1, 0.9, 1.2, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] rounded-full bg-green-400/10 blur-3xl"
      />

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
    </div>
  );
}
