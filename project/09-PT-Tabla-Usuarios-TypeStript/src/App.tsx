import './App.css'
import { useState, useEffect, useRef } from 'react'
import { type User } from './types'
import { UsersList } from './components/UserList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  // useRef del estado inicia
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
    console.log(showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  } 

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then(data => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
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
        <button onClick={handleReset}>
          Resetear
        </button>
      </header>
      <main>
        <UsersList showColors={showColors} users={sortedUsers} deleteUser={handleDelete} />
      </main>
    </div>
  )
}

export default App
