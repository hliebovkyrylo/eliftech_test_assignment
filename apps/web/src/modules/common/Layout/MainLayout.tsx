import { ReactNode } from "react";
import { Header } from "./components";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full flex flex-col gap-6 min-h-screen px-[120px] max-[613px]:px-5">
      <Header />
      <div className="pb-10">{children}</div>
    </main>
  );
};
