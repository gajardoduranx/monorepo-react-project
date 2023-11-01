import { Todo } from "./Todo"
import { type TodoId, type ListOfTodos, type Todo as TodoTypes  } from "./types"
// Interfaz para las props
interface Props {
    todos: ListOfTodos,
    onRemoveTodo: ({ id }: TodoId) => void
    onToggleCompleted: ({ id, completed }: Pick<TodoTypes, 'id' | 'completed'>) => void
}
// Tipado de Funcional component - https://github.com/typescript-cheatsheets/react
// React.FC facilitador de tipado en React
export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleted }) => {
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li
                    key={todo.id}
                    className={`${todo.completed ? 'completed' : ''}`}>
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        onToggleCompleted={onToggleCompleted}
                        onRemoveTodo={onRemoveTodo}
                    />
                </li>
            ))}
        </ul>
    )
}