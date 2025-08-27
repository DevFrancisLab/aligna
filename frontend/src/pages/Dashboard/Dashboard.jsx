import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/api/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navbar from '@/components/Navbar'
import TaskForm from '@/components/TaskForm'
import NextTaskCard from '@/components/NextTaskCard'
import { Plus, Calendar, BarChart3, Settings, LogOut, Loader2, CheckCircle, Clock, AlertTriangle, TrendingUp, Users, Target } from 'lucide-react'
import { getPriorityColor, formatDate } from '@/lib/utils'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const [activeView, setActiveView] = useState('tasks')

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setIsLoading(true)
      const tasksData = await api.getTasks()
      setTasks(tasksData)
    } catch (error) {
      console.error('Failed to load tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTaskCreated = (newTask) => {
    setTasks(prev => [newTask, ...prev])
    setIsTaskFormOpen(false)
  }

  const handleTaskUpdate = async (taskId, updates) => {
    try {
      const updatedTask = await api.updateTask(taskId, updates)
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ))
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const handleTaskDelete = async (taskId) => {
    try {
      await api.deleteTask(taskId)
      setTasks(prev => prev.filter(task => task.id !== taskId))
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const sidebarItems = [
    { id: 'tasks', label: 'Tasks', icon: Calendar },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const pendingTasks = tasks.filter(t => t.status === 'pending').length
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
      </div>

      <Navbar />
      
      <div className="flex relative z-10">
        {/* Sidebar */}
        <motion.div 
          className="w-64 bg-white/90 backdrop-blur-sm border-r border-gray-200/50 min-h-screen shadow-xl"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-6">
            <motion.div 
              className="flex items-center space-x-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                onClick={() => setIsTaskFormOpen(true)}
                className="w-full mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg group"
              >
                <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                New Task
              </Button>
            </motion.div>

            <motion.nav 
              className="space-y-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sidebarItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  variants={itemVariants}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    activeView === item.id
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-md border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </motion.nav>

            <motion.div 
              className="absolute bottom-6 left-6 right-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="ghost"
                onClick={logout}
                className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="flex-1 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tasks List */}
            <div className="lg:col-span-2">
              <motion.div 
                className="flex items-center justify-between mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
                  <p className="text-gray-600">Manage and organize your daily tasks</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1">
                    {tasks.length} total
                  </Badge>
                  <Badge variant="outline" className="border-orange-200 text-orange-700 px-3 py-1">
                    {pendingTasks} pending
                  </Badge>
                </div>
              </motion.div>

              {isLoading ? (
                <motion.div 
                  className="flex items-center justify-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Loading your tasks...</p>
                  </div>
                </motion.div>
              ) : tasks.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardContent className="py-16 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <Calendar className="h-10 w-10 text-white" />
                        </div>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        No tasks yet
                      </h3>
                      <p className="text-gray-600 mb-6 text-lg">
                        Create your first task to get started with Aligna
                      </p>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          onClick={() => setIsTaskFormOpen(true)}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 text-lg"
                        >
                          <Plus className="mr-2 h-5 w-5" />
                          Create Task
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatePresence>
                    {tasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        variants={itemVariants}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          whileHover={{ 
                            y: -4,
                            transition: { type: "spring", stiffness: 300 }
                          }}
                        >
                          <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 group">
                            <CardHeader className="pb-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                                    {task.title}
                                  </CardTitle>
                                  {task.description && (
                                    <CardDescription className="mt-2 text-base">
                                      {task.description}
                                    </CardDescription>
                                  )}
                                </div>
                                <Badge className={`${getPriorityColor(task.priority)} shadow-sm px-3 py-1`}>
                                  {task.priority}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center space-x-6">
                                  {task.deadline && (
                                    <div className="flex items-center space-x-2">
                                      <Clock className="w-4 h-4 text-blue-600" />
                                      <span>Due: {formatDate(task.deadline)}</span>
                                    </div>
                                  )}
                                  {task.duration && (
                                    <span className="flex items-center space-x-2">
                                      <Target className="w-4 h-4 text-green-600" />
                                      <span>{task.duration} min</span>
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Badge 
                                    variant={task.status === 'completed' ? 'default' : 'secondary'}
                                    className={task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
                                  >
                                    {task.status === 'completed' ? (
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                    ) : (
                                      <AlertTriangle className="w-3 h-3 mr-1" />
                                    )}
                                    {task.status}
                                  </Badge>
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleTaskUpdate(task.id, { 
                                        status: task.status === 'completed' ? 'pending' : 'completed' 
                                      })}
                                      className="hover:bg-blue-50 hover:text-blue-600"
                                    >
                                      {task.status === 'completed' ? 'Reopen' : 'Complete'}
                                    </Button>
                                  </motion.div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* Right Panel */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <NextTaskCard />
              
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span>Quick Stats</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div 
                      className="flex justify-between items-center p-4 rounded-xl bg-green-50 border border-green-200"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">Completed Today</p>
                          <p className="text-xs text-gray-500">Tasks finished</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-green-600">
                        {completedTasks}
                      </span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between items-center p-4 rounded-xl bg-red-50 border border-red-200"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">High Priority</p>
                          <p className="text-xs text-gray-500">Urgent tasks</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-red-600">
                        {highPriorityTasks}
                      </span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between items-center p-4 rounded-xl bg-blue-50 border border-blue-200"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">This Week</p>
                          <p className="text-xs text-gray-500">Upcoming tasks</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-blue-600">
                        {tasks.filter(t => {
                          if (!t.deadline) return false
                          const deadline = new Date(t.deadline)
                          const weekFromNow = new Date()
                          weekFromNow.setDate(weekFromNow.getDate() + 7)
                          return deadline <= weekFromNow
                        }).length}
                      </span>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Task Form Modal */}
      <AnimatePresence>
        {isTaskFormOpen && (
          <TaskForm
            isOpen={isTaskFormOpen}
            onClose={() => setIsTaskFormOpen(false)}
            onTaskCreated={handleTaskCreated}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
