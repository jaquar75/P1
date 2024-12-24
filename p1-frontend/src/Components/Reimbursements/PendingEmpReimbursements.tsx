import axios from "axios";
import { useEffect, useState } from "react";
import { store } from "../../GlobalData/store";
import { Button, Container, Table, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Reimbursements {
  reimbId: number;
  description: string;
  amount: number;
  status: string;
}

export const PendingEmpReimbursements: React.FC = () => {
  const [reimbursements, setReimbursements] = useState<Reimbursements[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newDescription, setNewDescription] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    getReimbursementByUserIdAndStatus();
  }, []);

  const getReimbursementByUserIdAndStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4445/reimbursements/${store.loggedInUser.userId}/PENDING`,
        { withCredentials: true }
      );
      setReimbursements(response.data);
    } catch (error) {
      console.error("Unable to retrieve reimbursements", error);
    }
  };

  const handleEdit = (id: number, currentDescription: string) => {
    setEditingId(id);
    setNewDescription(currentDescription);
  };

  const handleUpdate = async (id: number) => {
    try {
      await axios.patch(
        `http://localhost:4445/reimbursements/description/${id}`,
        newDescription, // Sending description as a plain string
        { headers: { "Content-Type": "text/plain" }, withCredentials: true }
      );
      setReimbursements((prev) =>
        prev.map((reimb) =>
          reimb.reimbId === id ? { ...reimb, description: newDescription } : reimb
        )
      );
      setEditingId(null);
      setNewDescription("");
    } catch (error) {
      console.error("Unable to update description", error);
    }
  };

  return (
    <Container>
      <Button className="btn-info" onClick={()=>navigate(-1)}>
        Back
      </Button>

      <h3>All Your Pending Reimbursements</h3>

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
          {reimbursements.map((reimbursement) => (
            <tr key={reimbursement.reimbId}>
              <td>{reimbursement.reimbId}</td>
              <td>
                {editingId === reimbursement.reimbId ? (
                  <Form.Control
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                ) : (
                  reimbursement.description
                )}
              </td>
              <td>{reimbursement.amount}</td>
              <td>{reimbursement.status}</td>
              <td>
                {editingId === reimbursement.reimbId ? (
                  <>
                    <Button
                      className="btn-success me-2"
                      onClick={() => handleUpdate(reimbursement.reimbId)}
                    >
                      Save
                    </Button>
                    <Button
                      className="btn-secondary"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    className="btn-primary"
                    onClick={() =>
                      handleEdit(reimbursement.reimbId, reimbursement.description)
                    }
                  >
                    Update Description
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};