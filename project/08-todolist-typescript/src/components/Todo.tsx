import { TodoId, type Todo as TodoTypes } from "./types"

interface Props extends TodoTypes {
    onToggleCompleted: ({ id, completed }: Pick<TodoTypes, 'id' | 'completed'>)  => void
    onRemoveTodo: (id: TodoId) => void
}
// Componente Todo
export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleted }) => {

    // Funcion que captura el evento change del input y lo envia al componente padre por el onToggleCompleted
    const handleChangeTodo = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        onToggleCompleted({ 
            id, 
            completed: event.target.checked 
        })
    }

    return (
        <div className="view">
            <input
                type="checkbox"
                className="toggle"
                checked={completed}
                onChange={handleChangeTodo}
            />
            <label>{title}</label>
            <button
                className="destroy"
                onClick={() => { onRemoveTodo({ id }) }}
            ></button>
        </div>
    )

}