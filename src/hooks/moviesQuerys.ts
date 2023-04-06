import { useQuery } from '@tanstack/react-query'
import { fetchMovieId, fetchMovies } from '../api/server'

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

export function useDetailMovie(movieID: number) {
  return useQuery(['getMovieDetailId', movieID], () => fetchMovieId(movieID), {
    enabled: false,
    onSuccess() {
      console.log('🎉 Finally fetchMovies ', movieID)
    },
  })
}
