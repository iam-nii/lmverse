import { Button } from "./ui/button"
import { SignOut } from "@/lib/auth/authApi"

export const LogoutButton = ()=>{
    const logout = ()=>{
        SignOut();
    }
    return (
        <Button onClick={logout} variant={"destructive"}>Logout</Button>
    )
}