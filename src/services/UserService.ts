import { api } from './api'
import { AxiosError } from 'axios'
import { Auth } from '../dtos/AuthDTO'
import { User } from '../dtos/UserDTO'
import jwt from 'jwt-decode'

export type TokenPayload = {
  id: number
  roles: 'ADMIN' | 'USER'
  iat: number
  exp: number
}

async function authenticate(userAuth: Auth) {
  try {
    type Token = { token: string }
    const { data } = await api.post<Token>('/seg/login', userAuth)
    const { token } = data
    const user = jwt(token) as TokenPayload
    localStorage.setItem('TOKEN', token)
    localStorage.setItem('ROLE', user.roles)
    return user
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message)
    }
  }
}

async function create(user: User) {
  try {
    await api.post('v3/usuarios', user)
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message)
    }
  }
}

async function createAdministrator(user: User) {
  try {
    await api.post('/administradores', user)
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message)
    }
  }
}

export const userService = {
  authenticate,
  create,
  createAdministrator,
}
