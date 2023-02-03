import { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthProviderWrapper(props){
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    return(
        <AuthContext.Provider value={{ isLogged, isLoading, user}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext };