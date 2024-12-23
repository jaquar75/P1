import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"

interface User {
    userId:number,
    firstName:string,
    lastName:string,
    username:string,
    role:string
}

export const Users:React.FC = () => {

    const [users, setUsers] = useState([])

    useEffect(()=>{
        getAllUsers()
    }, [])

    const getAllUsers = async () => {
        const response = await axios.get("http://localhost:4445/users")
        .then((response)=>{
            setUsers(response.data)
        })
    }

    return(
        <Container>

            <h3>Users</h3>

            <Table className="table-warning table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user:User) => (
                        <tr>
                            <td>{user.userId}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                {user.role === "employee" ? <Button>Promote</Button> : <Button className="btn-danger">Demote</Button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
                
            </Table>

        </Container>
    )
}