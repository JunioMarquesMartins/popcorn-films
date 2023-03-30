import produce from 'immer'
import { MoviesStateProps } from '../types'
import { ActionTypes } from './actions'

export function myMoviesReducer(state: MoviesStateProps, action: any) {
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
