import { useCheckLoginNav } from "../hooks/useCheckLoginNav";


export default function Plan(){
    const { accessToken, loggedIn } = useCheckLoginNav();
    return(<div className="grow">
        plan
    </div>);
}