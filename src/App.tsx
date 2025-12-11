import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.tsx";
import PersonalPage from "./pages/PersonalPage/PersonalPage.tsx";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage.tsx";
import AdminPage from "./pages/AdminPage/AdminPage.tsx";
import AdminEditUser from "./pages/AdminEditUser/AdminEditUser.tsx";
import AdminCreateUser from "./pages/AdminCreateUser/AdminCreateUser.tsx";
import NewsPage from "./pages/NewsPage/NewsPage.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NewsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/account" element={<PersonalPage />} />
                <Route path="/account/edit" element={<EditProfilePage />} />
                <Route path="/admin/edit/:id" element={<AdminEditUser />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/create" element={<AdminCreateUser />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;