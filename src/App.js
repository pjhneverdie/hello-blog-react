import {useRef, useState, useEffect} from "react";

import {Routes, Route, BrowserRouter} from "react-router-dom";

import {ChakraProvider} from "@chakra-ui/react";
import {theme} from "./config/theme/Theme";

import {useAuth, AuthProvider} from "./app/auth/AuthContext";

import {PostProvider} from "./feature/post/provider/PostProvider";
import {CategoryProvider} from "./feature/category/provider/CategoryProvider";

import HomePage from "./app/home/page/HomePage";
import AdminPage from "./app/admin/page/AdminPage";
import AuthModal from "./app/auth/component/AuthModal";
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

const ProtectedRoute = ({element}) => {

    const {authState} = useAuth();

    const modalRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {

        const onClickOutSideOfAuthModal = (e) => {
            if (
                isModalOpen &&
                modalRef.current &&
                !modalRef.current.contains(e.target)
            ) {
                setIsModalOpen(false);
                window.location.replace("/hello-blog-react");
            }
        };

        document.addEventListener("mousedown", onClickOutSideOfAuthModal);

        return () => {
            document.removeEventListener("mousedown", onClickOutSideOfAuthModal);
        };

    }, [isModalOpen]);

    if (!authState && !sessionStorage.getItem("member")) {

        if (!isModalOpen) {
            setIsModalOpen(true);
        }

        return <AuthModal modalRef={modalRef}
                          isModalOpen={isModalOpen}
                          setIsModalOpen={setIsModalOpen}/>;

    }

    return element;
};

function App() {

    return (
        <AuthProvider>
            <PostProvider>
                <CategoryProvider>
                    <ChakraProvider theme={theme}>
                        <BrowserRouter basename={process.env.PUBLIC_URL}>
                            <Routes>
                                <Route path="/" element={<HomePage/>}/>
                                <Route path="/admin" element={<ProtectedRoute element={<AdminPage/>}/>}/>
                                <Route path="/post/:id" element={<PostDetailPage/>}/>
                            </Routes>
                        </BrowserRouter>
                    </ChakraProvider>
                </CategoryProvider>
            </PostProvider>
        </AuthProvider>
    );
}

export default App;
