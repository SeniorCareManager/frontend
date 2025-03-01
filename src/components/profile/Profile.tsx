import { useEffect, useState } from "react";
import { UserData } from "../../schema/user";
import meta from "../../meta";
import { whoami } from "../../schema/login";


export default function Profile(){
    const [user, setUser] = useState<UserData | null>(null);
    useEffect(()=>{(async()=>{
        setUser(await whoami());
    })()}, []);
    return(<div>
        {user?.id} {user?.avatar_url} {user?.joined_at} {user?.nickname} {user?.phone}
    </div>);
}