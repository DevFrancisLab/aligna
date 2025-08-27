import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { Eye, EyeOff, Loader2, User, Mail, Lock, ArrowRight, Sparkles, Shield, Zap, CheckCircle, Star } from 'lucide-react'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [passwordStrength, setPasswordStrength] = useState(0)
  
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (error) setError('')
    
    // Calculate password strength
    if (e.target.name === 'password') {
      const password = e.target.value
      let strength = 0
      if (password.length >= 8) strength += 1
      if (/[a-z]/.test(password)) strength += 1
      if (/[A-Z]/.test(password)) strength += 1
      if (/[0-9]/.test(password)) strength += 1
      if (/[^A-Za-z0-9]/.test(password)) strength += 1
      setPasswordStrength(strength)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setIsLoading(false)
      return
    }

    try {
      await signup(formData)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.')
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

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'from-red-500 to-red-600'
    if (passwordStrength <= 3) return 'from-yellow-500 to-orange-500'
    if (passwordStrength <= 4) return 'from-blue-500 to-blue-600'
    return 'from-green-500 to-emerald-600'
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak'
    if (passwordStrength <= 3) return 'Fair'
    if (passwordStrength <= 4) return 'Good'
    return 'Strong'
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
        {[...Array(30)].map((_, i) => (
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
        <div className="w-full max-w-lg">
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
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                    Join Aligna
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Start your productivity journey today
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
                      <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <User className="w-4 h-4 text-blue-600" />
                        <span>Full Name</span>
                      </label>
                      <div className="relative group">
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          required
                          disabled={isLoading}
                          className="bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                        />
                        <motion.div
                          className="absolute inset-0 rounded-md border-2 border-transparent pointer-events-none"
                          animate={{
                            borderColor: focusedField === 'name' ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
                            boxShadow: focusedField === 'name' ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none'
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </motion.div>

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
                          placeholder="Create a strong password"
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
                      
                      {/* Password strength indicator */}
                      {formData.password && (
                        <motion.div 
                          className="mt-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                        >
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Password strength:</span>
                            <span className={`font-medium ${passwordStrength >= 4 ? 'text-green-600' : passwordStrength >= 3 ? 'text-blue-600' : passwordStrength >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {getPasswordStrengthText()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className={`h-2 bg-gradient-to-r ${getPasswordStrengthColor()} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      variants={itemVariants}
                    >
                      <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-blue-600" />
                        <span>Confirm Password</span>
                      </label>
                      <div className="relative group">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('confirmPassword')}
                          onBlur={() => setFocusedField(null)}
                          required
                          disabled={isLoading}
                          className="bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-400 focus:ring-blue-400 transition-all duration-300 pr-12"
                        />
                        <motion.div
                          className="absolute inset-0 rounded-md border-2 border-transparent pointer-events-none"
                          animate={{
                            borderColor: focusedField === 'confirmPassword' ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
                            boxShadow: focusedField === 'confirmPassword' ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none'
                          }}
                          transition={{ duration: 0.2 }}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      
                      {/* Password match indicator */}
                      {formData.confirmPassword && (
                        <motion.div 
                          className="flex items-center space-x-2 text-xs"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {formData.password === formData.confirmPassword ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span className="text-green-600">Passwords match</span>
                            </>
                          ) : (
                            <>
                              <div className="w-3 h-3 rounded-full border border-red-500" />
                              <span className="text-red-600">Passwords don't match</span>
                            </>
                          )}
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div 
                      className="flex items-start space-x-3"
                      variants={itemVariants}
                    >
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1 cursor-pointer"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                        I agree to the{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-500 underline transition-colors">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-500 underline transition-colors">
                          Privacy Policy
                        </a>
                      </label>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        {isLoading ? (
                          <div className="flex items-center justify-center relative z-10">
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Creating account...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center relative z-10">
                            <span>Create account</span>
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
                      Already have an account?{' '}
                      <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                        Sign in
                      </Link>
                    </p>
                  </motion.div>

                  {/* Benefits */}
                  <motion.div 
                    className="p-4 bg-blue-50 rounded-xl border border-blue-200"
                    variants={itemVariants}
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <p className="text-xs text-gray-700 font-medium">What you'll get</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>Free 14-day trial</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>No credit card</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>AI-powered</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>24/7 support</span>
                      </div>
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
