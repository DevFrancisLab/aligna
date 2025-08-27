import React from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">Aligna</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}
          </span>
        </div>
      </div>
    </nav>
  )
}
