import produce from 'immer'
import { ActionTypes } from './actions'

export interface MovieData {
  adult: boolean
  id: number
  original_title: string
  title: string
  poster_path: string
  backdrop_path: string
  release_date: string
  overview: string
  budget: number
  revenue: number
  runtime: number
  tagline: string
  vote_average: number
  genres: [
    {
      id: number
      name: string
    },
  ]
}

interface CyclesState {
  myMovies: MovieData[]
}
export function myMoviesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      return produce(state, (draft) => {
        const movieIdIndex = draft.myMovies.findIndex(
          (movie) => movie.id === action.payload.newMovie.id,
        )
        if (movieIdIndex !== -1) draft.myMovies.splice(movieIdIndex, 1)
        draft.myMovies.push(action.payload.newMovie)
      })

    default:
      return state
  }
}
