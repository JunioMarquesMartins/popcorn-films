import './styles/global.css'

import { BrowserRouter } from 'react-router-dom'
import { MoviesProvider } from './contexts/MoviesContext'
import { Router } from './Router'

function App() {
  return (
    <BrowserRouter>
      <MoviesProvider>
        <Router />
      </MoviesProvider>
    </BrowserRouter>
  )
}

export default App
