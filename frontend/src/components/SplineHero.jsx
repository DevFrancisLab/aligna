import React from 'react'

export default function SplineHero() {
  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center overflow-hidden">
      {/* Placeholder for Spline 3D scene */}
      <div className="text-center space-y-4">
        <div className="w-32 h-32 mx-auto bg-blue-500 rounded-full flex items-center justify-center shadow-2xl">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          3D Hero Animation
          <br />
          <span className="text-xs">(Spline embed placeholder)</span>
        </p>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -left-8 w-16 h-16 bg-indigo-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-8 right-1/3 w-12 h-12 bg-purple-300 rounded-full opacity-25 animate-pulse"></div>
      </div>
    </div>
  )
}
