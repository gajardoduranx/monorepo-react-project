import './App.css'
import { useCatImage } from '../hooks/useCatImage'
import { useCatFact } from '../hooks/useCatFact'

export function App () {
  const { fact, getFactAndUpdateState } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handleClick = () => {
    getFactAndUpdateState()
  }
  // Renderizado
  return (
    <main className='container'>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl &&
        <img
          src={`${imageUrl}`}
          alt={`Imagen de un gatito a partir de las primera tres palabras de esta frase: ${fact}`}
        />}
    </main>
  )
}
