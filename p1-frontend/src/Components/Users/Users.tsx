import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface User {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    role: string;
}

export const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:4445/users", { withCredentials: true });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const promoteUser = async (userId: number) => {
        try {
            await axios.patch(`http://localhost:4445/users/${userId}`, { role: "Manager" }, { withCredentials: true });
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.userId === userId ? { ...user, role: "Manager" } : user
                )
            );
        } catch (error) {
            console.error("Error promoting user:", error);
        }
    };

    const removeUser = async (userId: number) => {
        try {
            await axios.delete(`http://localhost:4445/users/${userId}`, { withCredentials: true });
            setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
        } catch (error) {
            console.error("Error removing user:", error);
        }
    };

    return (
        <Container>
            <Button className="btn-info" onClick={()=>navigate(-1)}>
                Back
            </Button>

            <h3>All Users</h3>

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
                    {users.map((user) => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                {user.role !== "Manager" ? (
                                    <Button
                                        className="btn-success"
                                        onClick={() => promoteUser(user.userId)}
                                    >
                                        Promote
                                    </Button>
                                ) : (
                                    <Button className="btn-secondary" disabled>
                                        Promote
                                    </Button>
                                )}
                                <Button
                                    className="btn-danger ms-2"
                                    onClick={() => removeUser(user.userId)}
                                >
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};