import './App.css'
import { useState, useMemo } from 'react'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UserList'
import { useInfiniteQuery } from '@tanstack/react-query'

const fetchUsers = ({ pageParam = 1 }: {pageParam?: number}) => {
  return fetch(`https://randomuser.me/api?results=10&seed=midu&page=${pageParam}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Error al obtener los usuarios')
      }
      return res.json()
    })
    .then(data => {
      const nextCursor = Number(data.info.page)
      return {
        users: data.results,
        nextCursor
      }
    })
}


function App() {
  // useQuery
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{ users: User[], nextCursor: number }>(
    ['users'], //queryKey
    fetchUsers, // como traer la informacion
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor
    }
  )
  console.log(data)
  // Estados
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)

  const toggleColors = () => {
    setShowColors(!showColors)
  }
  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }
  const handleDelete = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    // setUsers(filteredUsers)
  }
  const handleReset = async () => {
    // setUsers(originalUsers.current)
    await refetch()
  }
  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      }) : users
  }, [filterCountry, users])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers
    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last,
      [SortBy.COUNTRY]: user => user.location.country,
    }
    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <div className='App'>
      <header>
        <h1>UsersList</h1>
        <div>
          <button onClick={toggleColors}>
            color
          </button>
          <button onClick={toggleSortByCountry}>
            {sorting === SortBy.COUNTRY ? 'No ordernar por país' : 'Ordenar por país'}
          </button>
          <button onClick={handleReset}>
            Resetear
          </button>
          <input placeholder='Filtrar por país' onChange={e => setFilterCountry(e.target.value)} />
        </div>
      </header>
      <main>
        {users.length > 0 &&
          <UsersList changeSorting={handleChangeSort} showColors={showColors} users={sortedUsers} deleteUser={handleDelete} />
        }
        {isLoading && <p>Cargando...</p>}
        {!isLoading && isError && <p>Ha habido un error</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}

        {!isLoading && !isError && <button onClick={() => setCurrentPage(currentPage + 1)} >Más resultados</button>}
      </main>
    </div>
  )
}

export default App
