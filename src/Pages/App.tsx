import { useState, useEffect } from 'react'
import { Movie } from '../dtos/MovieDTO'
import { movieServices } from '../services/MovieService'

export function App() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    async function fetchAllMovies() {
      const data = await movieServices.getAll()
      if (data) {
        setMovies(data)
      }
    }
    fetchAllMovies()
  }, [])

  return (
    <div className="w-screen h-screen bg-black">
      <header>
        <span className="text-red-500 font-semibold text-4xl">Pucflix</span>
        <main className="container m-auto">
          <ul>
            {movies.map((movie) => (
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
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </header>
    </div>
  )
}
