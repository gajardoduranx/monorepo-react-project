import { useContext } from 'react'
import { FiltersContext } from '../context/filters'

export function useFilters () {
  // Estado para el filtrado por precio y categogoria
  // const [filters, setFilters] = useState({
  //   category: 'all',
  //   minPrice: 0
  // })
  // 3. filters tendra los value del ProviderContext
  const { filters, setFilters } = useContext(FiltersContext)
  // filtro de minimo precio y categorias
  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice &&
          (
            filters.category === 'all' ||
            product.category === filters.category
          )
      )
    })
  }
  return { filterProducts, setFilters, filters }
}
// filterProducts - Productos Filtrados - Return de la Funcion Filtro
// setFilters - Modificar el estado de los filtros - Origen_ contexto
// filtros . Estadi de los filtros - Origen_ contexto
