import React, {createContext, useContext, useState, useEffect} from "react";
import {ProfileContext} from "../../config/profile/ProfileContext";
import {BASE_URL} from "../../common/const/data";
import axios from "axios";
import {authExceptionCode} from "./exception/auth_exception_code";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const profile = useContext(ProfileContext);
    const [authState, setAuthState] = useState(null);

    useEffect(() => {
        const storedAuthState = localStorage.getItem("member");

        if (storedAuthState != null) {
            setAuthState(JSON.parse(storedAuthState));
        }

    }, []);

    const sign = async (email, password, path) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await axios.post(`${BASE_URL}/member/${path}`, {
                email: email,
                password: password
            });

            const data = response.data;

            const memberData = {
                email: data.value.email,
                isOwner: data.value.email === profile.ownerEmail,
            };

            localStorage.setItem("member", JSON.stringify(memberData));
            setAuthState(memberData);

            return true;
        } catch (exc) {
            alert(authExceptionCode[exc.response.data.exceptionCode])
        }

        return false;
    };

    const signOut = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/member/signOut`)
        } catch (exc) {
        }

        localStorage.removeItem("member");
        setAuthState(null);
    };

    return (
        <AuthContext.Provider value={{authState, sign, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}