import { Button } from "./ui/button";
import { SignOut } from "@/lib/auth/authApi";
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
    SignOut();
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
