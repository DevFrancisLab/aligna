import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'

export default function SplineHero() {
  const [isPlaying, setIsPlaying] = useState(true)
  const controls = useAnimation()

  useEffect(() => {
    if (isPlaying) {
      controls.start({
        rotate: 360,
        transition: { duration: 20, ease: "linear", repeat: Infinity }
      })
    } else {
      controls.stop()
    }
  }, [isPlaying, controls])

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl flex items-center justify-center overflow-hidden border border-white/20 shadow-2xl">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #8b5cf6 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Main animated logo */}
      <motion.div 
        className="relative z-10"
        animate={controls}
        style={{ transformOrigin: "center" }}
      >
        <div className="relative">
          {/* Outer ring */}
          <motion.div 
            className="absolute inset-0 w-32 h-32 border-4 border-blue-200 rounded-full"
            variants={pulseVariants}
            animate="animate"
          />
          
          {/* Middle ring */}
          <motion.div 
            className="absolute inset-2 w-28 h-28 border-4 border-indigo-300 rounded-full"
            variants={pulseVariants}
            animate="animate"
            style={{ animationDelay: "0.5s" }}
          />
          
          {/* Inner circle */}
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 animate-shimmer" />
            
            {/* Logo content */}
            <div className="relative z-10">
              <motion.div 
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-2xl">A</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating particles */}
      <motion.div 
        className="absolute top-8 left-8 w-4 h-4 bg-blue-400 rounded-full opacity-60"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute top-16 right-12 w-3 h-3 bg-indigo-400 rounded-full opacity-70"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      />
      <motion.div 
        className="absolute bottom-12 left-16 w-5 h-5 bg-purple-400 rounded-full opacity-50"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      />
      <motion.div 
        className="absolute bottom-8 right-8 w-2 h-2 bg-blue-300 rounded-full opacity-80"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Control buttons */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <motion.button
          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </motion.button>
        <motion.button
          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => controls.set({ rotate: 0 })}
        >
          <RotateCcw size={14} />
        </motion.button>
      </div>

      {/* Animated waves */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="rgba(59, 130, 246, 0.1)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="rgba(139, 92, 246, 0.1)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </div>

      {/* Interactive hover areas */}
      <motion.div 
        className="absolute inset-0 cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}
