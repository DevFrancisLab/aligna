import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { api } from '../api/api'

const AuthContext = createContext()

const initialState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false
      }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user)
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: parsedUser, token }
        })
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    
    dispatch({ type: 'SET_LOADING', payload: false })
  }, [])

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' })
    
    try {
      const response = await api.login(credentials)
      
      // Store in localStorage
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      if (response.refresh) {
        localStorage.setItem('refresh', response.refresh)
      }
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response
      })
      
      return response
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' })
      throw error
    }
  }

  const signup = async (userData) => {
    dispatch({ type: 'LOGIN_START' })
    
    try {
      const response = await api.signup(userData)
      
      // Store in localStorage
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      if (response.refresh) {
        localStorage.setItem('refresh', response.refresh)
      }
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response
      })
      
      return response
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' })
      throw error
    }
  }

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh')
      if (refreshToken) {
        // Call logout endpoint to blacklist the token
        await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/logout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
          },
          body: JSON.stringify({ refresh: refreshToken })
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('refresh')
      dispatch({ type: 'LOGOUT' })
    }
  }

  const forgotPassword = async (email) => {
    return await api.forgotPassword(email)
  }

  const value = {
    ...state,
    login,
    signup,
    logout,
    forgotPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
