import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = "http://localhost:5005";

function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [campus, setCampus] = useState('');
    const [course, setCourse] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestBody = {username, password, campus, course}
        axios.post(`${API_URL}/auth/signup`, (requestBody))
            .then(response => navigate('/log-in'))
            .catch(err => setError(err.response.data.message))
    }

    return(
        <div>
            <h1>Sign-Up Page</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
                <label>Username: 
                    <input type='text' onChange={(event)=>{setUsername(event.target.value)}}/>
                </label>
                <br/>
                <label>Password:  
                    <input type='password' onChange={(event)=>{setPassword(event.target.value)}}/>
                </label>
                <br/>
                <label>Campus:  
                    <select defaultValue={"Default"} onChange={(event)=>{setCampus(event.target.value)}}>
                        <option value="Default" disabled>Select Campus</option>
                        <option value="Madrid">Madrid</option>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Miami">Miami</option>
                        <option value="Paris">Paris</option>
                        <option value="Berlin">Berlin</option>
                        <option value="Amsterdam">Amsterdam</option>
                        <option value="México">Mexico</option>
                        <option value="Sao Paulo">Sao Paulo</option>
                        <option value="Lisbon">Lisbon</option>
                        <option value="Remote">Remote</option>
                    </select>
                </label>
                <br/>
                <label>Course:  
                    <select defaultValue={"Default"} onChange={(event)=>{setCourse(event.target.value)}}>
                        <option value="Default" disabled>Select Course</option>
                        <option value="Web Dev">Web Dev</option>
                        <option value="UX/UI">UX/UI</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Cyber Security">Cyber Security</option>
                    </select>
                </label>
                <br/>
                <button>Sign Up!</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Signup;