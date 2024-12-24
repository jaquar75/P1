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

export const AllReimbursements:React.FC = () => {

    const [reimbursements, setReimbursements] = useState<Reimbursements[]>([])

    useEffect(()=>{
        getAllReimbursements()
    }, [])

    const navigate = useNavigate()

    const getAllReimbursements = async () => {
        const response = await axios.get("http://localhost:4445/reimbursements", {withCredentials:true})
        .then((response)=>{
            setReimbursements(response.data)
        })
    }

    const deleteTeam = (reimbId:number) => {
        alert("Reimbursement " + reimbId + " has been deleted")
    }

    return(
        <Container>

            <Button className="btn-info" onClick={()=>navigate(-1)}>Back</Button>
            <Button className="btn-info" onClick={()=>{navigate("/users")}}>View All Users</Button>
            <Button className="btn-info" onClick={()=>{navigate("/pendingManReimbursements")}}>View All Pending Reimbursements</Button>
            <Button className="btn-info" onClick={()=>{navigate("/reimbursementForm")}}>Create Reimbursement</Button>
            <Button className="btn-info" onClick={()=>{navigate("/pendingEmpReimbursements")}}>View Personal Pending Reimbursements</Button>
            <Button className="btn-info" onClick={()=>{navigate("/deniedEmpReimbursements")}}>View Personal Denied Reimbursements</Button>

            <h3>All Reimbursements</h3>

            <Table className="table-warning table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Reimbursement ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>User</th>
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
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container>
    )
}