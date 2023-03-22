import { LinkSimple, YoutubeLogo } from 'phosphor-react'
import { PATH_IMAGES_TMDB } from '../utils/pathImagesTMDB'
import { Button } from './Button'

interface CardProps {
  id: number
  poster_path: string
  title: string
  release_date: string
  myRate?: string
  handleGetVideoId: (id: number) => void
}

export function Card(props: CardProps) {
  return (
    <div className="overflow-hidden rounded-md bg-slate-100 py-2 group transition:transform">
      <header className="relative">
        <h3 className="font-bold px-3 text-center relative z-20 transition:transform, opacity duration-700 ease-in-out group-hover:translate-y-36">
          {props.title}
        </h3>
        {props.myRate && (
          <span className="absolute right-0 top-6 z-10 bg-teal-400 flex py-1 px-4">
            my score: {props.myRate}
          </span>
        )}
        <div className="relative">
          {props?.poster_path ? (
            <img
              className="transition:transform, opacity duration-500 ease-in-out md:group-hover:scale-[1.06] group-hover:opacity-50"
              src={PATH_IMAGES_TMDB?.concat(props?.poster_path)}
              alt={`Image for movie ${props.title}`}
            />
          ) : (
            <img
              src="https://via.placeholder.com/328x492?text=image not found"
              alt="image not found"
            />
          )}

          <div
            className="md:absolute md:top-[40%] flex items-center gap-2
          md:left-[50%] md:translate-x-[-50%] w-full
           text-white px-4 md:px-8 py-4 rounded-lg text-sm"
          >
            <Button
              className="md:opacity-0 transition:opacity duration-500 ease-in-out group-hover:opacity-100"
              type="link"
              text="More info"
              link={`/detail/${props.id}`}
            >
              <LinkSimple size={20} />
            </Button>
            <Button
              className="md:opacity-0 transition:opacity duration-500 ease-in-out group-hover:opacity-100"
              type="button"
              text="See trailer"
              onclick={() => props.handleGetVideoId(props.id)}
            >
              <YoutubeLogo size={20} />
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}
