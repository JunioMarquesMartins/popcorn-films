import { ArrowRight } from 'phosphor-react'
import { useState } from 'react'
import { fetchVideoId } from '../api/server'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Loading } from '../components/Loading'
import { MovieDetail } from '../components/MovieDetail'

import { Search } from '../components/Search'
import { moviesCategory } from '../data/moviesCategory'
import { useDetailMovie, useMovies } from '../hooks/moviesQuerys'

export function MoviesPage() {
  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY

  const [videoId, setVideoId] = useState<string>('')
  const [btnActive, setBtnActive] = useState('upcoming')
  const [movieID, setMovieID] = useState(0)
  const [movieEndpoint, setMovieEndpoint] = useState(
    `movie/upcoming?api_key=${TMDB_KEY}`,
  )

  const { data: movies, isLoading } = useMovies(movieEndpoint)
  const movieInfo = useDetailMovie(movieID)

  const handleGetVideoId = async (id: number) => {
    setMovieID(id)
    const responseVideoId: string = await fetchVideoId(id)
    setVideoId(responseVideoId)
    movieInfo.refetch()
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
      {movieInfo.data && <MovieDetail videoId={videoId} {...movieInfo.data} />}
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
              {movies.map((movie: any) => {
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
