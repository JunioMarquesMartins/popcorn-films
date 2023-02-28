import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { MoviesContext } from '../contexts/MoviesContext'

import { MagnifyingGlass } from 'phosphor-react'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function Search() {
  const { register, handleSubmit, reset } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const fetchMovies = useContextSelector(MoviesContext, (context) => {
    return context.fetchMovies
  })

  async function handleSearchMovies(data: SearchFormInputs) {
    await fetchMovies(data.query)
    reset()
  }
  return (
    <form
      className="flex gap-4 my-5 items-center"
      onSubmit={handleSubmit(handleSearchMovies)}
    >
      <input
        className="flex-1 p-3 border border-black rounded-md outline-black"
        type="text"
        placeholder="Search movies"
        {...register('query')}
      />
      <button
        className="flex bg-slate-800 p-3 
        rounded-md text-slate-400 items-center gap-2 border
         border-black transition:background delay-300 hover:bg-slate-900"
        type="submit"
      >
        <MagnifyingGlass size={30} />
        <span className="hidden sm:inline-flex">Search</span>
      </button>
    </form>
  )
}
