import { ReactNode } from 'react'

export interface ButtonProps {
  id?: number
  text: string
  onclick?: any
  link?: any
  className?: string
  type: 'link' | 'button'
  children?: ReactNode
}

export interface CardProps {
  id: number
  poster_path: string
  title: string
  release_date: string
  myRate?: string
  handleGetVideoId: (id: number) => void
}

export interface SearchProps {
  handleSearchMovies: (data: string) => void
}

export interface Movie {
  average_rating: number
  backdrop_path: string
  videoId?: string
  id: number
  poster_path: string
  release_date: string
  title: string
  overview: string
}

export interface MoviesProviderProps {
  children: ReactNode
}

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

export interface MoviesStateProps {
  myMovies: MovieData[]
}

export interface StarProps {
  id: string | undefined
  sessionId: string
  detailMovie: MovieData
}

export interface MovieContextType {
  myMovies: MovieData[]
  addItem: (newMovie: MovieData) => void
}
