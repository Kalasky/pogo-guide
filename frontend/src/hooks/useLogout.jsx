import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    // clear all local storage
    localStorage.clear()
    
    // update the auth context
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}
