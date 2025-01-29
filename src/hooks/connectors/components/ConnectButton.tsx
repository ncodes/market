import { Button } from "@/components/ui/button";
import IconWallet from "@/components/icons/IconWallet";
import { Label } from "@/components/ui/label";
import IconClose from "@/components/icons/IconClose";
import { WALLETS } from "@/libs/wallets";
import { Link } from "react-router-dom";
import IconArrowRight from "@/components/icons/IconArrowRight";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useStore from "@/hooks/store/useStore";

export function ConnectButton() {
  const openConnectWalletSheet = useStore((s) => s.openConnectWalletSheet);
  const setOpenConnectWalletSheet = useStore((s) => s.setOpenConnectWalletSheet);

  return (
    <Sheet open={openConnectWalletSheet} onOpenChange={(state) => setOpenConnectWalletSheet(state)} modal>
      <SheetTrigger>
        <Button variant={"secondary"} id="walletConnect">
          <div className="flex items-center gap-8">
            <span>Connect</span>
            <IconWallet />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="border-none bg-transparent">
        <div className="rounded-3xl border border-gray-800 bg-gray-900">
          <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
            <Label className="text-2xl font-bold text-gray-50">Connect Wallet</Label>
            <div
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gray-800"
              onClick={() => setOpenConnectWalletSheet(false)}
            >
              <IconClose />
            </div>
          </div>
          <div className="flex w-full flex-col">
            {WALLETS.map((wallet) => (
              <Wallet name={wallet.name} logo={wallet.logo} />
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
          <label className="text-sm text-green-200">Installed</label>
        </div>
      </div>
      <IconArrowRight className="hidden group-hover:block" />
    </div>
  );
}
