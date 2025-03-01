import { useCheckLoginNav } from "../hooks/useCheckLoginNav";


export default function Plan(){
    const { accessToken, loggedIn, initialzing, setLogin } = useCheckLoginNav();
    return(<div className="grow">
        plan
    </div>);
}