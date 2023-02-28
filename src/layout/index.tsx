import { ReactNode } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="bg-zinc-900 px-3 md:px-0">{children}</main>
      <Footer />
    </>
  )
}
