import { EVENTS } from '../logic/const'

function navigate (href) {
  window.history.pushState({}, '', href)
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ...props }) {
  // FUNCION MANEJADORA DEL EVENTO CLICK DEL ANCOR Y QUE LAMA A NAVIGATE
  const handleClick = event => {
    // Eventos secundarios
    const isMainEvent = event.button === 0 // primary click
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const manageableEvent = target === undefined || target === '_self'

    if (isMainEvent && !isModifiedEvent && manageableEvent) {
      event.preventDefault()
      navigate(to) // navegación con SPA
    }
  }
  return (
    <a
      href={to}
      onClick={handleClick}
      target={target}
      {...props}
    />
  )
}
