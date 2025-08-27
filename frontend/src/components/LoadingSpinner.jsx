import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 border-4 border-blue-200 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-1 border-4 border-blue-400 rounded-full"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.8, 0.5, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute inset-2 bg-blue-600 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {text && (
        <motion.p
          className={`${textSizes[size]} text-gray-600 font-medium`}
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

// Full screen loading component
export function FullScreenLoader({ text = 'Loading your dashboard...' }) {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl mb-4">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
        </motion.div>
        
        <LoadingSpinner size="lg" text={text} />
        
        <motion.div
          className="flex space-x-1 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Skeleton loading component
export function SkeletonLoader({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
    </div>
  )
}

