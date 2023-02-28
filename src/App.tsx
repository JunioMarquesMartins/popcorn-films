import { BrowserRouter } from 'react-router-dom'
import { MoviesProvider } from './contexts/MoviesContext'
import { Layout } from './layout'
import { Router } from './Router'
import './styles/global.css'

function App() {
  return (
    <MoviesProvider>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </MoviesProvider>
  )
}

export default App
