import React, {createContext, useContext, useState, useEffect} from "react";
import {ProfileContext} from "../../config/profile/ProfileContext";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const profile = useContext(ProfileContext);
    const [authState, setAuthState] = useState(null);

    useEffect(() => {
        const storedAuthState = localStorage.getItem("member");
        if (storedAuthState) {
            setAuthState(JSON.parse(storedAuthState));
        }
    }, []);

    const sign = async (email, password, path) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await fetch("https://www.pjhneverdie.com/member/" + path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (response.ok) {
                const memberData = {
                    email: data.value.email,
                    isOwner: data.value.email === profile.ownerEmail,
                };

                localStorage.setItem("member", JSON.stringify(memberData));
                setAuthState(memberData);

                return true;
            } else {

            }
        } catch (exc) {
        }

        return false;
    };

    const signOut = () => {
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