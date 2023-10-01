import { Movie } from '../dtos/MovieDTO'
import { api } from './api'



async function getAll() {
  const { data } = await api.get<Movie[]>('/v3/filmes')
  return data 
}



export const movieServices = {
 
  getAll,

}