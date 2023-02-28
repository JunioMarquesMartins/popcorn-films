import { Routes, Route } from 'react-router-dom'
import { DetailPage } from './pages/DetailPage'
import { MoviesPage } from './pages/MoviesPage'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MoviesPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
    </Routes>
  )
}
