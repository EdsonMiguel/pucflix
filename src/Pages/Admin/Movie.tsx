import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Movie } from '../../dtos/MovieDTO'
import { movieServices } from '../../services/MovieService'
import { Link } from 'react-router-dom'

export function AdminMovie() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)

  const { handleSubmit, register, reset } = useForm<Movie>()

  async function fetchAllMovies() {
    try {
      const data = await movieServices.getAll()
      console.log(data)
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

  useEffect(() => {
    fetchAllMovies()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Lista de Filmes</h1>
      <Link to="/admin/singup" className="my-4">
        <span className="bg-blue-500 py-4 px-4 ">Adicinar ADM</span>
      </Link>

      <form onSubmit={handleSubmit(isEditing ? updateMovie : addMovie)}>
        <div className="mb-4 flex">
          <input
            type="url"
            placeholder="Link da Thumbnail"
            className="border rounded px-2 py-1 mr-2"
            {...register('thumbnail')}
          />
          <input
            type="text"
            placeholder="Título"
            className="border rounded px-2 py-1 mr-2"
            {...register('title')}
          />
          <select
            id="genre"
            {...register('genre')}
            className="border rounded px-2 py-1 mr-2"
            placeholder="Gênero"
          >
            <option value="Action">Ação</option>
            <option value="Adventure">Aventura</option>
            <option value="Comedy">Comédia</option>
            <option value="Drama">Drama</option>
            <option value="Science Fiction">Ficção Científica</option>
            <option value="Horror">Terror</option>
          </select>
          <input
            type="text"
            placeholder="Ano"
            className="border rounded px-2 py-1 mr-2"
            {...register('year')}
          />
          <textarea
            placeholder="Descrição"
            className="border rounded px-2 py-1 mr-2"
            {...register('extract')}
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white px-2 py-1 rounded`}
          >
            {isEditing ? 'Atualizar' : 'Adicionar'} Filme
          </button>
        </div>
        <div></div>
      </form>
      <ul>
        {movies.map((movie, index) => (
          <li
            key={movie.id}
            className="mb-4 p-4 bg-gray-800 text-white rounded-lg shadow-md"
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-52 h-60">
                <img
                  src={movie.thumbnail}
                  className="w-52 h-60 object-cover rounded-lg"
                  alt={movie.title}
                />
              </div>
              <div className="ml-4 mt-2 md:mt-0">
                <h3 className="text-xl font-semibold">{movie.title}</h3>
                <p className="text-gray-400">
                  Ano: <strong>{movie.year}</strong>
                </p>
                <p className="text-gray-400">
                  Gênero: <strong>{movie.genre}</strong>
                </p>
                <p className="text-gray-300 mt-2">{movie.extract}</p>
                <div className="mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => deleteMovie(index)}
                  >
                    Excluir
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg ml-4"
                    onClick={() => {
                      reset(movie)
                      setIsEditing(true)
                      setEditIndex(index)
                    }}
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
