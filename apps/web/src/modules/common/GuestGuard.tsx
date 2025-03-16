import { useRouter } from "next/router";
import cookie from "js-cookie";

interface GuestGuardProps {
  children: React.ReactNode;
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const router = useRouter();
  const accessToken = cookie.get("accessToken");

  if (accessToken) {
    router.push("/");
  }

  return <>{children}</>;
};
