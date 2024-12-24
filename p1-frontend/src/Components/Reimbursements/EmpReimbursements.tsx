import axios from "axios";
import { useEffect, useState } from "react";
import { store } from "../../GlobalData/store";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Reimbursements {
    reimbId:number,
    description:string,
    amount:number,
    status:string,
}

export const EmpReimbursements:React.FC = () => {
    const [reimbursements, setReimbursements] = useState<Reimbursements[]>([])
    
    useEffect(()=>{
        getReimbursementByUserId();
    }, [])

    const navigate = useNavigate()

    const getReimbursementByUserId = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4445/reimbursements/${store.loggedInUser.userId}`,
            {withCredentials: true}
          )
          setReimbursements(response.data);
        } catch (error) {
          console.error("Unable to retrieve reinbursements", error)
        }
      }

    return(
        <Container>

            <Button className="btn-info" onClick={()=>navigate(-1)}>Back</Button>
            <Button className="btn-info" onClick={()=>{navigate("/reimbursementForm")}}>Create Reimbursement</Button>
            <Button className="btn-info" onClick={()=>{navigate("/pendingEmpReimbursements")}}>View Pending Reimbursements</Button>
            <Button className="btn-info" onClick={()=>{navigate("/deniedEmpReimbursements")}}>View Denied Reimbursements</Button>

            <h3>All Your Reimbursements</h3>

            <Table className="table-warning table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Reimbursement ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reimbursements.map((reimbursements:Reimbursements) => (
                        <tr>
                            <td>{reimbursements.reimbId}</td>
                            <td>{reimbursements.description}</td>
                            <td>{reimbursements.amount}</td>
                            <td>{reimbursements.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container>
    )
}