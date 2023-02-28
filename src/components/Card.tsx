import { PATH_IMAGES_TMDB } from '../utils/pathImagesTMDB'

interface CardProps {
  id: number
  poster_path: string
  title: string
  release_date: string
}

export function Card(props: CardProps) {
  return (
    <div>
      <header>
        <h3>{props.title}</h3>
        <img
          className="transition:transform, opacity duration-500 ease-in-out group-hover:scale-[1.2] group-hover:opacity-50"
          src={PATH_IMAGES_TMDB.concat(props.poster_path)}
          alt={`Image for movie ${props.title}`}
        />
      </header>
    </div>
  )
}
