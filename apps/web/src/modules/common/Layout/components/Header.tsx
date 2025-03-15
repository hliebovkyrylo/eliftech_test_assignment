import { Button } from "@/components/button";
import Link from "next/link";
import { useRouter } from "next/router";
import cookie from "js-cookie";

export const Header = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const accessToken = cookie.get("accessToken");

  return (
    <header className="py-4 flex justify-between items-center">
      <nav>
        <ul className="flex gap-10">
          <li>
            <Link
              className={`${currentPath === "/" ? "text-white" : "text-slate-500"} text-lg hover:text-white transition-colors`}
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`${currentPath === "/create-survey" ? "text-white" : "text-slate-500"} text-lg hover:text-white transition-colors`}
              href="/create-survey"
            >
              Create questionnaire
            </Link>
          </li>
        </ul>
      </nav>
      {accessToken ? (
        <Button
          className="cursor-pointer bg-red-500 hover:bg-red-400"
          onClick={() => {
            cookie.remove("accessToken");
            window.location.reload();
          }}
        >
          Log out
        </Button>
      ) : (
        <Button className="cursor-pointer">
          <Link href={"/sign-in"}>Sign In/up</Link>
        </Button>
      )}
    </header>
  );
};
