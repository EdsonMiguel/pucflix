import React, { useState } from 'react';

export interface Movie {
  title: string;
  year: number;
  cast: string;
  genre: string;
  href: string;
  extract: string;
  thumbnail: string;
  thumbnail_width: number;
  thumbnail_height: number;
}

const MovieList: React.FC = () => {
  const initialMovie: Movie = {
    title: '',
    year: 0,
    cast: '',
    genre: '',
    href: '',
    extract: '',
    thumbnail: '',
    thumbnail_width: 0,
    thumbnail_height: 0,
  };

  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState<Movie>(initialMovie);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const addMovie = () => {
    setMovies([...movies, newMovie]);
    setNewMovie(initialMovie);
  };

  const deleteMovie = (index: number) => {
    const updatedMovies = [...movies];
    updatedMovies.splice(index, 1);
    setMovies(updatedMovies);
  };

  const editMovie = (index: number) => {
    setNewMovie(movies[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const updateMovie = () => {
    const updatedMovies = [...movies];
    updatedMovies[editIndex] = newMovie;
    setMovies(updatedMovies);
    setNewMovie(initialMovie);
    setIsEditing(false);
    setEditIndex(-1);
  };

  const cancelEdit = () => {
    setNewMovie(initialMovie);
    setIsEditing(false);
    setEditIndex(-1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Lista de Filmes</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Título"
          className="border rounded px-2 py-1 mr-2"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Ano"
          className="border rounded px-2 py-1 mr-2"
          value={newMovie.year}
          onChange={(e) => setNewMovie({ ...newMovie, year: parseInt(e.target.value) || 0 })}
        />
        {isEditing ? (
          <>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={updateMovie}
            >
              Atualizar
            </button>
            <button
              className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
              onClick={cancelEdit}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={addMovie}
          >
            Adicionar Filme
          </button>
        )}
      </div>
      <ul>
        {movies.map((movie, index) => (
          <li key={index} className="mb-4">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p>Ano: {movie.year}</p>
            <p>Elenco: {movie.cast}</p>
            <p>Gênero: {movie.genre}</p>
            <p>
              <a href={movie.href} target="_blank" rel="noopener noreferrer">
                Link
              </a>
            </p>
            <p>Descrição: {movie.extract}</p>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded mt-2"
              onClick={() => deleteMovie(index)}
            >
              Excluir
            </button>
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
              onClick={() => editMovie(index)}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
