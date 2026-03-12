import { Button } from "./ui/button"
import { SignOut } from "@/lib/auth/authApi"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"

export const LogoutButton = ()=>{
    const router = useRouter();
    const locale = useLocale();
    const logout = ()=>{
        SignOut();
        router.replace(`/${locale}/login`)

    }
    return (
        <Button onClick={logout} variant={"destructive"} className="cursor-pointer">Logout</Button>
    )
}