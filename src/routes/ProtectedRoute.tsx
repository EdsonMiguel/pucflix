import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { userRole } from '../func/checkUser'

interface Props {
  children: ReactElement
}
export function ProtectedRoute({ children }: Props) {
  const isAuthenticated = userRole()
  return isAuthenticated ? children : <Navigate to="/" />
}
