import { useCallback, useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { Search } from '../components/Search'
import { apiMdb } from '../lib/axios'

interface Movie {
  average_rating: number
  backdrop_path: string
  id: number
  poster_path: string
  release_date: string
  title: string
}
export function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY

  const fetchMovies = useCallback(async () => {
    const response = await apiMdb.get(`movie/popular?api_key=${TMDB_KEY}`)
    setMovies(response.data.results)
  }, [TMDB_KEY])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return (
    <section className="max-w-5xl m-auto py-5">
      <Search />
      <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
        {movies.map((movie) => {
          return <Card key={movie.id} {...movie} />
        })}
      </div>
    </section>
  )
}
