import { Link } from 'react-router-dom'
import { Popcorn, UserList } from 'phosphor-react'
import { useContext } from 'react'
import { MoviesContext } from '../contexts/MoviesContext'

export function Header() {
  const { myMovies } = useContext(MoviesContext)
  return (
    <header className="flex justify-between px-3">
      <Link to={`/`} className="flex items-center gap-2">
        <Popcorn size={40} />
        Popcorn films
      </Link>
      {myMovies?.length > 0 && (
        <Link className="flex items-end gap-2" to={`/mylist`}>
          <span className="relative">
            <span className="text-sm">my list </span>
            <span className="absolute right-[-1.2rem] top-[-.9rem] z-10 bg-teal-400 text-white w-5 h-5 rounded-full text-sm flex justify-center items-center">
              {myMovies.length}
            </span>
          </span>
          <UserList size={40} />
        </Link>
      )}
    </header>
  )
}
