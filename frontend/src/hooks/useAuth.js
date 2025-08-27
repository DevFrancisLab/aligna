import { useAuth as useAuthContext } from '../context/AuthContext'

// Re-export the useAuth hook for convenience
export const useAuth = useAuthContext

// Additional auth-related hooks can be added here
export function useRequireAuth() {
  const auth = useAuthContext()
  
  if (!auth.isAuthenticated && !auth.isLoading) {
    throw new Error('Authentication required')
  }
  
  return auth
}
