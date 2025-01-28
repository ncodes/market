import { Button } from "@/components/ui/button";
import IconWallet from "@/components/icons/IconWallet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import IconClose from "@/components/icons/IconClose";
import { useState } from "react";
import { WALLETS } from "@/libs/wallets";
import { Link } from "react-router-dom";

export function ConnectButton({ title }: { title: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={(state) => setOpen(state)}>
      <PopoverTrigger>
        <Button variant={"secondary"}>
          <div className="flex items-center gap-8">
            <span>{title}</span>
            <IconWallet />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max border-none bg-transparent">
        <div className="rounded-3xl border border-gray-800 bg-gray-900">
          <div className="flex items-center gap-32 border-b border-gray-800 px-4 py-3">
            <Label className="text-2xl font-bold text-gray-50">Connect Wallet</Label>
            <div
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gray-800"
              onClick={() => setOpen(false)}
            >
              <IconClose />
            </div>
          </div>
          <div className="flex w-full flex-col">
            {WALLETS.map((wallet) => (
              <div className="flex cursor-pointer justify-between px-5 py-1">
                <div className="flex items-center gap-2">
                  <img src={wallet.logo} alt="" className="h-8 w-8 rounded-full" />
                  <div className="flex flex-col">
                    <p className="text-gray-100">{wallet.name}</p>
                    <label className="text-sm text-green-200">Installed</label>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center border-t border-gray-800 py-4">
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
      </PopoverContent>
    </Popover>
  );
}
