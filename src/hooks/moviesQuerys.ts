import { useQuery, useMutation } from '@tanstack/react-query'
import {
  fetchGuestSessionId,
  fetchMovieId,
  fetchMovies,
  postRateMovie,
} from '../api/server'

export function useMutationRateMovie(URL_POST_RATE: string, rating: object) {
  return useMutation((rating: object) => postRateMovie(URL_POST_RATE, rating))
}

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

export function useGuestSessionId(url: string) {
  return useQuery(['guestSessionId'], () => fetchGuestSessionId(url), {
    enabled: false,
  })
}
