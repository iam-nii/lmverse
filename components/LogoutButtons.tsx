import { Button } from "./ui/button";
<<<<<<< HEAD
import { signOut } from "@/store/api/authApi";
=======
import {signOut} from '@/store/api/authApi';
>>>>>>> 9a6f50cc112e01ffa70044a7cea90f19fa151148
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

type LogoutButtonProps = {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
};
export const LogoutButton = ({
  className,
  variant = "default",
}: LogoutButtonProps) => {
  const router = useRouter();
  const locale = useLocale();
  const logout = () => {
    signOut();
    router.replace(`/${locale}/login`);
  };
  return (
    <Button
      onClick={logout}
      variant={variant}
      className={`cursor-pointer ${className}`}
    >
      Logout
    </Button>
  );
};
