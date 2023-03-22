import { useContext } from 'react'
import { Card } from '../components/Card'

import { Search } from '../components/Search'
import { MoviesContext } from '../contexts/MoviesContext'

export function MoviesPage() {
  const { movies } = useContext(MoviesContext)

  return (
    <section className="max-w-5xl m-auto py-5">
      <Search />
      <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
        {movies.map((movie) => {
          return <Card key={movie.id} {...movie} />
        })}
      </div>
    </section>
  )
}
