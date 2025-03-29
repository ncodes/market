import { DiscordIcon, TelegramIcon, XIcon as TwitterIcon } from "@/assets";
import { cn } from "@/libs/utils";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import CloseIcon from "../CloseIcon";
import LogoMark from "../icons/LogoMark";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex md:hidden">
      <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
        <SheetTrigger asChild>
          <Button
            onClick={() => setOpen(false)}
            className="m-0 h-auto justify-start gap-1 rounded-none bg-transparent p-0 text-start hover:bg-transparent"
          >
            <div className="flex items-center gap-2">
              <LogoMark />
            </div>
            <ChevronDown size={20} className={cn("transition-all", { "rotate-180": open })} />
          </Button>
        </SheetTrigger>
        <SheetContent
          className="max-h-[90vh] w-full rounded-b-none rounded-t-3xl border border-raisin-black bg-chinese-black p-0 font-poppins"
          hideCloseButton
          side={"bottom"}
        >
          <div className="flex items-center justify-end px-5 pt-4">
            <CloseIcon setOpen={setOpen} />
          </div>
          <div className="h-[80vh] overflow-y-auto">
            <div className="flex h-fit w-full flex-col gap-3 px-5">
              <div className="flex flex-col gap-4">
                <Label className="text-base text-white">App</Label>
                <MobileMenuItem text="Swap" url="#" />
                <MobileMenuItem text="Liquidity" url="#" />
                <MobileMenuItem text="Explore" url="#" />
                <MobileMenuItem text="Markets" url="#" />
              </div>
              <CompanyMenu />
              <ProtocolMenu />
              <NeedHelpMenu />
              <div className="flex flex-col gap-4">
                <Label className="text-base text-white">Legal</Label>
                <MobileMenuItem text="Terms of Service" url="#" />
                <MobileMenuItem text="Privacy Policy" url="#" />
                <MobileMenuItem text="Copyright" url="#" />
              </div>
              <div className="flex gap-[14px] pb-5 pt-2">
                <Button variant={"link"} className="flex h-7 w-7 items-center justify-center rounded-full bg-white p-0">
                  <img src={DiscordIcon} className="h-5 w-5" />
                </Button>
                <Button variant={"link"} className="flex h-7 w-7 items-center justify-center rounded-full bg-white p-0">
                  <img src={TwitterIcon} className="h-5 w-5" />
                </Button>
                <Button variant={"link"} className="flex h-7 w-7 items-center justify-center rounded-full bg-white p-0">
                  <img src={TelegramIcon} className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function MobileMenuItem({ text }: { text: string; url: string }) {
  return (
    <Button
      variant={"link"}
      className="h-fit w-fit p-0 text-sm font-light text-cool-grey hover:bg-transparent hover:text-cool-grey"
    >
      {text}
    </Button>
  );
}

function CompanyMenu() {
  const [open, setOpen] = useState(false);
  const contentHeight = useRef<HTMLDivElement>(null);
  const [animCount, setAnimCount] = useState(0);

  return (
    <motion.div className={cn("relative m-0 w-full overflow-hidden p-0")}>
      <Button
        variant="link"
        className="flex gap-1 p-0 text-base font-light text-white hover:text-white"
        onClick={() => setOpen((prev) => !prev)}
      >
        Company
        <ChevronDown className={cn("size-6 text-cool-grey transition-all duration-300", { "rotate-180": open })} />
      </Button>

      <motion.div
        initial={{ opacity: 0, visibility: "hidden", position: "absolute" }}
        animate={{
          height: open ? contentHeight.current?.clientHeight : "0",
          opacity: open ? [0, 0.5, 1] : 0,
          visibility: open ? "visible" : "hidden",
          position: animCount === 0 ? (open ? "relative" : "absolute") : "relative",
        }}
        transition={{ duration: 0.3, ease: "linear" }}
        onAnimationComplete={() => {
          setAnimCount((prev) => prev + 1);
        }}
      >
        <div ref={contentHeight} className="flex flex-col gap-4">
          <MobileMenuItem text="Career" url="#" />
          <MobileMenuItem text="Blog" url="#" />
          <MobileMenuItem text="Docs" url="#" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProtocolMenu() {
  const [open, setOpen] = useState(false);
  const contentHeight = useRef<HTMLDivElement>(null);
  const [animCount, setAnimCount] = useState(0);

  return (
    <motion.div className={cn("relative m-0 w-full overflow-hidden p-0")}>
      <Button
        variant="link"
        className="flex gap-1 p-0 text-base font-light text-white hover:text-white"
        onClick={() => setOpen((prev) => !prev)}
      >
        Protocol
        <ChevronDown className={cn("size-6 text-cool-grey transition-all duration-300", { "rotate-180": open })} />
      </Button>

      <motion.div
        initial={{ opacity: 0, visibility: "hidden", position: "absolute" }}
        animate={{
          height: open ? contentHeight.current?.clientHeight : "0",
          opacity: open ? [0, 0.5, 1] : 0,
          visibility: open ? "visible" : "hidden",
          position: animCount === 0 ? (open ? "relative" : "absolute") : "relative",
        }}
        transition={{ duration: 0.3, ease: "linear" }}
        onAnimationComplete={() => {
          setAnimCount((prev) => prev + 1);
        }}
      >
        <div ref={contentHeight} className="flex flex-col gap-4">
          <MobileMenuItem text="Developer" url="#" />
          <MobileMenuItem text="Join" url="#" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function NeedHelpMenu() {
  const [open, setOpen] = useState(false);
  const contentHeight = useRef<HTMLDivElement>(null);
  const [animCount, setAnimCount] = useState(0);

  return (
    <motion.div className={cn("relative m-0 w-full overflow-hidden p-0")}>
      <Button
        variant="link"
        className="flex gap-1 p-0 text-base font-light text-white hover:text-white"
        onClick={() => setOpen((prev) => !prev)}
      >
        Need Help?
        <ChevronDown className={cn("size-6 text-cool-grey transition-all duration-300", { "rotate-180": open })} />
      </Button>

      <motion.div
        initial={{ opacity: 0, visibility: "hidden", position: "absolute" }}
        animate={{
          height: open ? contentHeight.current?.clientHeight : "0",
          opacity: open ? [0, 0.5, 1] : 0,
          visibility: open ? "visible" : "hidden",
          position: animCount === 0 ? (open ? "relative" : "absolute") : "relative",
        }}
        transition={{ duration: 0.3, ease: "linear" }}
        onAnimationComplete={() => {
          setAnimCount((prev) => prev + 1);
        }}
      >
        <div ref={contentHeight} className="flex flex-col gap-4">
          <MobileMenuItem text="Help & Support" url="#" />
          <MobileMenuItem text="Contact Us" url="#" />
        </div>
      </motion.div>
    </motion.div>
  );
}
