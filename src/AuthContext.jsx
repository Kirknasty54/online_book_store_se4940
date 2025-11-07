import {createContext, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [admin, setAdmin] = useState(false);

    const checkAuth = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoggedIn(false);
            setAdmin(false);
            return;
        }

        setLoggedIn(true);

        try {
            const decoded = jwtDecode(token);
            console.log("Token decoded:", decoded);
            console.log("User role:", decoded.role);

            if (decoded.role === "ROLE_ADMIN") {
                setAdmin(true);
                console.log("Admin user detected");
            } else {
                setAdmin(false);
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            setLoggedIn(false);
            setAdmin(false);
        }
    };

    const login = () => {
        checkAuth();
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        setLoggedIn(false);
        setAdmin(false);
    };

    // Check auth on mount
    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, admin, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
