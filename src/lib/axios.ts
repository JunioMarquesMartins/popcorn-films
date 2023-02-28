import axios from 'axios'

export const apiMdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
})
