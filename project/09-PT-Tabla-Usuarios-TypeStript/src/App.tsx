import './App.css'
import { useState, useEffect } from 'react'
import { type User } from './types'
import { UsersList } from './components/UserList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

  const toggleColors = () => {
    setShowColors(!showColors)
    console.log(showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  } 

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then(data => setUsers(data.results))
      .catch(err => console.log(err))
  }, [])


  const sortedUsers = sortByCountry ? users.toSorted((a, b) => {
    return a.location.country.localeCompare(b.location.country)
  }) : users

  return (
    <div className='App'>
      <header>
        <h1>Prueba Tecnica</h1>
        <button onClick={toggleColors}>
          color
        </button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'No ordernar por país' : 'Ordenar por país'}
        </button>
      </header>
      <main>
        <UsersList showColors={showColors} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App
