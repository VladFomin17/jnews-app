import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.tsx";
import PersonalPage from "./pages/PersonalPage/PersonalPage.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/account" element={<PersonalPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;