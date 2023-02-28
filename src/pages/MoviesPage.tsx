import { useCallback, useEffect, useState } from 'react'
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
    setMovies([response.data])
  }, [TMDB_KEY])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return <div>Page Movie</div>
}
