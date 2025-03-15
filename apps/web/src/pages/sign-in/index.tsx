import { SignInForm } from "@/modules/auth";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <SignInForm />
      <Link href={"/"} className="absolute bottom-10 left-10 text-white">Back home</Link>
    </main>
  );
}
