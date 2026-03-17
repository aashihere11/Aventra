import { jwtDecode } from "jwt-decode";
import React from "react";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);

        }
    }, []);

    return (
        <AuthContext.Provider value= {{user, setUser}}>
        {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);