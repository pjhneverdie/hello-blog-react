import React, {createContext, useContext, useEffect, useState} from "react";

import axios from "axios";

import {BASE_URL} from "../../common/const/data";

import {authExceptionCode} from "./exception/authExceptionCode";
import {handleException} from "../../common/util/exceptionHandler";

const AuthContext = createContext(null);

export function AuthProvider({children}) {

    const [member, setMember] = useState(null);

    async function me() {
        const storedMember = sessionStorage.getItem("member");

        if (sessionStorage.getItem("member")) {
            try {
                // 쿠키 기한 늘리기
                await axios.get(`${BASE_URL}/member/me`,
                    {
                        withCredentials: true,
                    },
                );

                setMember(JSON.parse(storedMember));
            } catch (e) {
                sessionStorage.removeItem("member");
                setMember(null);
            }
        }
    }

    const signIn = async (email, password) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await axios.post(`${BASE_URL}/member/signIn`, {
                    email: email,
                    password: password
                },
                {
                    withCredentials: true,
                },
            );

            const member = {
                email: response.data.value.email
            };

            sessionStorage.setItem("member", JSON.stringify(member));
            setMember(member);

            return true;
        } catch (e) {
            handleException(e, authExceptionCode);
        }

        return false;
    };

    const signOut = async () => {
        try {
            await axios.get(`${BASE_URL}/member/signOut`);
        } catch (e) {

        }

        sessionStorage.removeItem("member");
        setMember(null);
    };

    useEffect(() => {
        const handleMe = async () => {
            await me();
        };

        handleMe();

        return () => {
            if (member) {
                signOut();
            }
        };
    }, []);


    return (
        <AuthContext.Provider value={{authState: member, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() {

    return useContext(AuthContext);

}
