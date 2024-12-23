import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

interface Reimbursements {
    reimbId:number,
    description:string,
    amount:number,
    status:string,
    user:any
}

export const Reimbursements:React.FC = () => {

    const [reimbursements, setReimbursements] = useState<Reimbursements[]>([])

    useEffect(()=>{
        getAllReimbursements()
    }, [])

    const navigate = useNavigate()

    const getAllReimbursements = async () => {
        const reponse = await axios.get("http://localhost:4445/reimbursements")
        setReimbursements(reponse.data)
    }

    const deleteTeam = (reimbId:number) => {
        alert("Reimbursement " + reimbId + " has been deleted")
    }

    return(
        <Container>

            <Button className="btn-info" onClick={()=>{navigate("/")}}>Back</Button>

            <h3>Reimbursements</h3>

            <Table className="table-warning table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Reimbursement ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>User</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {reimbursements.map((reimbursements:Reimbursements) => (
                        <tr>
                            <td>{reimbursements.reimbId}</td>
                            <td>{reimbursements.description}</td>
                            <td>{reimbursements.amount}</td>
                            <td>{reimbursements.status}</td>
                            <td>{reimbursements.user.username}</td>
                            <td>
                                <Button className="btn-danger" onClick={()=>{deleteTeam(reimbursements.reimbId)}}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container>
    )
}