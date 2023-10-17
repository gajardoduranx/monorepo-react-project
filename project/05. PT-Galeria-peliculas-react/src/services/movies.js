// Servicio
export const searchMovies = async ({ search }) => {
  if (search === '') return null
  
  try {
    // Llamada FETCH a un servidor API
    const response = await fetch(`https://www.omdbapi.com/?apikey=fa8de440&s=${search}`)
    const json = await response.json()
    // ARRAY DE OBJETOS 
    const movies = json.Search

    // RETORNO DE DEL SERVICIO
    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (e) {
    throw new Error('Error earching movies')
  }
}
