import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { Bell, Settings, User } from 'lucide-react'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <motion.nav 
      className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-2xl font-bold gradient-text">Aligna</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg"
            whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <User className="w-4 h-4 text-blue-600" />
            <span className="font-medium">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}
            </span>
          </motion.div>
          
          <motion.button
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.nav>
  )
}
