import { apiMdb } from '../lib/axios'
import { QueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Movie } from '../contexts/MoviesContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300,
    },
  },
})

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY

export function useMoviesFetch(url: string) {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await queryClient.fetchQuery(['getMovies'], {
          queryFn: () =>
            apiMdb.get(url).then((response) => response.data.results),
        })

        setMovies(response)
      } catch (e) {
        console.log(e)
      } finally {
        console.log('🎉 Finally fetchMovies ', url)
      }
    }
    fetchMovies()
  }, [url])

  return { movies }
}
