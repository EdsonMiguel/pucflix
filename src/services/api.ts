import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://arqnodejs.vps.webdock.cloud/api'
})

const hasToken = localStorage.getItem('TOKEN')
if(hasToken) {
  api.defaults.headers.common.Authorization = `Bearer ${hasToken}`
}
