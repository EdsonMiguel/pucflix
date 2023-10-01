import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { userRole } from '../func/checkUser'

interface Props {
  children: ReactElement
}
export function AdminRoute({ children }: Props) {
  const isAuthenticated = userRole() === 'ADMIN'
  return isAuthenticated ? children : <Navigate to="/" />
}
