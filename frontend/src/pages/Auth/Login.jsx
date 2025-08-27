import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login(formData)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [0, -100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [180, 360, 180],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold text-2xl">A</span>
              </motion.div>
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Aligna
              </span>
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
                <CardHeader className="text-center pb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Sign in to your account to continue
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence>
                      {error && (
                        <motion.div 
                          className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div 
                      className="space-y-2"
                      variants={itemVariants}
                    >
                      <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span>Email Address</span>
                      </label>
                      <div className="relative group">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          disabled={isLoading}
                          className="bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                        />
                        <motion.div
                          className="absolute inset-0 rounded-md border-2 border-transparent pointer-events-none"
                          animate={{
                            borderColor: focusedField === 'email' ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
                            boxShadow: focusedField === 'email' ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none'
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      variants={itemVariants}
                    >
                      <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-blue-600" />
                        <span>Password</span>
                      </label>
                      <div className="relative group">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('password')}
                          onBlur={() => setFocusedField(null)}
                          required
                          disabled={isLoading}
                          className="bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-400 focus:ring-blue-400 transition-all duration-300 pr-12"
                        />
                        <motion.div
                          className="absolute inset-0 rounded-md border-2 border-transparent pointer-events-none"
                          animate={{
                            borderColor: focusedField === 'password' ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
                            boxShadow: focusedField === 'password' ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none'
                          }}
                          transition={{ duration: 0.2 }}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-center justify-between"
                      variants={itemVariants}
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          id="remember"
                          name="remember"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                        />
                        <label htmlFor="remember" className="text-sm text-gray-700 cursor-pointer">
                          Remember me
                        </label>
                      </div>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        {isLoading ? (
                          <div className="flex items-center justify-center relative z-10">
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Signing in...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center relative z-10">
                            <span>Sign in</span>
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </button>
                    </motion.div>
                  </form>

                  <motion.div 
                    className="text-center"
                    variants={itemVariants}
                  >
                    <p className="text-gray-600">
                      Don't have an account?{' '}
                      <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                        Sign up
                      </Link>
                    </p>
                  </motion.div>

                  {/* Demo credentials */}
                  <motion.div 
                    className="p-4 bg-blue-50 rounded-xl border border-blue-200"
                    variants={itemVariants}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <p className="text-xs text-gray-700 font-medium">Demo credentials</p>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>Email: <span className="text-gray-900 font-medium">user@example.com</span></p>
                      <p>Password: <span className="text-gray-900 font-medium">password</span></p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Features preview */}
          <motion.div 
            className="mt-8 grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {[
              { icon: Zap, text: "Fast", color: "from-yellow-400 to-orange-500" },
              { icon: Shield, text: "Secure", color: "from-green-400 to-emerald-500" },
              { icon: Sparkles, text: "Smart", color: "from-purple-400 to-pink-500" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs text-gray-700 font-medium">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
