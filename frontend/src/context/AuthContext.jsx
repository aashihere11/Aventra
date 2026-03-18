import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios"

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/me', { withCredentials: true })
            .then(res => setUser(res.data.user))
            .catch(() => setUser(null));
    }, []);

    console.log(user);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);