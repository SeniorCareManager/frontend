import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";

const root = createRoot(document.getElementById("root")!);

export function load(){
    root.render(<StrictMode><App /></StrictMode>);
}

load();