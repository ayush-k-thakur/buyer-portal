import { createContext, useContext, useEffect, useState } from "react";
import { buildUrl } from "../utils/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMe = async () => {
        try {
            const res = await fetch(buildUrl("/users/me"), {
                credentials: "include", // important for cookie
            });
            if (!res.ok) throw new Error();
            const data = await res.json();
            setUser(data.user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    const logout = async () => {
        await fetch(buildUrl("/users/logout"), {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, fetchMe, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);