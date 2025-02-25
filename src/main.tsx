import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import MainPage from "./components/App.tsx";
import Login from "./components/Login.tsx";

const root = createRoot(document.getElementById("root")!);

export function load(){
    root.render(
        <StrictMode>
            <BrowserRouter><Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/app" element={<Six />} />
                <Route path="/login" element={<Login />} />
            </Routes></BrowserRouter>
        </StrictMode>
    );
}

load();

function Six(){
    return(<div>sdqaw</div>);
}