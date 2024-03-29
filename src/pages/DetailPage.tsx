import { useParams } from 'react-router-dom'
import { Loading } from '../components/Loading'
import { StarRating } from '../components/StartRating'
import { useSaveSessionId } from '../hooks/guestSessionIdStorage'
import { useMovies } from '../hooks/moviesQuerys'
import { CONVERTE_RATE_VALUE, DATA_STARS } from '../utils/converteRateValue'
import { dateFormatter } from '../utils/formatterDate'
import { PATH_IMAGES_TMDB } from '../utils/pathImagesTMDB'

export function DetailPage() {
  const { id } = useParams()
  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY

  const { data: detailMovie, isLoading } = useMovies(
    `movie/${id}?api_key=${TMDB_KEY}`,
  )

  const sessionId = useSaveSessionId()

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          key={detailMovie?.id}
          className="min-h-screen pt-28 bg-[#5c93b9] bg-blend-multiply bg-cover bg-no-repeat py-14 bg-fixed"
          style={{
            backgroundImage: `url(${PATH_IMAGES_TMDB.concat(
              detailMovie?.backdrop_path,
            )})`,
          }}
        >
          <div className="max-w-xl m-auto bg-[#e5e5e5b0] p-4">
            <header>
              <h3 className="text-3xl">{detailMovie.title}</h3>
              {detailMovie.poster_path && (
                <img
                  className="w-52"
                  src={PATH_IMAGES_TMDB.concat(detailMovie.poster_path)}
                  alt={`Image for movie ${detailMovie.title}`}
                />
              )}
            </header>
            <div className="flex flex-col gap-2">
              <div>
                <div>
                  <StarRating
                    id={id}
                    detailMovie={detailMovie}
                    sessionId={sessionId}
                  />
                </div>
              </div>
              <p>
                <strong>Description:</strong> {detailMovie.overview}
              </p>
              <p>
                <strong>Release:</strong>{' '}
                {dateFormatter.format(new Date(detailMovie?.release_date))}
              </p>
              <div>
                <strong>Average Rating:</strong>(
                {CONVERTE_RATE_VALUE(detailMovie?.vote_average)})
                <div>
                  {DATA_STARS(detailMovie?.vote_average).map((vote, index) => {
                    return (
                      <span key={index} className="star on">
                        &#9733;
                      </span>
                    )
                  })}
                  {[
                    ...Array(5 - DATA_STARS(detailMovie?.vote_average).length),
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
                <strong>Budget:</strong> {detailMovie.budget}
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                <strong>Genres:</strong>
                {detailMovie?.genres.map((genres: any) => {
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
                <strong>Tagline:</strong> {detailMovie.tagline}
              </p>
              <p>
                <strong>Revenue:</strong> {detailMovie.revenue}
              </p>
              <p>
                <strong>Runtime:</strong> {detailMovie.runtime}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
