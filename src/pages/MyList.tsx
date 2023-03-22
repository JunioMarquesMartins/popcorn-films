import { useContext } from 'react'
import { Card } from '../components/Card'
import { MoviesContext } from '../contexts/MoviesContext'

export function Mylist() {
  const { myMovies } = useContext(MoviesContext)
  const handleGetVideoId = async (id: number) => id
  return (
    <div className="max-w-5xl m-auto py-5">
      <h1 className="text-white mb-4 text-xl font-semibold">My list</h1>
      <div className="flex flex-col-reverse md:grid md:grid-cols-3 gap-5 pb-10">
        {myMovies.map((movie) => {
          return (
            <Card
              handleGetVideoId={handleGetVideoId}
              key={movie.id}
              {...movie}
            />
          )
        })}
      </div>
    </div>
  )
}
