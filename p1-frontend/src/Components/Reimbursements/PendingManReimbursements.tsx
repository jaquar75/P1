import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Reimbursements {
    reimbId: number;
    description: string;
    amount: number;
    status: string;
    user: any;
}

export const PendingManReimbursements: React.FC = () => {
    const [reimbursements, setReimbursements] = useState<Reimbursements[]>([]);
    const [editMode, setEditMode] = useState<number | null>(null);
    const [tempStatus, setTempStatus] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        getAllPendingReimbursements();
    }, []);

    const getAllPendingReimbursements = async () => {
        const response = await axios.get("http://localhost:4445/reimbursements/status/PENDING", {
            withCredentials: true,
        });
        setReimbursements(response.data);
    };

    const updateReimbursementStatus = async (reimbId: number, status: string) => {
        try {
            await axios.patch(
                `http://localhost:4445/reimbursements/status/${reimbId}`,
                status,
                { headers: { "Content-Type": "text/plain" }, withCredentials: true }
            );
            alert("Status updated successfully");
            setEditMode(null);
            getAllPendingReimbursements();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleEdit = (reimbId: number, currentStatus: string) => {
        setEditMode(reimbId);
        setTempStatus(currentStatus);
    };

    const handleSave = (reimbId: number) => {
        updateReimbursementStatus(reimbId, tempStatus);
    };

    const handleCancel = () => {
        setEditMode(null);
        setTempStatus("");
    };

    return (
        <Container>
            <Button className="btn-info" onClick={()=>navigate(-1)}>Back</Button>

            <h3>All Pending Reimbursements</h3>

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
                    {reimbursements.map((reimbursement) => (
                        <tr key={reimbursement.reimbId}>
                            <td>{reimbursement.reimbId}</td>
                            <td>{reimbursement.description}</td>
                            <td>{reimbursement.amount}</td>
                            <td>
                                {editMode === reimbursement.reimbId ? (
                                    <select
                                        value={tempStatus}
                                        onChange={(e) => setTempStatus(e.target.value)}
                                    >
                                        <option value="APPROVED">APPROVED</option>
                                        <option value="PENDING">PENDING</option>
                                        <option value="DENIED">DENIED</option>
                                    </select>
                                ) : (
                                    reimbursement.status
                                )}
                            </td>
                            <td>{reimbursement.user.username}</td>
                            <td>
                                {editMode === reimbursement.reimbId ? (
                                    <>
                                        <Button className="btn-success" onClick={() => handleSave(reimbursement.reimbId)}>Save</Button>
                                        <Button className="btn-secondary" onClick={handleCancel}>Cancel</Button>
                                    </>
                                ) : (
                                    <Button
                                        className="btn-warning"
                                        onClick={() => handleEdit(reimbursement.reimbId, reimbursement.status)}
                                    >
                                        Edit
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