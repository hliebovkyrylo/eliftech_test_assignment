import { useRouter } from "next/router";
import cookie from "js-cookie";
import { useEffect } from "react";

interface GuestGuardProps {
  children: React.ReactNode;
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const router = useRouter();
  const accessToken = cookie.get("accessToken");

  useEffect(() => {
    if (accessToken) {
      router.push("/");
    }
  }, []);

  return <>{children}</>;
};
