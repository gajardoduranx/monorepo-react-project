import { useEffect, useState } from "react";

function FollowMouse () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x:0, y:0})

  useEffect(() => {
    console.log('effect', { enabled });

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handleMove', { clientX, clientY });
      setPosition({x: clientX, y: clientY})
    }
    if(enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // cleanup
    // --> Cuando el componente se desmonta
    // --> Cuado cambian las dependencias, antes de ejecutar el efecto de nuevo
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])
  
  const handleClick = () => {
    setEnabled(!enabled)
  }

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}/>
      <button onClick={handleClick}>
        {enabled ? 'Desactivar' : 'Activar'} Seguir puntero
      </button>
    </>
  )
}

function App() {
  const [mounted, setMounted] = useState(true)

  return (
    <main>
      {mounted && <FollowMouse/>}
      <button onClick={() => setMounted(!mounted)}>
        Toggle mounted FollowMouse component
      </button>
    </main>
  )
}

export default App
