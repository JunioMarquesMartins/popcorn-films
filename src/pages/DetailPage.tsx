import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiMdb } from '../lib/axios'
import { dateFormatter } from '../utils/formatterDate'
import { PATH_IMAGES_TMDB } from '../utils/pathImagesTMDB'

interface DetailMovieData {
  adult: boolean
  id: number
  original_title: string
  title: string
  poster_path: string
  backdrop_path: string
  release_date: string
  overview: string
  genres: [
    {
      id: number
      name: string
    },
  ]
  budget: number
  revenue: number
  runtime: number
  tagline: string
  vote_average: number
}

export function DetailPage() {
  const { id } = useParams()
  const [detailMovie, setDetailMovie] = useState<DetailMovieData[]>([])
  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY

  const fetchDetail = useCallback(async () => {
    const response = await apiMdb.get(`movie/${id}?api_key=${TMDB_KEY}`)
    setDetailMovie([response.data])
  }, [id, TMDB_KEY])

  useEffect(() => {
    fetchDetail()
  }, [fetchDetail])

  return (
    <>
      {detailMovie.map((detail) => {
        return (
          <div
            key={detail.id}
            className="min-h-screen pt-28 bg-[#5c93b9] bg-blend-multiply bg-cover bg-no-repeat py-14 bg-fixed"
            style={{
              backgroundImage: `url(${PATH_IMAGES_TMDB.concat(
                detail.backdrop_path,
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
                <p>
                  <strong>Description:</strong> {detail.overview}
                </p>
                <p>
                  <strong>Release:</strong>{' '}
                  {dateFormatter.format(new Date(detail.release_date))}
                </p>
                <p>
                  <strong>Average Rating:</strong> {detail.vote_average}
                </p>
                <p>
                  <strong>Budget:</strong> {detail.budget}
                </p>
                <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <strong>Genres:</strong>
                  {detail.genres.map((genres) => {
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
      })}
    </>
  )
}
