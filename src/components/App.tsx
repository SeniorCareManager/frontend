import Navbar from "./Navbar";
import { HashRouter, Navigate, Route, Routes } from "react-router";
import Login from "./Login";
import Register from "./Register";
import Feedback from "./Feedback";
import MainPage from "./MainPage";
import Forum from "./Forum";
import News from "./News";
import Pricing from "./Pricing";

export default function App(){
    return(<>
        <HashRouter>
            <Navbar />
            <Routes>
                <Route path="/" index element={<MainPage />} />
                <Route path="/news" element={<News />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </HashRouter>
    </>);
}