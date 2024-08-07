import React, { createContext, useState, useEffect } from "react";
import profileData from "../profile/profile.json";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        setProfile(profileData);
    }, []);

    return (
        <ProfileContext.Provider value={profile}>
            {children}
        </ProfileContext.Provider>
    );
};