import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, Target, Zap, BarChart3, Users, ArrowRight, CheckCircle } from 'lucide-react'
import SplineHero from '@/components/SplineHero'

const features = [
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'AI-powered task scheduling that adapts to your priorities and deadlines',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Target,
    title: 'Priority Management',
    description: 'Automatically prioritize tasks based on importance and urgency',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Clock,
    title: 'Time Optimization',
    description: 'Optimize your time allocation with intelligent duration estimates',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Visual insights into your productivity and task completion rates',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Zap,
    title: 'Quick Actions',
    description: 'Streamlined task creation and management with minimal friction',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Coordinate with team members and manage shared dependencies',
    color: 'from-indigo-500 to-purple-500'
  }
]

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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [180, 360, 180],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        className="relative z-10 container mx-auto px-4 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
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
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" className="hover:bg-white/20 backdrop-blur-sm">
                  Login
                </Button>
              </motion.div>
            </Link>
            <Link to="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                  Get Started
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-4" variants={itemVariants}>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Smart Task
                <span className="gradient-text"> Scheduling</span>
                <br />
                Made Simple
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Aligna uses AI to intelligently schedule your tasks, optimize your time, 
                and help you achieve more with less stress. Focus on what matters most.
              </p>
            </motion.div>
            
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg group">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 hover:bg-white/20 backdrop-blur-sm">
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            <motion.div className="flex items-center space-x-8 text-sm text-gray-500" variants={itemVariants}>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SplineHero />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div 
          className="text-center space-y-4 mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Everything you need to stay organized
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to help you manage tasks efficiently and achieve your goals faster.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <motion.div
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 group">
                  <CardHeader>
                    <motion.div 
                      className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section 
        className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="grid md:grid-cols-3 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.div 
                className="text-4xl font-bold"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              >
                10,000+
              </motion.div>
              <div className="text-blue-100">Active Users</div>
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.div 
                className="text-4xl font-bold"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                2M+
              </motion.div>
              <div className="text-blue-100">Tasks Completed</div>
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.div 
                className="text-4xl font-bold"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              >
                40%
              </motion.div>
              <div className="text-blue-100">Productivity Increase</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <motion.div 
              className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          
          <div className="space-y-6 max-w-3xl mx-auto relative z-10">
            <h2 className="text-4xl font-bold">
              Ready to transform your productivity?
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of professionals who have already optimized their workflow with Aligna.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto shadow-lg">
                    Get Started Free
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600 shadow-lg">
                  Contact Sales
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="space-y-4" variants={itemVariants}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-2xl font-bold">Aligna</span>
              </div>
              <p className="text-gray-400">
                Smart task scheduling for modern professionals.
              </p>
            </motion.div>
            
            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="font-semibold">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </motion.div>
            
            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="font-semibold">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </motion.div>
            
            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="font-semibold">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p>&copy; 2024 Aligna. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
