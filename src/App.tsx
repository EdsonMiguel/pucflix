import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Movie } from './dtos/MovieDTO'
import { movieServices } from './services/MovieService'

export function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)

  const { handleSubmit, register, reset } = useForm<Movie>()

  async function fetchAllMovies() {
    try {
      const data = await movieServices.getAll()
      setMovies(data)
    } catch (error) {
      console.error('Erro ao buscar filmes:', error)
    }
  }

  async function addMovie(data: Movie) {
    try {
      await movieServices.create(data)
      setMovies([...movies, data])
      reset()
    } catch (error) {
      console.error('Erro ao adicionar filme:', error)
    }
  }

  async function deleteMovie(index: number) {
    try {
      await movieServices.remove(movies[index].id!)
      const updatedMovies = [...movies]
      updatedMovies.splice(index, 1)
      setMovies(updatedMovies)
    } catch (error) {
      console.error('Erro ao excluir filme:', error)
    }
  }

  async function updateMovie(data: Movie) {
    try {
      await movieServices.update(movies[editIndex].id!, data)
      const updatedMovies = [...movies]
      updatedMovies[editIndex] = data
      setMovies(updatedMovies)
      reset()
      setIsEditing(false)
      setEditIndex(-1)
    } catch (error) {
      console.error('Erro ao atualizar filme:', error)
    }
  }

  const cancelEdit = () => {
    reset()
    setIsEditing(false)
    setEditIndex(-1)
  }

  useEffect(() => {
    fetchAllMovies()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Lista de Filmes</h1>
      <form onSubmit={handleSubmit(isEditing ? updateMovie : addMovie)}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Título"
            className="border rounded px-2 py-1 mr-2"
            {...register('title')}
          />
          <input
            type="text"
            placeholder="Título"
            className="border rounded px-2 py-1 mr-2"
            {...register('year')}
          />
        </div>
        <div>
          <button
            type="submit"
            className={`bg-${
              isEditing ? 'green' : 'blue'
            }-500 text-white px-2 py-1 rounded`}
          >
            {isEditing ? 'Atualizar' : 'Adicionar'} Filme
          </button>
          {isEditing && (
            <button
              type="button"
              className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
              onClick={cancelEdit}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
      <ul>
        {movies.map((movie, index) => (
          <li key={index} className="mb-4">
            {/* Detalhes do filme */}
            <button
              className="bg-red-500 text-white px-2 py-1 rounded mt-2"
              onClick={() => deleteMovie(index)}
            >
              Excluir
            </button>
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
              onClick={() => {
                reset(movie)
                setIsEditing(true)
                setEditIndex(index)
              }}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
