import axios from "axios";
import { useEffect, useState } from "react";
import { store } from "../../GlobalData/store";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Reimbursements {
  reimbId: number;
  description: string;
  amount: number;
  status: string;
}

export const DeniedEmpReimbursements: React.FC = () => {
  const [reimbursements, setReimbursements] = useState<Reimbursements[]>([]);

  useEffect(() => {
    getReimbursementByUserIdAndStatus();
  }, []);

  const navigate = useNavigate();

  const getReimbursementByUserIdAndStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4445/reimbursements/${store.loggedInUser.userId}/DENIED`,
        { withCredentials: true }
      );
      setReimbursements(response.data);
    } catch (error) {
      console.error("Unable to retrieve reimbursements", error);
    }
  };

  const refuteReimbursement = async (description: string, amount: number) => {
    try {
      const data = {
        description,
        amount,
        status: "PENDING",
        userId: store.loggedInUser.userId,
      };
      await axios.post("http://localhost:4445/reimbursements", data, { withCredentials: true });
      alert("Reimbursement refuted and set to PENDING!");
      getReimbursementByUserIdAndStatus(); // Refresh the list if needed
    } catch (error) {
      console.error("Unable to refute reimbursement", error);
    }
  };

  return (
    <Container>
      <Button className="btn-info" onClick={()=>navigate(-1)}>
        Back
      </Button>

      <h3>All Your Denied Reimbursements</h3>

      <Table className="table-warning table-hover">
        <thead className="table-dark">
          <tr>
            <th>Reimbursement ID</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {reimbursements.map((reimbursement: Reimbursements) => (
            <tr key={reimbursement.reimbId}>
              <td>{reimbursement.reimbId}</td>
              <td>{reimbursement.description}</td>
              <td>{reimbursement.amount}</td>
              <td>{reimbursement.status}</td>
              <td>
                <Button
                  className="btn-primary"
                  onClick={() => refuteReimbursement(reimbursement.description, reimbursement.amount)}
                >
                  Refute
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};