// PETICION Y OBTENCION DE DATOS (PELICULAS) -SERVICIOS

import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // Valor mutable que se mantiene entre renderizados - busqueda anterior
  const previousSearch = useRef(search)

  // Funcion exportada para llamar al servicio segun el search recibido en useMovies - UseCallback para evitar renderizados y memorizar funcion
  const getMovies = useCallback(async ({ search }) => {
    // Comparar la busquda anterior con el search actual- si ambos son iguales se detiene la ejecucion 
    if(search === previousSearch.current) return
    try {
      setLoading(true)
      setError(null)
      // asignar el search actual al valor mutable
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
      console.log(movies)
    } catch (e) {
      setError(e.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])
// USO DE USE MEMO PARA MEMORIZAR UN CALCULO Y EJECUTARLO SOLO CUANDO CAMBIAN [SORT, MOVIES] 
  const sortedMovies = useMemo(() => {
    console.log('usando use memo')
     return sort
     ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
     : movies 
  }, [sort, movies])

  // Se exporta las peliculas, la funcion que llama el servicio y el loading  
  return { movies: sortedMovies, getMovies, loading }
}
