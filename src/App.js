import {BrowserRouter, Routes, Route} from "react-router-dom";

import {ProfileProvider} from "./config/profile/ProfileContext";

import {ChakraProvider} from "@chakra-ui/react";
import {theme} from "./config/theme/Theme";

import HomePage from "./feature/home/page/HomePage";
import {AuthProvider} from "./app/auth/AuthContext";

function App() {
    return (
        <ProfileProvider>
            <AuthProvider>
                <ChakraProvider theme={theme}>
                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <Routes>
                            <Route index element={<HomePage/>}/>
                        </Routes>
                    </BrowserRouter>
                </ChakraProvider>
            </AuthProvider>
        </ProfileProvider>
    );
}

export default App;
