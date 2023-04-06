import { apiMdb } from '../lib/axios'
import { QueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { MovieData } from '../types'

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
  return response.data.results
}

export function useFetchDetailMovie(id: string | undefined) {
  const [detailMovie, setDetailMovie] = useState<MovieData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDetailMovie = async () => {
      try {
        const response = await queryClient.fetchQuery(['getDetailMovie'], {
          queryFn: () =>
            apiMdb
              .get(`movie/${id}?api_key=${TMDB_KEY}`)
              .then((response) => response.data),
        })
        setDetailMovie([response])
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      } finally {
        console.log('🎉 Finally fetchDetailMovie ', id)
        setIsLoading(false)
      }
    }

    fetchDetailMovie()
  }, [id])
  return { isLoading, detailMovie }
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

export const fetchMovieId = async (id: number) => {
  try {
    const response = await queryClient.fetchQuery(['getMovieDetailId'], {
      queryFn: () =>
        apiMdb
          .get(`movie/${id}?api_key=${TMDB_KEY}`)
          .then((response) => response.data),
    })

    return [response]
  } catch (e) {
    console.log(e)
  } finally {
    console.log('🎉 Finally fetchMovieId ', id)
  }
}
