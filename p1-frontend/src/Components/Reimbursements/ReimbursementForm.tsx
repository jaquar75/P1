import React, { useState } from "react";
import axios from "axios";
import { store } from "../../GlobalData/store"; // Adjust the import path as per your project structure
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

interface ReimbursementFormData {
  description: string;
  amount: number;
  status: string;
  userId: number;
}

const ReimbursementForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const navigate = useNavigate()

  const createReimbursement = async (data: ReimbursementFormData) => {
    const response = await axios.post("http://localhost:4445/reimbursements", data, {withCredentials:true});    
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 

    const data: ReimbursementFormData = {
      description,
      amount,
      status: "PENDING",
      userId: store.loggedInUser.userId
    };

    await createReimbursement(data);
    alert("Reimbursement Submitted!");
    setDescription('');
    setAmount(0);
  };

  return (
    <Container className="d-flex align-items-center flex-column mt-3">
        <h3>Create New Reimbursement</h3>
        <form onSubmit={handleSubmit} className="d-flex align-items-center flex-column mt-5">
          <div>
            <label htmlFor="amountInput">Amount:</label>
            <input type="number" id="amountInput" name="amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))} required/>
          </div>
          <br></br>
          <div>
            <label htmlFor="descriptionInput">Description:</label>
            <input type="description" id="descriptionInput" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
          </div>
          <br></br>
          <Button type="submit">Submit</Button>
        </form>
        <br />
        <Button onClick={()=>navigate(-1)}>Back</Button>
    </Container>
  );
};

export default ReimbursementForm;