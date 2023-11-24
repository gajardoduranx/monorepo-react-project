import { SortBy, type User } from "../types.d";

interface Props {
    changeSorting: (sort: SortBy) => void
    users: User[]
    showColors: boolean
    deleteUser: (email: string) => void
}

export function UsersList({ changeSorting, users, showColors, deleteUser }: Props) {
    return (
        <table width='100%'>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th className="pointer" onClick={() => changeSorting(SortBy.NAME)}>Nombre</th>
                    <th className="pointer" onClick={() => changeSorting(SortBy.LAST)}>Apellido</th>
                    <th className="pointer" onClick={() => changeSorting(SortBy.COUNTRY)}>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                        const backgroundColor = index % 2 === 0 ? "#333" : "#555"
                        const color = showColors
                            ? { backgroundColor, color: "white" }
                            : { backgrundColor: "transparent" }
                        return (
                            <tr key={index} style={color}>
                                <td>
                                    <img src={user.picture.thumbnail} alt={user.name.first} />
                                </td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td>
                                    <button onClick={() => deleteUser(user.email)}>Borrar</button>
                                </td>
                            </tr>
                        )
                    }
                    )
                }
            </tbody>
        </table >
    )
}