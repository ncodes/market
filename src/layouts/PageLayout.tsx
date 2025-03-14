import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../components/header/Header";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

export default function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div className="absolute flex h-screen w-screen flex-col justify-between overflow-hidden font-poppins text-white">
      <div className="h-full w-full overflow-auto">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div className="min-h-[calc(100%-100px)] w-full">
          <div className="relative w-full">
            <div className="absolute -top-10 left-0 right-0 h-[17px]">
              <div className="mx-auto mb-[4px] h-full w-4/12 border border-[#979797] bg-light-green blur-[30px]"></div>
            </div>
            <Header />
          </div>
          {children}
        </div>

        <Footer />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="h-10 w-full overflow-hidden">
      <div className="absolute left-0 right-0 mt-[80px] h-[20px]">
        <div className="mx-auto h-full w-4/12 rounded-full border bg-light-green blur-[50px]"></div>
      </div>
    </div>
  );
}
