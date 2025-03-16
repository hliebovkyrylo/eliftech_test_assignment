import { useRouter } from "next/router";
import cookie from "js-cookie";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const accessToken = cookie.get("accessToken");

  if (!accessToken) {
    router.push("/sign-in");
  }

  return <>{children}</>;
};
