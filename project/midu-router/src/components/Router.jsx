import { Children, useEffect, useState } from 'react'
import { EVENTS } from '../logic/const'
import { match } from 'path-to-regexp'
import { getCurrentPath } from '../utils/utils'

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
  // Estado para el PATH
  const [currentPath, setCurrentPath] = useState(getCurrentPath)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath)
    }
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  // add routes from children <Route /> Componenets
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    if (!isRoute) return null

    return props
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)
  console.log(routesToUse)

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    // Hemos usado path to regex para detectar
    // rutas dinamicas como por ejemplo
    // /search/:query <-- :query es una ruta dinamica
    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    // Guardar los parametros de la ur que eran dinanmicos
    // y que hemos extraido con path to regexp
    // por ejemplo: si la rutaes /serch/:query
    // y la url es /search/javascript
    // matched.params.query === 'javascript'
    routeParams = matched.params
    return true
  })?.Component
  return Page ? <Page routeParams={routeParams} /> : <DefaultComponent routeParams={routeParams} />
}
