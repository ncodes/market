import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Header } from "@/components/header.tsx";
import { ChevronsUp, Settings } from "lucide-react";
import { SwapInputField } from "@/pages/swap/SwapInputField.tsx";
import { AvatarSize } from "@/components/avatar/useAvatar.tsx";
import EmojiAvatar from "@/components/avatar/EmojiAvatar.tsx";
import { useRef, useState } from "react";
import { cn } from "@/libs/utils.ts";
import { SwapDrawer, SwapDrawerContent } from "@/pages/swap/SwapDrawer.tsx";

export default function SwapPage() {
  const swapSectionRef = useRef<HTMLDivElement | null>(null);
  const [drawerContent, setDrawerContent] = useState<SwapDrawerContent>();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className="overflow-hidden font-poppins text-white">
      <Header />

      <div className="relative mx-auto flex h-[740px] w-[537px] flex-col overflow-hidden rounded-b-3xl py-10">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-3xl font-medium">Swap</h1>
          <Button
            variant="ghost"
            className="h-auto p-0 opacity-80 hover:scale-105 hover:opacity-100"
            onClick={() => {
              setDrawerContent("advance-settings");
              setOpenDrawer(!openDrawer);
            }}
          >
            <div className="rounded-xl border border-ragoon-green bg-eerie-black p-2">
              <Settings className="h-5 w-5 text-gray-500" />
            </div>
          </Button>
        </div>
        <Card
          ref={swapSectionRef}
          className={cn(
            "w-full rounded-3xl border border-gray-800 bg-gradient-to-b from-eerie-black to-onyx p-4 pb-0 text-gray-300",
          )}
        >
          <CardContent className="space-y-4 p-0">
            <SwapInputField
              direction="Sell"
              avatarSrc="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png"
              tokenSymbol="UNI"
              value="34.5"
              price="45.66"
              onRequestModal={() => {
                setDrawerContent("token-selector");
                setOpenDrawer(!openDrawer);
              }}
            />

            <SwapInputField
              direction="Buy"
              avatarSrc="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x221657776846890989a759BA2973e427DfF5C9bB/logo.png"
              tokenSymbol="REP"
              value="120.43"
              price="20.33"
              onRequestModal={() => {
                setDrawerContent("token-selector");
                setOpenDrawer(!openDrawer);
              }}
            />

            <div className="rounded-2xl bg-mirage p-2 px-0">
              <p className="px-4 text-sm font-light tracking-wide text-boulder">Provider</p>
              <div className="flex justify-between px-4">
                <div className="mt-2 flex items-center space-x-2">
                  <EmojiAvatar randomStr="stuff" size={AvatarSize.Medium} />
                  <span className="font-regular text-[16px] tracking-wide text-boulder">0xLiquifyPro</span>
                </div>
                <div>
                  <div className="flex flex-col text-right tracking-wide">
                    <span className="text-sm font-light text-boulder">CP Rate:</span>
                    <span className="font-bold text-gray-100">100%</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex w-full items-center justify-center border-t border-gray-800/50 pt-2 text-sm text-boulder/90">
                <Button variant="ghost" className="h-auto p-0 hover:text-boulder" onClick={() => {
                  setDrawerContent("provider-selector");
                  setOpenDrawer(!openDrawer);
                }}>
                  Select provider
                  <ChevronsUp className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-2xl bg-mirage p-2 px-0 text-boulder">
              <div className="flex justify-between px-4 text-sm font-light tracking-wide text-gray-400">
                <span className="font-medium">Swap Fee</span>
                <span>
                  <span className="font-semibold">0.064286 ETH</span> ($0.43)
                </span>
              </div>
              <div className="mt-2 flex justify-between px-4">
                <p className="text-sm">Market Fee (1.5%)</p>
                <p className="text-sm">0.064286 ETH ($0.43)</p>
              </div>
              <div className="mt-2 flex justify-between px-4">
                <p className="text-sm">Protocol Fee (0%)</p>
                <p className="text-sm">0 ETH</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 px-0">
            <Button className="h-auto w-full rounded-2xl bg-light-green/90 py-3 text-xl font-medium text-black hover:bg-light-green">
              Swap
            </Button>
          </CardFooter>
        </Card>

        <SwapDrawer
          open={openDrawer}
          height={swapSectionRef.current?.clientHeight}
          content={drawerContent}
          onClose={() => setOpenDrawer(false)}
        />
      </div>
    </div>
  );
}
