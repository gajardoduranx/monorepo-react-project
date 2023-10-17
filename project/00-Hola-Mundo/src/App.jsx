import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

function App () {
  // FUNCION DE FORMATEO PARA USERNAME (PROPS)
  const formatUserName = (userName) => `@${userName}`
  // OBJETO CON LAS PROPS QUE RECIBEN LOS COMPONENTES HIJOS
  const midudev = { isFollowing: true, userName: 'midudev', name: 'Miguel Angel Duran' }
  // Renderizado de listas con .map()
  const users = [
    {
      name: 'dualipa',
      userName: 'dualipa',
      isFollowing: true
    },
    {
      name: 'Post Malonee',
      userName: 'postmalone',
      isFollowing: true
    },
    {
      name: 'daltonico',
      userName: 'dalto',
      isFollowing: false
    },
    {
      name: 'Desconcido',
      isFollowing: false
    }
  ]
  // RENDERIZACION
  return (
    <section className='App'>

      <TwitterFollowCard
        {...midudev}
        formatUserName={formatUserName}
      />

      {
      users.map((user, index) => {
        const { name, userName, isFollowing } = user
        return (
          <TwitterFollowCard
            key={index}
            userName={userName}
            initialFollowing={isFollowing}
            formatUserName={formatUserName}
          >
            {name}
          </TwitterFollowCard>
        )
      })
    }

    </section>
  )
}

export default App
