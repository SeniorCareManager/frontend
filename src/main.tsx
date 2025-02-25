import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import MainPage from "./components/App.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";

const gr$$$$$$$$032wjre = createRoot(document.getElementById("root")!);

export function ftn43iunoewt(){
    gr$$$$$$$$032wjre.render(
        <StrictMode>
            <BrowserRouter basename="/frontend"><Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/app" element={<Six />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes></BrowserRouter>
        </StrictMode>
    );
}

ftn43iunoewt();

function Six(){
    return(<div>sdqaw</div>);
}