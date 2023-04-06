import { useQuery } from '@tanstack/react-query'
import { fetchMovies } from '../api/server'

export function useMovies(movieEndpoint: string) {
  return useQuery(
    ['moviesFetch', movieEndpoint],
    () => fetchMovies(movieEndpoint),
    {
      staleTime: 60 * 1000,
      onSuccess() {
        console.log('🎉 Success Get all movies, Endpoint:', movieEndpoint)
      },
    },
  )
}
