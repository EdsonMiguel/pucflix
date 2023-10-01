import {useState, useEffect} from 'react'
import { Movie } from '../dtos/MovieDTO'
import { movieServices } from '../services/MovieService'

export function App() {
  const [movies, setMovies] = useState<Movie[]>([])


  useEffect(() => {
    async function fetchAllMovies() {
      const data = await movieServices.getAll()
      if(data) {
        setMovies(data)
      }
    }
    fetchAllMovies()
  },[])

  return ( 
    <div className="w-screen h-screen bg-black">
      <header>
        <span className="text-red-500 font-semibold text-4xl">
          Pucflix
        </span>
        <main className="container m-auto">
          {movies.map((movie) => (
            <div>
              {movie.title}
            </div>
          ))}
        </main>
      </header>
    </div>
  )
}