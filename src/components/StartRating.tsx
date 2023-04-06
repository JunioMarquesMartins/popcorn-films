import { Check } from 'phosphor-react'
import { useContext, useState } from 'react'
import { MoviesContext } from '../contexts/MoviesContext'
import { useMutationRateMovie } from '../hooks/moviesQuerys'
import { StarProps } from '../types'

export function StarRating({ id, sessionId, detailMovie }: StarProps) {
  const { addItem } = useContext(MoviesContext)
  const [rating, setRating] = useState({
    value: 0,
  })
  const [hover, setHover] = useState(0)
  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY
  const URL_POST_RATE = `movie/${id}/rating?api_key=${TMDB_KEY}&guest_session_id=${sessionId}`

  const mutation = useMutationRateMovie(URL_POST_RATE, rating)

  const handleRateMyMovie = () => {
    mutation.mutate(rating, {
      onSuccess(data, variables, context) {
        console.log('🎉 Success Post Rate Movie:', data, variables, context)
        const newMovieRate = { ...detailMovie, myRate: rating.value }
        addItem(newMovieRate)
        window.scrollTo(0, 0)
      },
    })
  }

  return (
    <div className="star-rating mt-3">
      <strong>Rate the movie</strong>
      <div className="flex gap-2 mb-2">
        {[...Array(5)].map((star, index) => {
          index += 1
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? 'on' : 'off'}
              onClick={() => setRating({ value: index })}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating.value)}
            >
              <span className="star">&#9733;</span>
            </button>
          )
        })}

        <div className="ml-4">
          <button
            onClick={handleRateMyMovie}
            className="flex bg-slate-800 py-2 px-6
                        rounded-md text-slate-400 items-center gap-2 border
                        text-sm first-letter:opacity-100 cursor-pointer
                        border-black transition:background delay-300
                        disabled:opacity-5 disabled:cursor-not-allowed [&:not(:disabled)]:hover:bg-slate-900"
            type="button"
          >
            Send
            {mutation.isLoading && <Check size={20} />}
          </button>
        </div>
      </div>
    </div>
  )
}
