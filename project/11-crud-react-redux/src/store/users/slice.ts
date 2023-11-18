import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
    {
        id: "1",
        name: "Yazman Rodriguez",
        email: "jhondoe@gmai.cok",
        github: "jhonsitodoe"
    },
    {
        id: "2",
        name: "Jane Doe",
        email: "janedoe",
        github: "janedoe"
    },
    {
        id: "3",
        name: "Haakon Dahlberg",
        email: "casitoock@sdod.sd",
        github: "midudev"
    }
]


export type UserId = string

export interface User {
    name: string,
    email: string,
    github: string
}
export interface UserWithId extends User {
    id: UserId
}
// IFI Functions
const initialState: UserWithId[] = (() => {
    const persistedState = localStorage.getItem('_redux_state_')
    return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE
})()

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            return [...state, { id, ...action.payload }]
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload
            return state.filter(user => user.id !== id)
        }
    }
})

export default userSlice.reducer

export const { addNewUser, deleteUserById } = userSlice.actions