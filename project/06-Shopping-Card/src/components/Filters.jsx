import { useFilters } from '../hooks/useFilters'
import './Filters.css'
import { useId } from 'react'

export function Filters () {
  const { setFilters, filters } = useFilters()
  // Para visualizar el numero
  const minPriceFilterId = useId()
  const categoryFilterId = useId()
  // Modifica el estado minPrice al mover el input
  const handleChangeMinPrice = (e) => {
    setFilters(prevState => ({
      ...prevState,
      minPrice: e.target.value
    }))
  }
  const handleChangeCategory = (e) => {
    setFilters(prevState => ({
      ...prevState,
      category: e.target.value
    }))
  }
  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          type='range' id={minPriceFilterId}
          min='0' max='1000'
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='laptops'>Portátiles</option>
          <option value='smartphones'>Celulares</option>
        </select>
      </div>
    </section>
  )
}
