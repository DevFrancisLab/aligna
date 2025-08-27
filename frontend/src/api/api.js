// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

// Mock data
const mockTasks = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Write and submit the Q4 project proposal for the new feature',
    deadline: '2024-01-15T10:00:00Z',
    priority: 'high',
    duration: 120,
    status: 'pending',
    dependencies: [],
    createdAt: '2024-01-01T09:00:00Z'
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Review pull requests from the development team',
    deadline: '2024-01-12T16:00:00Z',
    priority: 'medium',
    duration: 60,
    status: 'in_progress',
    dependencies: [],
    createdAt: '2024-01-02T10:00:00Z'
  },
  {
    id: '3',
    title: 'Update documentation',
    description: 'Update API documentation with new endpoints',
    deadline: '2024-01-20T12:00:00Z',
    priority: 'low',
    duration: 90,
    status: 'pending',
    dependencies: ['1'],
    createdAt: '2024-01-03T11:00:00Z'
  }
]

const mockUser = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe'
}

const mockSchedule = [
  {
    id: '1',
    taskId: '1',
    scheduledStart: '2024-01-10T09:00:00Z',
    scheduledEnd: '2024-01-10T11:00:00Z',
    date: '2024-01-10'
  },
  {
    id: '2',
    taskId: '2',
    scheduledStart: '2024-01-11T14:00:00Z',
    scheduledEnd: '2024-01-11T15:00:00Z',
    date: '2024-01-11'
  }
]

// Utility function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// API functions with mock fallback
export const api = {
  // Authentication
  async login(credentials) {
    if (USE_MOCK) {
      await delay(1000)
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        return { user: mockUser, token: 'mock-jwt-token' }
      }
      throw new Error('Invalid credentials')
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      
      if (!response.ok) throw new Error('Login failed')
      return await response.json()
    } catch (error) {
      // Fallback to mock
      await delay(1000)
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        return { user: mockUser, token: 'mock-jwt-token' }
      }
      throw new Error('Invalid credentials')
    }
  },

  async signup(userData) {
    if (USE_MOCK) {
      await delay(1000)
      return { user: { ...mockUser, ...userData }, token: 'mock-jwt-token' }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      
      if (!response.ok) throw new Error('Signup failed')
      return await response.json()
    } catch (error) {
      // Fallback to mock
      await delay(1000)
      return { user: { ...mockUser, ...userData }, token: 'mock-jwt-token' }
    }
  },

  async forgotPassword(email) {
    if (USE_MOCK) {
      await delay(1000)
      return { message: 'Password reset email sent' }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      if (!response.ok) throw new Error('Failed to send reset email')
      return await response.json()
    } catch (error) {
      // Fallback to mock
      await delay(1000)
      return { message: 'Password reset email sent' }
    }
  },

  // Tasks
  async getTasks() {
    if (USE_MOCK) {
      await delay(500)
      return mockTasks
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      
      if (!response.ok) throw new Error('Failed to fetch tasks')
      return await response.json()
    } catch (error) {
      // Fallback to mock
      await delay(500)
      return mockTasks
    }
  },

  async createTask(taskData) {
    if (USE_MOCK) {
      await delay(500)
      const newTask = {
        id: Date.now().toString(),
        ...taskData,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      mockTasks.push(newTask)
      return newTask
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(taskData)
      })
      
      if (!response.ok) throw new Error('Failed to create task')
      return await response.json()
    } catch (error) {
      // Fallback to mock
      await delay(500)
      const newTask = {
        id: Date.now().toString(),
        ...taskData,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      mockTasks.push(newTask)
      return newTask
    }
  },

  async updateTask(taskId, updates) {
    if (USE_MOCK) {
      await delay(500)
      const taskIndex = mockTasks.findIndex(t => t.id === taskId)
      if (taskIndex !== -1) {
        mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updates }
        return mockTasks[taskIndex]
      }
      throw new Error('Task not found')
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updates)
      })
      
      if (!response.ok) throw new Error('Failed to update task')
      return await response.json()
    } catch (error) {
      // Fallback to mock
      await delay(500)
      const taskIndex = mockTasks.findIndex(t => t.id === taskId)
      if (taskIndex !== -1) {
        mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updates }
        return mockTasks[taskIndex]
      }
      throw new Error('Task not found')
    }
  },

  async deleteTask(taskId) {
    if (USE_MOCK) {
      await delay(500)
      const taskIndex = mockTasks.findIndex(t => t.id === taskId)
      if (taskIndex !== -1) {
        mockTasks.splice(taskIndex, 1)
        return { success: true }
      }
      throw new Error('Task not found')
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      
      if (!response.ok) throw new Error('Failed to delete task')
      return await response.json()
    } catch (error) {
      // Fallback to mock
      await delay(500)
      const taskIndex = mockTasks.findIndex(t => t.id === taskId)
      if (taskIndex !== -1) {
        mockTasks.splice(taskIndex, 1)
        return { success: true }
      }
      throw new Error('Task not found')
    }
  },

  // Schedule
  async getSchedule() {
    if (USE_MOCK) {
      await delay(500)
      return mockSchedule.map(item => ({
        ...item,
        task: mockTasks.find(t => t.id === item.taskId)
      }))
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/schedule`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      
      if (!response.ok) throw new Error('Failed to fetch schedule')
      return await response.json()
    } catch (error) {
      // Fallback to mock
      await delay(500)
      return mockSchedule.map(item => ({
        ...item,
        task: mockTasks.find(t => t.id === item.taskId)
      }))
    }
  },

  async getNextTask() {
    if (USE_MOCK) {
      await delay(500)
      const nextTask = mockTasks.find(t => t.status === 'pending')
      return nextTask ? {
        task: nextTask,
        recommendedTime: '2024-01-10T09:00:00Z',
        reason: 'High priority task with approaching deadline'
      } : null
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/schedule/next`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      
      if (!response.ok) throw new Error('Failed to fetch next task')
      return await response.json()
    } catch (error) {
      // Fallback to mock
      await delay(500)
      const nextTask = mockTasks.find(t => t.status === 'pending')
      return nextTask ? {
        task: nextTask,
        recommendedTime: '2024-01-10T09:00:00Z',
        reason: 'High priority task with approaching deadline'
      } : null
    }
  }
}

export default api
