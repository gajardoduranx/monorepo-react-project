import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Router } from '../components/Router'
import { Route } from '../components/Route'
import { Link } from '../components/Link'
import { getCurrentPath } from '../utils/utils'

// Utilidad para el detectar el path en los test
vi.mock('../utils/utils.js', () => ({
  getCurrentPath: vi.fn()
}))

describe('Router', () => {
  // Limpiar la pantalla para el siguiente test - antes de cada test y los mocks
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })
  // El componenete se renderiza???
  it('should render without problems', () => {
    render(<Router routes={[]} />)
    // Se espera que...
    expect(true).toBeTruthy()
  })
  // Se rendriza el 404 cuando no haya ruta??
  it('should render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
    // Se espera que...
    expect(screen.getByText('404')).toBeTruthy()
  })
  // Deberia renderizar la primera ruta que matchea - About o Home
  it('should render the component of the first route that marches', () => {
    // define el mock inicial - pagina
    getCurrentPath.mockReturnValue('/about')
    const routes = [
      {
        path: '/',
        Component: () => <h1>Home</h1>
      },
      {
        path: '/about',
        Component: () => <h1>About</h1>
      }
    ]
    render(<Router routes={routes} />)
    // Se espera que...
    expect(screen.getByText('About')).toBeTruthy()
  })
  // Funcionamiento del componenete LINK
  it('should navigate using Links', async () => {
    getCurrentPath.mockReturnValueOnce('/')

    // Renderizamos los componenetes para probar los LINKS
    render(
      <Router>
        <Route
          path='/' Component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link to='/about'>Go to About</Link>
              </>
            )
          }}
        />
        <Route path='/about' Component={() => <h1>About</h1>} />
      </Router>
    )
    // Click on the link
    const button = screen.getByText(/Go to About/)
    fireEvent.click(button)

    // Componente qu se le hizo click
    const aboutTitle = await screen.findByText('About')

    // Check taht the new route is rendered
    expect(aboutTitle).toBeTruthy()
  })
})
