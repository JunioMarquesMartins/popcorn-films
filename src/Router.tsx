import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layout/DefaultLayout'
import { DetailPage } from './pages/DetailPage'
import { MoviesPage } from './pages/MoviesPage'
import { Mylist } from './pages/MyList'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/mylist" element={<Mylist />} />
      </Route>
    </Routes>
  )
}
