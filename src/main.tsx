import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router";
import "./index.css";
import MainPage from "./components/App.tsx";
import LoginOrRegisterIGenerallyDontKnowHowToNameThisFreakingComponentWhichBothAppearsInLoginAndRegisterRoute from "./components/Login.tsx";

const gr$$$$$$$$032wjre = createRoot(document.getElementById("root")!);

export function ftn43iunoewt(){
    gr$$$$$$$$032wjre.render(
        <StrictMode>
            <HashRouter><Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/app" element={<Sixtesttesttestteststsetstsetse />} />
                <Route path="/login" element={<LoginOrRegisterIGenerallyDontKnowHowToNameThisFreakingComponentWhichBothAppearsInLoginAndRegisterRoute />} />
                <Route path="/register" element={<LoginOrRegisterIGenerallyDontKnowHowToNameThisFreakingComponentWhichBothAppearsInLoginAndRegisterRoute />} />
            </Routes></HashRouter>
        </StrictMode>
    );
}

ftn43iunoewt();

function Sixtesttesttestteststsetstsetse(){
    return(<div>sdqaw</div>);
}