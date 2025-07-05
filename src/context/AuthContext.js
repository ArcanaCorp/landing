import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";
import { accountGetInfo } from "../services/account.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);

    const getUser = async (token) => {
        try {
            const data = jwtDecode(token)
            setUser(data)
        } catch (error) {
            console.error(error);
        }
    }

    const getAccount = async (token) => {
        try {
            
            const data = await accountGetInfo(token);

            if (!data.ok) {
                console.log(data.message);
            } else {
                getUser(data.user)
            }

        } catch (error) {
            console.error(error);
        }
    }

    const contextValue = {
        user,
        getUser,
        getAccount
    }

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)