import axios from "axios"
import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

interface User {
    firstName:string,
    lastName:string,
    username:string,
    password:string
}

export const Register:React.FC = () => {

    const[newUser, setNewUser] = useState<User>({
        firstName:"",
        lastName:"",
        username:"",
        password:""
    })

    const navigate = useNavigate()

    const storeValues = (event:React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        setNewUser((newUser) => ({...newUser, [name]:value}))
    }

    const register = async () => {
        const response = await axios.post("http://localhost:4445/users", newUser).then(()=>{
            alert("User " + newUser.username + " successfully created")
            navigate("/")
        })
        .catch((error)=>{alert("Registration failed, make sure all fields are filled out")})
    }

    return(
        <Container className="d-flex align-items-center flex-column mt-5">
            <h3>Register</h3>

            <div>
                <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={storeValues}
                />
            </div>
            <div>
                <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={storeValues}
                />
            </div>
            <div>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={storeValues}
                />
            </div>
            <div>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={storeValues}
                />
            </div>
            <div className="d-flex gap-1">
                <Button onClick={() => navigate("/")}>Back</Button>
                <Button onClick={register}>Register</Button>
            </div>
        </Container>
    )
}