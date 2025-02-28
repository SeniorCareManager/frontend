import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";

const root = createRoot(document.getElementById("root")!);

export function load(){
    root.render(<App />);
}

load();