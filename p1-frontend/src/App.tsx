import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Login } from './Components/LoginRegister/Login'
import { Register } from './Components/LoginRegister/Register'
import { Reimbursements } from './Components/Reimbursements/Reimbursements'
import { Users } from './Components/Users/Users'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="reimbursements" element={<Reimbursements/>} />
          <Route path="users" element={<Users/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
