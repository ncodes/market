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
        <div ref={mainContainerRef} className="rounded-3xl border border-gray-800 bg-gray-900 font-poppins">
          <div className="flex items-center justify-between border-b border-gray-800 px-5 py-4">
            <Label className="text-2xl font-bold text-gray-50">Connect Wallet</Label>
            <div
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gray-800"
              onClick={() => setOpenConnectWalletSheet(false)}
            >
              <IconClose />
            </div>
          </div>
          <div className="flex w-full flex-col px-0 py-3">
            {Wallets.map((wallet) => (
              <Wallet name={wallet.name} logo={wallet.logo} />
            ))}
          </div>
          <div className="flex items-center justify-center border-t border-gray-800 py-5 font-poppins font-light tracking-wide">
            <p className="max-w-xs text-center text-xs text-gray-400">
              By connecting your wallet, you agree to Joint Labs{" "}
              <Link className="text-green-300" to={"#"}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="text-green-300" to={"#"}>
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
          <p className="text-gray-100">{name}</p>
          <label className="text-[14px] font-light text-green-200">Installed</label>
        </div>
      </div>
      <IconArrowRight className="hidden group-hover:block" />
    </div>
  );
}
