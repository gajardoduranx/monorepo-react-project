import { FILTER_BUTTONS, TODO_FILTERS } from "../consts"

// * DECLARACIONES DE TIPADOS
export interface Todo {
    id: string,
    title: string,
    completed: boolean
}
// Array de Todos
export type ListOfTodos = Todo[]

// Utilitis types - Buena Practica
export type TodoTitle = Pick<Todo, 'title'>
export type TodoId = Pick<Todo, 'id'>
export type TodoCompleted = Pick<Todo, 'completed'>

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS] 