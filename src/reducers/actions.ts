import { MovieData } from '../types'

export enum ActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
}

export function addItemAction(newMovie: MovieData) {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: {
      newMovie,
    },
  }
}

export function removeItemAction(newMovie: MovieData) {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: {
      newMovie,
    },
  }
}
