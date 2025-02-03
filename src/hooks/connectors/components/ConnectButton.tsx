import IconArrowRight from "@/components/icons/IconArrowRight";
import IconClose from "@/components/icons/IconClose";
import IconWallet from "@/components/icons/IconWallet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Wallets } from "@/libs/wallets";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import useStore from "../../store/useStore";

export function ConnectButton() {
  const [open, setOpen] = useState(false);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const { openConnectWalletSheet, setOpenConnectWalletSheet } = useStore((s) => ({
    openConnectWalletSheet: s.openConnectWalletSheet,
    setOpenConnectWalletSheet: s.setOpenConnectWalletSheet,
  }));

  useEffect(() => {
    setOpen(openConnectWalletSheet);
  }, [openConnectWalletSheet]);

  useOnClickOutside(mainContainerRef, handleClickOutside);

  function handleClickOutside() {
    setOpen(false);
    setOpenConnectWalletSheet(false);
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setOpenConnectWalletSheet(open);
      }}
      modal
    >
      <SheetTrigger>
        <Button variant={"secondary"} id="walletConnect" className="scale-btn">
          <div className="flex items-center gap-8">
            <span>Connect</span>
            <IconWallet />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right-md"
        className="mt-[72px] border-none bg-transparent px-0 pr-2 pt-0"
        hideCloseButton
        hideOverlay
      >
        <div ref={mainContainerRef} className="border-gunmetal bg-raisin-black rounded-3xl border font-poppins">
          <div className="border-gunmetal flex items-center justify-between border-b px-5 py-4">
            <Label className="text-lotion text-2xl font-bold">Connect Wallet</Label>
            <div
              className="bg-gunmetal flex h-11 w-11 cursor-pointer items-center justify-center rounded-full"
              onClick={() => setOpenConnectWalletSheet(false)}
            >
              <IconClose />
            </div>
          </div>
          <div className="flex w-full flex-col px-0 py-3">
            {Wallets.map((wallet, index) => (
              <Wallet key={index} name={wallet.name} logo={wallet.logo} />
            ))}
          </div>
          <div className="border-gunmetal flex items-center justify-center border-t py-5 font-poppins font-light tracking-wide">
            <p className="text-cool-grey max-w-xs text-center text-xs">
              By connecting your wallet, you agree to Joint Labs{" "}
              <Link className="text-chinese-green" to={"#"}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="text-chinese-green" to={"#"}>
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Wallet({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="group flex cursor-pointer items-center justify-between from-gradientStart to-gradientEnd px-5 py-2 hover:bg-gradient-to-l">
      <div className="flex items-center gap-2">
        <img src={logo} alt="" className="h-8 w-8 rounded-full" />
        <div className="flex flex-col">
          <p className="text-anti-flash-white">{name}</p>
          <label className="text-pastel-green text-[14px] font-light">Installed</label>
        </div>
      </div>
      <IconArrowRight className="hidden group-hover:block" />
    </div>
  );
}
