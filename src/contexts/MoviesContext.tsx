import { createContext, ReactNode, useReducer, useEffect } from 'react'
import { addItemAction } from '../reducers/actions'
import { MovieData, myMoviesReducer } from '../reducers/reducer'

export interface Movie {
  average_rating: number
  backdrop_path: string
  id: number
  poster_path: string
  release_date: string
  title: string
}

interface MovieContextType {
  myMovies: MovieData[]
  addItem: (newMovie: MovieData) => void
}

interface MoviesProviderProps {
  children: ReactNode
}

export const MoviesContext = createContext({} as MovieContextType)

export function MoviesProvider({ children }: MoviesProviderProps) {
  const [cyclesState, dispatch] = useReducer(
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

  const { myMovies } = cyclesState

  function addItem(newMovie: MovieData) {
    dispatch(addItemAction(newMovie))
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@movie-app:myMovies-state-1.0.0', stateJSON)
  }, [cyclesState])

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
