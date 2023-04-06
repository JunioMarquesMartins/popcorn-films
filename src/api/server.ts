import { apiMdb } from '../lib/axios'
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300,
    },
  },
})

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY

export const fetchMovies = async (url: string) => {
  const response = await apiMdb.get(url)
  return response.data
}

export const fetchGuestSessionId = async (url: string) => {
  const response = await apiMdb.get(url)
  return response.data.guest_session_id
}

export const fetchMovieId = async (id: number) => {
  const response = await apiMdb.get(`movie/${id}?api_key=${TMDB_KEY}`)
  return response.data
}

export const postRateMovie = async (url: string, rating: object) => {
  const { data } = await apiMdb.post(url, rating)
  return data
}

export const fetchVideoId = async (id: number) => {
  try {
    const response = await queryClient.fetchQuery(['getVideoId'], {
      queryFn: () =>
        apiMdb
          .get(`movie/${id}/videos?api_key=${TMDB_KEY}`)
          .then((response) => response.data),
    })

    const trailer = await response.results.find(
      (trailerId: any) =>
        trailerId.type === 'Clip' || trailerId.type === 'Trailer',
    )

    return trailer.key
  } catch (e) {
    console.log(e)
  } finally {
    console.log('🎉 Finally fetchVideoId ', id)
  }
}
