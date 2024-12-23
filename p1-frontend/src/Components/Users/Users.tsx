import { Container, Table } from "react-bootstrap"

export const Users:React.FC = () => {

    return(
        <Container>

            <Table className="table-primary table-hover">
                <thead>
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
                </tbody>
                
            </Table>

        </Container>
    )
}