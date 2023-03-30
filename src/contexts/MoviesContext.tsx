import { createContext, useReducer, useEffect } from 'react'
import { addItemAction } from '../reducers/actions'
import { myMoviesReducer } from '../reducers/reducer'
import { MovieContextType, MovieData, MoviesProviderProps } from '../types'

export const MoviesContext = createContext({} as MovieContextType)

export function MoviesProvider({ children }: MoviesProviderProps) {
  const [moviesState, dispatch] = useReducer(
    myMoviesReducer,
    {
      myMovies: [],
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@movie-app:myMovies-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      } else {
        return {
          myMovies: [],
        }
      }
    },
  )

  const { myMovies } = moviesState

  function addItem(newMovie: MovieData) {
    dispatch(addItemAction(newMovie))
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(moviesState)

    localStorage.setItem('@movie-app:myMovies-state-1.0.0', stateJSON)
  }, [moviesState])

  return (
    <MoviesContext.Provider
      value={{
        myMovies,
        addItem,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}
