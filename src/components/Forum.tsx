import { useLoginNav } from "../hooks/useLogin";


export default function Forum(){
    const { accessToken, loggedIn } = useLoginNav();
    return(<div className="grow">
        <iframe className="h-full w-full" src="https://scmbbs.wjlo.cc">
        </iframe>
    </div>);
}