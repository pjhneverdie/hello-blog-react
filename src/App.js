import React, {useEffect} from "react";

import {
    Routes, Route, BrowserRouter,
    useNavigate,
} from "react-router-dom";

import {ChakraProvider} from "@chakra-ui/react";
import {chakraTheme} from "./config/theme/Theme";

import {useAuth, AuthProvider} from "./app/auth/AuthContext";
import {PostProvider} from "./feature/post/provider/PostProvider";
import {CategoryProvider} from "./feature/category/provider/CategoryProvider";

import HomePage from "./app/home/page/HomePage";
import AdminPage from "./app/admin/page/AdminPage";
import LoginPage from "./app/auth/page/LoginPage";
import PostDetailPage from "./feature/post/page/PostDetailPage";

(function () {
    const originalSetItem = localStorage.setItem;

    localStorage.setItem = function (key, value) {
        const event = new Event('localStorageChange');
        event.key = key;
        event.newValue = value;
        document.dispatchEvent(event);
        originalSetItem.apply(this, arguments);
    };
})();

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, [navigate]);

    return null;
};

const ProtectedRoute = ({element}) => {
    const {authState} = useAuth();

    useEffect(() => {
        localStorage.setItem("chakra-ui-color-mode", "light");
    }, []);

    if (!authState && !sessionStorage.getItem("member")) {
        return (
            <LoginPage/>
        );
    }

    return element;
};

function App() {
    return (
        <AuthProvider>
            <PostProvider>
                <CategoryProvider>
                    <ChakraProvider theme={chakraTheme}>
                        <BrowserRouter basename={process.env.PUBLIC_URL}>
                            <Routes>
                                <Route path="*" element={<NotFound/>}/>
                                <Route path="/" element={<HomePage/>}/>
                                <Route path="/post/:id" element={<PostDetailPage/>}/>
                                <Route path="/admin" element={<ProtectedRoute element={<AdminPage/>}/>}/>
                            </Routes>
                        </BrowserRouter>
                    </ChakraProvider>
                </CategoryProvider>
            </PostProvider>
        </AuthProvider>
    );
}

export default App;
