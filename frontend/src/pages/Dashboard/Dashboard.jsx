import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/api/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navbar from '@/components/Navbar'
import TaskForm from '@/components/TaskForm'
import NextTaskCard from '@/components/NextTaskCard'
import { Plus, Calendar, BarChart3, Settings, LogOut, Loader2 } from 'lucide-react'
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            <Button 
              onClick={() => setIsTaskFormOpen(true)}
              className="w-full mb-6"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>

            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeView === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
              <Button
                variant="ghost"
                onClick={logout}
                className="w-full justify-start text-gray-700 hover:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Tasks List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    {tasks.length} total
                  </Badge>
                  <Badge variant="outline">
                    {tasks.filter(t => t.status === 'pending').length} pending
                  </Badge>
                </div>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              ) : tasks.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No tasks yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Create your first task to get started with Aligna
                    </p>
                    <Button onClick={() => setIsTaskFormOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Task
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <Card key={task.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{task.title}</CardTitle>
                            {task.description && (
                              <CardDescription className="mt-1">
                                {task.description}
                              </CardDescription>
                            )}
                          </div>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            {task.deadline && (
                              <span>Due: {formatDate(task.deadline)}</span>
                            )}
                            {task.duration && (
                              <span>{task.duration} min</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={task.status === 'completed' ? 'default' : 'secondary'}
                            >
                              {task.status}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTaskUpdate(task.id, { 
                                status: task.status === 'completed' ? 'pending' : 'completed' 
                              })}
                            >
                              {task.status === 'completed' ? 'Reopen' : 'Complete'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Right Panel */}
            <div className="space-y-6">
              <NextTaskCard />
              
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed Today</span>
                    <span className="font-medium">
                      {tasks.filter(t => t.status === 'completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">High Priority</span>
                    <span className="font-medium text-red-600">
                      {tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Week</span>
                    <span className="font-medium">
                      {tasks.filter(t => {
                        if (!t.deadline) return false
                        const deadline = new Date(t.deadline)
                        const weekFromNow = new Date()
                        weekFromNow.setDate(weekFromNow.getDate() + 7)
                        return deadline <= weekFromNow
                      }).length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  )
}
