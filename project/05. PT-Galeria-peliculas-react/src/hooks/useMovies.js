import { useState } from 'react'
// import withMovies from '../mocks/with-results.json'
import withoutResults from '../mocks/no-results.json'

export function useMovies ({ search }) {
  const [responseMovies, setResponseMovies] = useState([])
  const movies = responseMovies.Search

  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))

  const getMovies = () => {
    if (search) {
      // setResponseMovies(withMovies)
      fetch(`https://www.omdbapi.com/?apikey=fa8de440&s=${search}`)
        .then(res => res.json())
        .then(data => {
          setResponseMovies(data)
        })
    } else {
      setResponseMovies(withoutResults)
    }
  }
  return { movies: mappedMovies, getMovies }
}
