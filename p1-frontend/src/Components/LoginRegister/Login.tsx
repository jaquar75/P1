import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const Login:React.FC = () => {

    const navigate = useNavigate()

    return(
        <Container className="d-flex align-items-center flex-column mt-5">
            <h3>Login</h3>

            <div>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                />
            </div>
            <div>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                />
            </div>

            <Button onClick={()=>navigate("/reimbursements")}>Login</Button>
            <Button onClick={()=>navigate("/register")}>Register</Button>
        </Container>
    )
}