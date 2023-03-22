import { LinkSimple } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { PATH_IMAGES_TMDB } from '../utils/pathImagesTMDB'

interface CardProps {
  id: number
  poster_path: string
  title: string
  release_date: string
}

export function Card(props: CardProps) {
  return (
    <div className="overflow-hidden rounded-md bg-slate-100 py-2 group transition:transform">
      <header>
        <h3 className="font-bold px-3 text-center relative z-20 transition:transform, opacity duration-700 ease-in-out group-hover:translate-y-36">
          {props.title}
        </h3>
        <Link className="relative" to={`detail/${props.id}`}>
          {props.poster_path ? (
            <img
              className="transition:transform, opacity duration-500 ease-in-out group-hover:scale-[1.2] group-hover:opacity-50"
              src={PATH_IMAGES_TMDB.concat(props.poster_path)}
              alt={`Image for movie ${props.title}`}
            />
          ) : (
            <img
              src="https://via.placeholder.com/328x492?text=image not found"
              alt="image not found"
            />
          )}
          <span
            className="absolute top-[40%] flex items-center gap-2
          left-[50%] translate-x-[-50%] bg-slate-800
           text-white px-8 py-4 rounded-lg opacity-0 transition:opacity
            duration-500 ease-in-out group-hover:opacity-100
            hover:bg-slate-900"
          >
            More info <LinkSimple size={20} />
          </span>
        </Link>
      </header>
    </div>
  )
}
