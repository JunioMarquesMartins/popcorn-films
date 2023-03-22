import { useState } from 'react'
import { fetchMovieId, fetchVideoId, useMoviesFetch } from '../api/server'
import { Card } from '../components/Card'
import { MovieDetail } from '../components/MovieDetail'

import { Search } from '../components/Search'
import { Movie } from '../contexts/MoviesContext'

export function MoviesPage() {
  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY

  const [movieEndpoint, setMovieEndpoint] = useState(
    `movie/upcoming?api_key=${TMDB_KEY}`,
  )
  const [videoId, setVideoId] = useState<string>('')
  const [movieInfo, setMovieInfo] = useState<Movie[]>([])

  const { movies } = useMoviesFetch(movieEndpoint)

  const handleGetVideoId = async (id: number) => {
    const responseVideoId: string = await fetchVideoId(id)
    setVideoId(responseVideoId)
    const responseMovieId: any = await fetchMovieId(id)
    setMovieInfo(responseMovieId)
    window.scrollTo(0, 0)
  }

  const handleSearchMovies = (data: string) => {
    setMovieEndpoint(`search/movie?api_key=${TMDB_KEY}&query=${data}`)
  }

  return (
    <>
      {movieInfo[0] ? (
        <MovieDetail videoId={videoId} {...movieInfo[0]} />
      ) : (
        <MovieDetail {...movies[0]} />
      )}
      <section className="max-w-5xl m-auto py-5">
        <Search handleSearchMovies={handleSearchMovies} />
        <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
          {movies.map((movie) => {
            return (
              <Card
                handleGetVideoId={handleGetVideoId}
                key={movie.id}
                {...movie}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}
