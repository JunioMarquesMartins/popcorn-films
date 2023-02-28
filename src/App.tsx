import { BrowserRouter } from 'react-router-dom'
import { Layout } from './layout'
import { Router } from './Router'
import './styles/global.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  )
}

export default App
