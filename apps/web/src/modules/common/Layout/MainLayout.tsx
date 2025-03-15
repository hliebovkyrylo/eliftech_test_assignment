import { ReactNode } from "react";
import { Header } from "./components";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full flex flex-col gap-6 min-h-screen px-[120px]">
      <Header />
      <div>{children}</div>
    </main>
  );
};
