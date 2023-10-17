import { useEffect } from 'react'
import { Link } from '../components/Link'

export default function SearchPage ({ routeParams }) {
  useEffect(() => {
    document.title = `Has busado ${routeParams.query}`
  }, [])
  return (
    <>
      <h1>Buscador {routeParams.query}</h1>
      <Link to='/'>Home</Link>
    </>
  )
}
