function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {
            movies.map(({ id, title, poster, year }) => (
              <li key={id} className='movie'>
                <h3>{title}</h3>
                <p>{year}</p>
                <img src={poster} alt={title} />
              </li>
            ))
      }
    </ul>
  )
}
function NoMoviesResults () {
  return (
    <p>No se encontraron películas</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0
  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResults />
  )
}
