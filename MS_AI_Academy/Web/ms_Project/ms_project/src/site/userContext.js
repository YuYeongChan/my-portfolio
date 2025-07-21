import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const now = Date.now() / 1000;
                if (decoded.exp > now) {
                    setUserId(decoded.user_id);
                    if (location.pathname === "/") {
                        navigate("/home");
                    }
                } else {
                    localStorage.removeItem("token");
                }
            } catch (err) {
                localStorage.removeItem("token");
            }
        }
    }, [location.pathname, navigate]);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};
