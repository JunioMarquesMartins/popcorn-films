import { useState } from 'react'
import { useMoviesFetch } from '../api/server'
import { Card } from '../components/Card'

import { Search } from '../components/Search'

export function MoviesPage() {
  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY

  const [movieEndpoint, setMovieEndpoint] = useState(
    `movie/upcoming?api_key=${TMDB_KEY}`,
  )

  const { movies } = useMoviesFetch(movieEndpoint)

  const handleSearchMovies = (data: string) => {
    setMovieEndpoint(`search/movie?api_key=${TMDB_KEY}&query=${data}`)
  }

  return (
    <section className="max-w-5xl m-auto py-5">
      <Search handleSearchMovies={handleSearchMovies} />
      <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
        {movies.map((movie) => {
          return <Card key={movie.id} {...movie} />
        })}
      </div>
    </section>
  )
}
