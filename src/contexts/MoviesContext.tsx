import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { apiMdb } from '../lib/axios'

interface Movie {
  average_rating: number
  backdrop_path: string
  id: number
  poster_path: string
  release_date: string
  title: string
}

interface MovieContextType {
  movies: Movie[]
  fetchMovies: (query?: string) => Promise<void>
}

interface MoviesProviderProps {
  children: ReactNode
}

export const MoviesContext = createContext({} as MovieContextType)

export function MoviesProvider({ children }: MoviesProviderProps) {
  const [movies, setMovies] = useState<Movie[]>([])

  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY
  const fetchMovies = useCallback(
    async (query?: string) => {
      const url = query
        ? `search/movie?api_key=${TMDB_KEY}&query=${query}`
        : `movie/popular?api_key=${TMDB_KEY}`
      const response = await apiMdb.get(url)
      setMovies(response.data.results)
    },
    [TMDB_KEY],
  )

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return (
    <MoviesContext.Provider
      value={{
        movies,
        fetchMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}
