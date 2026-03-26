import { Button } from "./ui/button";
import { signOut } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { LoadingSpinner } from "./ui/loading-spinner";

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
  const [loading, setLoading] = useState(false);
  const logout = () => {
    setLoading(true);
    signOut();
    router.replace(`/${locale}/login`);
    setLoading(false);
  };
  return (
    <Button
      onClick={logout}
      variant={variant}
      className={`cursor-pointer ${className}`}
    >
      {loading ? (
        <>
          {" "}
          <LoadingSpinner />
        </>
      ) : (
        <>Logout</>
      )}
    </Button>
  );
};
