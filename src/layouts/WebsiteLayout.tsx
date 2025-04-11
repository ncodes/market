import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Label } from "@/components/ui/label";
import LogoMark from "@/components/icons/LogoMark";
import { WordMark } from "@/components/icons/Logo";
import { DiscordIcon, GithubIcon, LinkedInIcon, RedditIcon, TwitterIcon, YouTubeIcon } from "@/assets/socials";
import { Link } from "react-router-dom";
import { WebsiteHeader } from "@/components/website-header/Header";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

export default function WebsiteLayout({ children, title }: PageLayoutProps) {
  return (
    <div className="absolute flex h-screen w-screen flex-col justify-between overflow-hidden font-poppins text-white">
      <div className="h-full w-full overflow-auto">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div className="min-h-[calc(100%-100px)] w-full">
          <div className="relative w-full">
            <div className="absolute -top-5 left-0 right-0 h-[20px]">
              <div className="mx-auto h-full w-5/12 rounded-full border bg-light-green blur-[40px]"></div>
            </div>
            <WebsiteHeader />
          </div>
          {children}
        </div>
        <div className="w-full overflow-hidden border-b border-t border-b-[#f7b500] border-t-[#6dd400] font-bold">
          <Label className="text-[188px] text-[#9fbe431b]">JOINT.EXCHANGE</Label>
        </div>
        <Footer />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="relative mt-14 w-full overflow-hidden pb-24">
      <div className="flex h-fit w-full items-start justify-between px-28">
        <div className="flex w-fit flex-col gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <LogoMark />
              <WordMark />
            </div>
            <Label className="text-xs font-light text-cool-grey">© 2025 - All rights reserved</Label>
          </div>
          <div className="flex gap-3">
            <a href="#">
              <img src={GithubIcon} alt="" className="h-4 w-auto" />
            </a>
            <a href="#">
              <img src={LinkedInIcon} alt="" className="h-4 w-auto" />
            </a>
            <a href="#">
              <img src={RedditIcon} alt="" className="h-4 w-auto" />
            </a>
            <a href="#">
              <img src={TwitterIcon} alt="" className="h-4 w-auto" />
            </a>
            <a href="#">
              <img src={YouTubeIcon} alt="" className="h-4 w-auto" />
            </a>
            <a href="#">
              <img src={DiscordIcon} alt="" className="h-4 w-auto" />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="p-0 text-sm font-medium text-white">Company</h3>
          <Link to={"#"} className="text-xs font-light text-cool-grey">
            About
          </Link>
          <Link to={"#"} className="text-xs font-light text-cool-grey">
            Blog
          </Link>
          <Link to={"#"} className="text-xs font-light text-cool-grey">
            Media
          </Link>
          <Link to={"#"} className="text-xs font-light text-cool-grey">
            FAQs
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="p-0 text-sm font-medium text-white">Protocol</h3>
          <Link to={"#"} className="text-xs font-light text-cool-grey">
            Trade
          </Link>
          <Link to={"#"} className="text-xs font-light text-cool-grey">
            Markets
          </Link>
          <Link to={"#"} className="text-xs font-light text-cool-grey">
            Liquidity
          </Link>
          <Link to={"#"} className="text-xs font-light text-cool-grey">
            Mediation
          </Link>
          <Link to={"#"} className="text-xs font-light text-cool-grey">
            Disputes
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="p-0 text-sm font-medium text-white">Developers</h3>
          <Link to={"#"} className="text-xs font-light text-cool-grey">
            Documentation
          </Link>
          <Link to={"#"} className="text-xs font-light text-cool-grey">
            Github
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="p-0 text-sm font-medium text-white">Legal</h3>
          <Link to={"#"} className="text-xs font-light text-cool-grey">
            Protocol Disclaimer
          </Link>
          <Link to={"#"} className="text-xs font-light text-cool-grey">
            Terms of service
          </Link>
          <Link to={"#"} className="text-xs font-light text-cool-grey">
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 mt-[130px] h-[20px]">
        <div className="mx-auto h-full w-4/12 rounded-full border bg-light-green blur-[50px]"></div>
      </div>
    </div>
  );
}
