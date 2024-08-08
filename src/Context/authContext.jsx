import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthCheckProvider = ({children}) => {

    const [user, setUser] = useState({})

    const token = localStorage.getItem("token")
    if(!token){
        console.log("No Token Found!")
    }

    const checkAuthorization = async () => {
        try {
            const res = await axios.post()           
        } catch (error) {
            console.log(error.response.message.data)
        }
    }

    return(
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
    
}

export const UserData = () => useContext(AuthContext)