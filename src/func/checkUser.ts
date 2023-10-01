import jwt from 'jwt-decode'
import { TokenPayload } from '../services/UserService'
export function userRole() {
  const token = localStorage.getItem('TOKEN')
  if (!token) return false
  const user = jwt(token) as TokenPayload
  return user.roles
}
