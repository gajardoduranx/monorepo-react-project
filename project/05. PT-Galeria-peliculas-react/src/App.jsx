import { useState, useRef, useEffect } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function useSearch () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('No se puede buscar una pelcula vacia')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con numero')
      return
    }
    if (search.length < 3) {
      setError('La busqueda debe tener almenos 3 caracteres')
      return
    }
    setError(null)
  }, [search])

  return { search, setSearch, error }
}

function App () {
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({ search }) // Custom Hook

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies()
    console.log({ search })
  }
  const handleChange = (e) => {
    const newSearch = e.target.value
    setSearch(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input name='query' value={search} onChange={handleChange} placeholder='Averngers, Star Wars, Matrix...' />
          <button>Buscar</button>
        </form>
        {error && <p>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
