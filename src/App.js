import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ProfileProvider } from "./config/profile/ProfileContext";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./config/theme/Theme";
import HomePage from "./feature/home/page/HomePage";
import { AuthProvider, useAuth } from "./app/auth/AuthContext";
import AdminPage from "./feature/admin/page/AdminPage";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';


(function() {
    const originalSetItem = localStorage.setItem;

    localStorage.setItem = function(key, value) {
        const event = new Event('localStorageChange');
        event.key = key;
        event.newValue = value;
        document.dispatchEvent(event);
        originalSetItem.apply(this, arguments);
    };

})();

const ProtectedRoute = ({ element }) => {
    const { authState } = useAuth();
    return authState && authState.isOwner ? element : <Navigate to="/" />;
};

function App() {

    return (
        <ProfileProvider>
            <AuthProvider>
                <ChakraProvider theme={theme}>
                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <AppRoutes/>
                    </BrowserRouter>
                </ChakraProvider>
            </AuthProvider>
        </ProfileProvider>
    );
}

function AppRoutes() {
    const location = useLocation();
    return  (<Routes location={location}>
        <Route index element={<HomePage />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />
    </Routes>);

    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                classNames="page-transition"
                timeout={300}
            >
                <Routes location={location}>
                    <Route index element={<HomePage />} />
                    <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
}

export default App;
