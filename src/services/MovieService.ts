import { Movie } from '../dtos/MovieDTO'
import { api } from './api'

async function getAll() {
  const { data } = await api.get<Movie[]>('/v3/filmes')
  return data
}

async function create(movie: Movie) {
  const { data } = await api.post<Movie>('/v3/filmes', movie)
  return data
}

async function update(id: number, movie: Movie) {
  const { data } = await api.put<Movie>(`/v3/filmes/${id}`, movie)
  return data
}

async function remove(id: number) {
  const { data } = await api.delete(`/v3/filmes/${id}`)
  return data
}

export const movieServices = {
  getAll,
  create,
  update,
  remove,
}
