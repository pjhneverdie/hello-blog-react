import {BrowserRouter, Routes, Route} from "react-router-dom";

import HomePage from "./home/page/HomePage";

function App() {
    return (
        <BrowserRouter basename="/hello-blog-react">
            <Routes>
                <Route index element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
