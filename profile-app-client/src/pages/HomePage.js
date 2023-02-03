import { Link } from "react-router-dom"

function Homepage(){
    return(
        <div>
            <h1>Welcome</h1>
            <Link to="/sign-up">
                <button type="button">Sign Up</button>
            </Link>
            <Link to="log-in">
                <button type="button">Log In</button>
            </Link>
        </div>
    )
}

export default Homepage;