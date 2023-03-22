import { Link } from 'react-router-dom'
import { Popcorn } from 'phosphor-react'

export function Header() {
  return (
    <header className="flex justify-between px-3">
      <Link to={`/`} className="flex items-center gap-2">
        <Popcorn size={40} />
        Popcorn films
      </Link>
    </header>
  )
}
