import { Star } from 'phosphor-react'
import YouTube from 'react-youtube'
import { Movie } from '../types'

import { PATH_IMAGES_TMDB } from '../utils/pathImagesTMDB'
import { Button } from './Button'

export function MovieDetail(props: Movie) {
  return (
    <div
      style={{
        backgroundImage: `url(${PATH_IMAGES_TMDB.concat(props.backdrop_path)})`,
      }}
      className="md:min-h-[80vh] px-3 bg-cover bg-no-repeat py-14 bg-fixed"
    >
      <div className=" text-white max-w-5xl m-auto py-5">
        <h3 className="font-bold text-left text-2xl">{props.title}</h3>
        <p className="hidden md:block mb-8">
          <strong>Description:</strong> {props.overview}
        </p>
        <Button
          className="bg-teal-400 hover:bg-teal-500"
          type="link"
          text="Rate the movie"
          link={`/detail/${props.id}`}
        >
          <Star size={20} />
        </Button>

        {props.videoId && (
          <YouTube
            videoId={props.videoId}
            opts={{
              height: '450',
              width: '100%',
              playerVars: {
                // All parameters in:
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                enablejsapi: 1,
                origin: 'http://localhost:5173',
              },
            }}
          />
        )}
      </div>
    </div>
  )
}
