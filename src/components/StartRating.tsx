import { Check } from 'phosphor-react'
import { useCallback, useContext, useState } from 'react'
import { MoviesContext } from '../contexts/MoviesContext'
import { apiMdb } from '../lib/axios'
import { StarProps } from '../types'

export function StarRating({ id, sessionId, detailMovie }: StarProps) {
  const { addItem } = useContext(MoviesContext)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [isRating, setIsRating] = useState(false)

  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY
  // do a refactor after
  const postRateMovie = useCallback(
    async (rating: string) => {
      try {
        const response = await apiMdb.post(
          `movie/${id}/rating?api_key=${TMDB_KEY}&guest_session_id=${sessionId}`,
          {
            value: rating,
          },
        )

        const newMovieRate = { ...detailMovie, myRate: rating }
        addItem(newMovieRate)
        setIsRating(true)
      } catch (error) {
        console.log(error)
      } finally {
        setTimeout(() => {
          setIsRating(false)
          window.scrollTo(0, 0)
        }, 600)
      }
    },
    [id, TMDB_KEY, detailMovie, addItem, sessionId],
  )

  async function handleRateMyMovie() {
    postRateMovie(String(rating))
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
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
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
            {isRating && <Check size={20} />}
          </button>
        </div>
      </div>
    </div>
  )
}
