import { Button } from "@/components/button";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <header className="py-4 flex justify-between items-center">
      <nav>
        <ul className="flex gap-10">
          <li>
            <a className={`${currentPath === "/" ? "text-white" : "text-slate-200"} text-lg hover:text-white transition-colors`} href="/">Home</a>
          </li>
          <li>
            <a className={`${currentPath === "/create-survey" ? "text-white" : "text-slate-500"} text-lg hover:text-white transition-colors`} href="/create-survey">Create questionnaire</a>
          </li>
        </ul>
      </nav>
      <Button className="cursor-pointer"><Link href={"/sign-in"}>Sign In/up</Link></Button>
    </header>
  );
};
