import { SignUpForm } from "@/modules/auth";
import Link from "next/link";

export default function SignUp() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <SignUpForm />
      <Link href={"/"} className="absolute bottom-10 left-10 text-white">
        Back home
      </Link>
    </main>
  );
}
