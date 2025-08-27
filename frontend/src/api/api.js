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

// Helper to handle fetch with mock fallback
const fetchWithFallback = async (fetchFn, fallbackFn) => {
  try {
    return await fetchFn()
  } catch (error) {
    console.error('API fetch failed:', error)
    return await fallbackFn()
  }
}

// API functions
export const api = {
  // Authentication
  login: async (credentials) => fetchWithFallback(
    async () => {
      if (USE_MOCK) {
        await delay(1000)
        if (credentials.email === 'user@example.com' && credentials.password === 'password') {
          return { user: mockUser, token: 'mock-jwt-token' }
        }
        throw new Error('Invalid credentials')
      }
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || errorData.non_field_errors?.[0] || 'Login failed')
      }
      return await response.json()
    },
    async () => {
      await delay(1000)
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        return { user: mockUser, token: 'mock-jwt-token' }
      }
      throw new Error('Invalid credentials')
    }
  ),

  signup: async (userData) => fetchWithFallback(
    async () => {
      if (USE_MOCK) {
        await delay(1000)
        return { user: { ...mockUser, ...userData }, token: 'mock-jwt-token' }
      }
      const signupData = {
        username: userData.email,
        email: userData.email,
        password: userData.password,
        password_confirm: userData.confirmPassword || userData.password,
        first_name: userData.name?.split(' ')[0] || '',
        last_name: userData.name?.split(' ').slice(1).join(' ') || ''
      }
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData)
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(Object.values(errorData).flat().join(', ') || 'Signup failed')
      }
      return await response.json()
    },
    async () => {
      await delay(1000)
      return { user: { ...mockUser, ...userData }, token: 'mock-jwt-token' }
    }
  ),

  forgotPassword: async (email) => fetchWithFallback(
    async () => {
      if (USE_MOCK) {
        await delay(1000)
        return { message: 'Password reset email sent' }
      }
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/forgot-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to send reset email')
      }
      return await response.json()
    },
    async () => {
      await delay(1000)
      return { message: 'Password reset email sent' }
    }
  ),

  // Tasks
  getTasks: async () => fetchWithFallback(
    async () => {
      if (USE_MOCK) {
        await delay(500)
        return mockTasks
      }
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      if (!response.ok) throw new Error('Failed to fetch tasks')
      return await response.json()
    },
    async () => {
      await delay(500)
      return mockTasks
    }
  ),

  createTask: async (taskData) => fetchWithFallback(
    async () => {
      if (USE_MOCK) {
        await delay(500)
        const newTask = { id: Date.now().toString(), ...taskData, status: 'pending', createdAt: new Date().toISOString() }
        mockTasks.push(newTask)
        return newTask
      }
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
    },
    async () => {
      await delay(500)
      const newTask = { id: Date.now().toString(), ...taskData, status: 'pending', createdAt: new Date().toISOString() }
      mockTasks.push(newTask)
      return newTask
    }
  ),

  updateTask: async (taskId, updates) => fetchWithFallback(
    async () => {
      if (USE_MOCK) {
        await delay(500)
        const taskIndex = mockTasks.findIndex(t => t.id === taskId)
        if (taskIndex === -1) throw new Error('Task not found')
        mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updates }
        return mockTasks[taskIndex]
      }
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
    },
    async () => {
      await delay(500)
      const taskIndex = mockTasks.findIndex(t => t.id === taskId)
      if (taskIndex === -1) throw new Error('Task not found')
      mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updates }
      return mockTasks[taskIndex]
    }
  ),

  deleteTask: async (taskId) => fetchWithFallback(
    async () => {
      if (USE_MOCK) {
        await delay(500)
        const index = mockTasks.findIndex(t => t.id === taskId)
        if (index === -1) throw new Error('Task not found')
        mockTasks.splice(index, 1)
        return { success: true }
      }
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      if (!response.ok) throw new Error('Failed to delete task')
      return await response.json()
    },
    async () => {
      await delay(500)
      const index = mockTasks.findIndex(t => t.id === taskId)
      if (index === -1) throw new Error('Task not found')
      mockTasks.splice(index, 1)
      return { success: true }
    }
  ),

  getSchedule: async () => fetchWithFallback(
    async () => {
      if (USE_MOCK) {
        await delay(500)
        return mockSchedule.map(item => ({ ...item, task: mockTasks.find(t => t.id === item.taskId) }))
      }
      const response = await fetch(`${API_BASE_URL}/api/v1/schedule`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      if (!response.ok) throw new Error('Failed to fetch schedule')
      return await response.json()
    },
    async () => {
      await delay(500)
      return mockSchedule.map(item => ({ ...item, task: mockTasks.find(t => t.id === item.taskId) }))
    }
  ),

  // Next Task (AI-powered)
  getNextTask: async () => fetchWithFallback(
    async () => {
      if (USE_MOCK) {
        await delay(500)
        const nextTask = mockTasks.find(t => t.status === 'pending')
        return nextTask ? {
          task: nextTask,
          recommendedTime: '2024-01-10T09:00:00Z',
          reason: 'High priority task with approaching deadline'
        } : null
      }
      const tasks = await api.getTasks()
      const response = await fetch(`${API_BASE_URL}/api/v1/brain/next-task/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(tasks)
      })
      if (!response.ok) throw new Error('Failed to fetch next task')
      return await response.json()
    },
    async () => {
      await delay(500)
      const nextTask = mockTasks.find(t => t.status === 'pending')
      return nextTask ? {
        task: nextTask,
        recommendedTime: '2024-01-10T09:00:00Z',
        reason: 'High priority task with approaching deadline'
      } : null
    }
  )
}

export default api
