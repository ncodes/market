import { Helmet } from "react-helmet-async";
import { Header } from "./header/header";
import { ReactNode } from "react";
import { Label } from "./ui/label";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden font-poppins text-white">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="relative w-full">
        <div className="absolute left-0 right-0 top-0 h-[17px]">
          <div className="mx-auto mb-[4px] h-full w-full max-w-xl border border-[#979797] bg-light-green blur-[50px]"></div>
        </div>
        <Header />
      </div>

      {children}

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <div className="relative mt-20 w-full p-4">
      <div className="absolute left-0 right-0 top-0 h-[17px]">
        <div className="mx-auto mb-[4px] h-full w-full max-w-xl border border-[#979797] bg-light-green blur-[50px]"></div>
      </div>
      <div className="flex items-baseline justify-between">
        <Label className="text-xs font-normal text-gray-400">JOINT LABS (C) {new Date().getFullYear()}</Label>
        <Label className="text-xs font-normal text-gray-400">TERMS - PRIVACY POLICY</Label>
      </div>
    </div>
  );
}
