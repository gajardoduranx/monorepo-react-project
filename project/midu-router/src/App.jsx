import './App.css'
import { lazy, Suspense } from 'react'
import { Route } from './components/Route'
import { Router } from './components/Router'
import Page404 from './pages/404'
import SearchPage from './pages/Search'

const LazyHomePage = lazy(() => import('./pages/Home'))
const LazyAboutPage = lazy(() => import('./pages/About'))

// Rutas
const appRoutes = [
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App () {
  return (
    <main>
      <Suspense fallback={<div>Cargando...</div>}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
