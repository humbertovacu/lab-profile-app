import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = "http://localhost:5005";

function Login(){
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const requestBody = {username, password}
        axios.post(`${API_URL}/auth/login`, requestBody)
            .then(response => navigate('/'))
            .catch(error => {
                setError(error.response.data.message)
            })
    }

    return(
        <div>
            <h1>Log-In Page</h1>
            <form onSubmit = {(event) => handleSubmit(event)}>
                <label>Username:
                    <input type="text" onChange = {(event)=> setUsername(event.target.value)}></input>
                </label>
                <br/>
                <label>Password:
                    <input type="text" onChange = {(event)=> setPassword(event.target.value)}></input>
                </label>
                <br/>
                <button>Log In</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )

}

export default Login;