import './styles/global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { BrowserRouter } from 'react-router-dom'
import { MoviesProvider } from './contexts/MoviesContext'
import { Router } from './Router'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MoviesProvider>
          <Router />
        </MoviesProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
