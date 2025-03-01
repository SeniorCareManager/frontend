import { useCheckLoginNav } from "../hooks/useCheckLoginNav";


export default function Forum(){
    const { accessToken, loggedIn } = useCheckLoginNav();
    return(<div className="grow">
        <iframe className="h-full w-full" src="https://scmbbs.wjlo.cc">
        </iframe>
    </div>);
}