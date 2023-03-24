import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchDetailMovie } from '../api/server'
import { Loading } from '../components/Loading'
import { StarRating } from '../components/StartRating'
import { apiMdb } from '../lib/axios'
import { CONVERTE_RATE_VALUE, DATA_STARS } from '../utils/converteRateValue'
import { dateFormatter } from '../utils/formatterDate'
import { PATH_IMAGES_TMDB } from '../utils/pathImagesTMDB'

export function DetailPage() {
  const { id } = useParams()
  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY
  const [sessionId, setSessionId] = useState('')
  // do a refactor after

  const { isLoading, detailMovie } = useFetchDetailMovie(id)

  const fetchGuestSessionId = useCallback(async () => {
    const response = await apiMdb.get(
      `authentication/guest_session/new?api_key=${TMDB_KEY}`,
    )
    return response.data.guest_session_id
  }, [TMDB_KEY])

  const saveGuestSessionId = useCallback(async () => {
    const isGuestSessionId = await localStorage.getItem(
      '@movie-app:guest-session-id-1.0.0',
    )
    if (isGuestSessionId === null) {
      const responseSessionId = await fetchGuestSessionId()

      localStorage.setItem(
        '@movie-app:guest-session-id-1.0.0',
        responseSessionId,
      )

      setSessionId(
        String(localStorage.getItem('@movie-app:guest-session-id-1.0.0')),
      )
    } else {
      const isGuestSessionId = String(
        localStorage.getItem('@movie-app:guest-session-id-1.0.0'),
      )
      setSessionId(isGuestSessionId)
      console.log('sessionID', sessionId)
    }
  }, [fetchGuestSessionId, sessionId])

  useEffect(() => {
    saveGuestSessionId()
  }, [saveGuestSessionId])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        detailMovie?.map((detail) => {
          return (
            <div
              key={detail?.id}
              className="min-h-screen pt-28 bg-[#5c93b9] bg-blend-multiply bg-cover bg-no-repeat py-14 bg-fixed"
              style={{
                backgroundImage: `url(${PATH_IMAGES_TMDB.concat(
                  detail?.backdrop_path,
                )})`,
              }}
            >
              <div className="max-w-xl m-auto bg-[#e5e5e5b0] p-4">
                <header>
                  <h3 className="text-3xl">{detail.title}</h3>
                  {detail.poster_path && (
                    <img
                      className="w-52"
                      src={PATH_IMAGES_TMDB.concat(detail.poster_path)}
                      alt={`Image for movie ${detail.title}`}
                    />
                  )}
                </header>
                <div className="flex flex-col gap-2">
                  <div>
                    <div>
                      <StarRating
                        id={id}
                        detailMovie={detail}
                        sessionId={sessionId}
                      />
                    </div>
                  </div>
                  <p>
                    <strong>Description:</strong> {detail.overview}
                  </p>
                  <p>
                    <strong>Release:</strong>{' '}
                    {dateFormatter.format(new Date(detail?.release_date))}
                  </p>
                  <div>
                    <strong>Average Rating:</strong>(
                    {CONVERTE_RATE_VALUE(detail?.vote_average)})
                    <div>
                      {DATA_STARS(detail?.vote_average).map((vote, index) => {
                        return (
                          <span key={index} className="star on">
                            &#9733;
                          </span>
                        )
                      })}
                      {[
                        ...Array(5 - DATA_STARS(detail?.vote_average).length),
                      ].map((vote, index) => {
                        return (
                          <span key={index} className="star off">
                            &#9733;
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  <p>
                    <strong>Budget:</strong> {detail.budget}
                  </p>
                  <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <strong>Genres:</strong>
                    {detail?.genres.map((genres: any) => {
                      return (
                        <span
                          className="bg-slate-900 px-3 py-2 rounded-lg text-white"
                          key={genres.id}
                        >
                          {' '}
                          {genres.name}
                        </span>
                      )
                    })}
                  </p>

                  <p>
                    <strong>Tagline:</strong> {detail.tagline}
                  </p>
                  <p>
                    <strong>Revenue:</strong> {detail.revenue}
                  </p>
                  <p>
                    <strong>Runtime:</strong> {detail.runtime}
                  </p>
                </div>
              </div>
            </div>
          )
        })
      )}
    </>
  )
}
