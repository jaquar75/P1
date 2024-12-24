import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Login } from './Components/LoginRegister/Login'
import { Register } from './Components/LoginRegister/Register'
import { AllReimbursements } from './Components/Reimbursements/AllReimbursements'
import { Users } from './Components/Users/Users'
import { EmpReimbursements } from './Components/Reimbursements/EmpReimbursements'
import ReimbursementForm from './Components/Reimbursements/ReimbursementForm'
import { PendingEmpReimbursements } from './Components/Reimbursements/PendingEmpReimbursements'
import { DeniedEmpReimbursements } from './Components/Reimbursements/DeniedEmpReimbursements'
import { PendingManReimbursements } from './Components/Reimbursements/PendingManReimbursements'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="allReimbursements" element={<AllReimbursements/>} />
          <Route path="users" element={<Users/>} />
          <Route path="empReimbursements" element={<EmpReimbursements/>} />
          <Route path="reimbursementForm" element={<ReimbursementForm/>} />
          <Route path="pendingEmpReimbursements" element={<PendingEmpReimbursements/>} />
          <Route path="deniedEmpReimbursements" element={<DeniedEmpReimbursements/>} />
          <Route path="pendingManReimbursements" element={<PendingManReimbursements/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App