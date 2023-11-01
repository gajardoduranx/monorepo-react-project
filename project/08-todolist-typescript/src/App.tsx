import { useState } from 'react'
import { Todos } from './components/Todos'
import { type TodoId, Todo as TodoTypes, FilterValue, type TodoTitle } from './components/types'
import { TODO_FILTERS } from './consts'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

// *Estado inicial de los todos
const mockTodos = [
  {
    id: '1',
    title: 'Aprender JavaScript',
    completed: true
  },
  {
    id: '2',
    title: 'Aprender React',
    completed: true
  },
  {
    id: '3',
    title: 'Aprender TypeScript',
    completed: false
  }
]
// *Tipo - JSX.Element
const App = (): JSX.Element => {
  // Estado para guardar los todos y actualizarlos con setTodos() 
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  // Filtro por id - remove
  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  // Toggle completed - Marca y desmarca
  const handleCompleted = ({ id, completed }: Pick<TodoTypes, 'id' | 'completed'>): void => {
    // Nuevo estado
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    // Actualización de estado
    setTodos(newTodos)
  }
  // Filtros
  const handleFilter = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }
  const handleRemoveCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }
  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount
  const filteredTodos = todos.filter(todo => {
    if(filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if(filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todos
  })
  // Para agregar un nuevo todo
  const handleAddTodo = ({title}: TodoTitle): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }
    const newTodos = [...todos, newTodo] 
    setTodos(newTodos)
  }
  return (
    <>
      <div className='todoapp'>
        <Header onAddTodo={handleAddTodo} />
        <Todos
          todos={filteredTodos}
          onRemoveTodo={handleRemove}
          onToggleCompleted={handleCompleted} />
        <Footer
          onClearCompleted={handleRemoveCompleted}
          activeCount={activeCount}
          completedCount={completedCount}
          filterSelected={filterSelected}
          handleFilterChange={handleFilter} />
      </div>
    </>
  )
}

export default App
