import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'

export function DefaultLayout() {
  return (
    <>
      <Header />
      <main className="bg-zinc-900 px-3 md:px-0">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
