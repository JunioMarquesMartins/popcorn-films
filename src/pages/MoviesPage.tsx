import { ArrowRight } from 'phosphor-react'
import { useState } from 'react'
import { fetchMovieId, fetchVideoId, useMoviesFetch } from '../api/server'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Loading } from '../components/Loading'
import { MovieDetail } from '../components/MovieDetail'

import { Search } from '../components/Search'
import { Movie } from '../contexts/MoviesContext'
import { moviesCategory } from '../data/moviesCategory'

export function MoviesPage() {
  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY

  const [videoId, setVideoId] = useState<string>('')
  const [movieInfo, setMovieInfo] = useState<Movie[]>([])
  const [btnActive, setBtnActive] = useState('upcoming')

  const [movieEndpoint, setMovieEndpoint] = useState(
    `movie/upcoming?api_key=${TMDB_KEY}`,
  )

  const { movies, isLoading } = useMoviesFetch(movieEndpoint)

  const handleGetVideoId = async (id: number) => {
    const responseVideoId: string = await fetchVideoId(id)
    setVideoId(responseVideoId)
    const responseMovieId: any = await fetchMovieId(id)
    setMovieInfo(responseMovieId)
    window.scrollTo(0, 0)
  }

  const handleFetchMovies = async (movie: string) => {
    setBtnActive(movie)
    setMovieEndpoint(`movie/${movie}?api_key=${TMDB_KEY}`)
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
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="overflow-x-auto">
              <div className="w-[200%] md:w-full flex gap-5 text-white">
                {moviesCategory.map((category) => {
                  return (
                    <Button
                      type="button"
                      className={
                        btnActive === category.url
                          ? `bg-teal-400 hover:bg-teal-500`
                          : ''
                      }
                      text={category.name}
                      key={category.name}
                      onclick={() => handleFetchMovies(category.url)}
                    />
                  )
                })}
              </div>
            </div>
            <div className="flex justify-end md:hidden">
              <ArrowRight className="text-white mb-3" size={20} />
            </div>
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
          </div>
        )}
      </section>
    </>
  )
}
