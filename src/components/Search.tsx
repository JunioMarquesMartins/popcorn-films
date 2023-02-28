import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { apiMdb } from '../lib/axios'

interface DetailMovieData {
  adult: boolean
  id: number
  original_title: string
  title: string
  poster_path: string
  backdrop_path: string
  release_date: string
  overview: string
  genres: []
  budget: number
  revenue: number
  runtime: number
  tagline: string
  vote_average: number
}

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function Search() {
  const { register, handleSubmit } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY

  const [searchMovie, setSearchMovie] = useState<DetailMovieData[]>([])

  const fetchMovies = useCallback(
    async (query?: string) => {
      const response = await apiMdb.get(
        `search/movie?api_key=${TMDB_KEY}&query=${query}`,
      )
      setSearchMovie([response.data])
      console.log(searchMovie)
    },
    [TMDB_KEY],
  )

  async function handleSearchMovies(data: SearchFormInputs) {
    await fetchMovies(data.query)
  }
  return (
    <form onSubmit={handleSubmit(handleSearchMovies)}>
      <input type="text" placeholder="Search movies" {...register('query')} />
      <button type="submit">Search</button>
    </form>
  )
}
