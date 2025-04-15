import {
  BitcoinIcon,
  CardanoIcon,
  EthereumIcon,
  NigeriaFlagIcon,
  SolanaIcon,
  UKFlagIcon,
  USAFlagIcon,
  USDTIcon,
} from "@/assets";
import {
  ArcPattern,
  DownPattern,
  DroidLightPattern,
  DroidPattern,
  JointXPattern,
  LShapePattern,
  UpPattern,
} from "@/assets/patterns";
import { Avatar } from "@/components/avatar/Avatar";
import Swap from "@/components/Swap";
import { Label } from "@/components/ui/label";
import WebsiteLayout from "@/layouts/WebsiteLayout";
import React from "react";

export default function WebsiteHomePage() {
  return (
    <WebsiteLayout title="Terms of Service">
      <div className="hidden md:block relative -z-10 mt-1 md:mt-12 h-[40px] w-full">
        <div className="hidden absolute -top-40 left-0 right-0 md:flex justify-center">
          <img src={UpPattern} alt="" className="h-auto w-[1200px]" />
        </div>
      </div>
      <div className="relative w-full">
        <div className="px-4 flex w-full justify-center">
          <div className="max-w-full md:max-w-md">
            <Swap showDarkButton />
          </div>
        </div>
        <img src={DroidPattern} alt="" className="hidden md:block absolute right-0 top-0 h-auto w-[80px]" />
        <img src={DroidPattern} alt="" className="hidden md:block absolute -bottom-10 left-0 h-auto w-[80px] scale-x-[-1]" />
      </div>
      <div className="relative w-full">
        <div className="hidden md:block relative h-[200px] w-full overflow-hidden">
          <div className="hidden absolute -top-40 left-0 right-0 md:flex justify-center">
            <img src={DownPattern} alt="" className="h-auto w-[1200px]" />
          </div>
        </div>
        <div className="absolute -top-[20px] w-full">
          <div className="custom-border-image relative my-20 flex h-6 w-full items-center overflow-hidden border-b-[0.3px] border-t-[0.3px] border-solid bg-[#030507]">
            <div className="animate-scroll-left flex w-max items-center gap-2 whitespace-nowrap">
              {[...Array(10)].map((_, i) => (
                <React.Fragment key={i}>
                  <Label className="text-xs text-light-periwinkle">Multi - Chain</Label>
                  <div className="bg-chinese-green h-2 w-2 rotate-45"></div>
                  <Label className="text-xs text-light-periwinkle">Uncapped Volumes</Label>
                  <div className="bg-chinese-green h-2 w-2 rotate-45"></div>
                  <Label className="text-xs text-light-periwinkle">Low Fees</Label>
                  <div className="bg-chinese-green h-2 w-2 rotate-45"></div>
                  <Label className="text-xs text-light-periwinkle">Borderless</Label>
                  <div className="bg-chinese-green h-2 w-2 rotate-45"></div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-44 md:mt-16 w-full px-4 md:px-28">
        <div className="flex w-full flex-col items-center gap-5">
          <h1 className="text-center text-[28px] md:text-[60px] font-semibold leading-[25px] md:leading-[60px] text-white">
            P2P
            <br />
            Reimagined
          </h1>
          <Label className="w-full max-w-md text-center text-xs text-light-periwinkle">
            Billions lost to CEX hacks and shutdowns. Joint lets you trade P2P with full control, security, and freedom.
          </Label>
        </div>
        <div className="mt-[31px] flex flex-col md:flex-row w-full gap-2">
          <div className="relative mt-[26px] flex h-[250px] md:h-auto flex-auto md:flex-1 rounded-xl bg-chinese-black p-6">
            <Label className="max-w-[230px] text-wrap text-lg font-semibold leading-6 text-light-periwinkle">
              Say goodbye to exchange hacks, frozen funds, and KYC traps.
            </Label>
            <img src={ArcPattern} alt="" className="absolute bottom-0 left-0 h-auto w-[310px]" />
            <img src={LShapePattern} alt="" className="absolute bottom-0 right-0 w-1/2" />
          </div>
          <div className="flex w-full md:w-1/3 flex-col gap-4">
            <div className="w-full">
              <img src={DroidLightPattern} alt="" className="h-auto w-full" />
            </div>
            <div className="flex w-full justify-center gap-2 rounded-xl bg-chinese-black px-5 py-7">
              <Avatar src={BitcoinIcon} />
              <Avatar src={SolanaIcon} />
              <Avatar src={EthereumIcon} />
              <Avatar src={SolanaIcon} />
              <Avatar src={USDTIcon} />
              <Avatar src={BitcoinIcon} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 w-full px-4 md:px-28">
        <div className="flex w-full flex-col items-center gap-5">
          <h1 className="text-center text-[60px] font-semibold leading-[60px] text-white">P2P</h1>
          <Label className="w-full max-w-md text-center text-xs text-light-periwinkle">
            Billions lost to CEX hacks and shutdowns. Joint lets you trade P2P with full control, security, and freedom.
          </Label>
        </div>
        <div className="mt-3 flex w-full justify-center">
          <div className="relative flex w-fit gap-[125px]">
            <div className="mt-14 flex h-fit flex-col gap-3 rounded-3xl bg-raisin-black p-2">
              <div className="bg-rich-black flex w-[128px] items-center gap-3 rounded-full p-2">
                <Avatar src={BitcoinIcon} className="h-[26px] w-[26px]" rootClassName="w-[26px] h-[26px]" />
                <Label className="text-xs font-light text-white">Bitcoin</Label>
              </div>
              <div className="bg-rich-black flex w-[128px] items-center gap-3 rounded-full p-2">
                <Avatar src={EthereumIcon} className="h-[26px] w-[26px]" rootClassName="w-[26px] h-[26px]" />
                <Label className="text-xs font-light text-white">Ethereum</Label>
              </div>
              <div className="bg-rich-black flex w-[128px] items-center gap-3 rounded-full p-2">
                <Avatar src={SolanaIcon} className="h-[26px] w-[26px]" rootClassName="w-[26px] h-[26px]" />
                <Label className="text-xs font-light text-white">Solana</Label>
              </div>
              <div className="bg-rich-black flex w-[128px] items-center gap-3 rounded-full p-2">
                <Avatar src={CardanoIcon} className="h-[26px] w-[26px]" rootClassName="w-[26px] h-[26px]" />
                <Label className="text-xs font-light text-white">Cardano</Label>
              </div>
            </div>

            <div className="mb-14 flex h-fit flex-col gap-3 rounded-3xl bg-raisin-black p-2">
              <div className="bg-rich-black flex w-[128px] items-center gap-3 rounded-full p-2">
                <Avatar src={USDTIcon} className="h-[26px] w-[26px]" rootClassName="w-[26px] h-[26px]" />
                <Label className="text-xs font-light text-white">USDT</Label>
              </div>
              <div className="bg-rich-black flex w-[128px] items-center gap-3 rounded-full p-2">
                <Avatar src={UKFlagIcon} className="h-[26px] w-[26px]" rootClassName="w-[26px] h-[26px]" />
                <Label className="text-xs font-light text-white">GBP</Label>
              </div>
              <div className="bg-rich-black flex w-[128px] items-center gap-3 rounded-full p-2">
                <Avatar src={NigeriaFlagIcon} className="h-[26px] w-[26px]" rootClassName="w-[26px] h-[26px]" />
                <Label className="text-xs font-light text-white">NGN</Label>
              </div>
              <div className="bg-rich-black flex w-[128px] items-center gap-3 rounded-full p-2">
                <Avatar src={USAFlagIcon} className="h-[26px] w-[26px]" rootClassName="w-[26px] h-[26px]" />
                <Label className="text-xs font-light text-white">USD</Label>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-between">
              <div className="h-[79px] w-full bg-gradient-to-b from-vampire-black/90 to-vampire-black/0"></div>
              <div className="custom-outline-rounded flex h-[53px] w-full items-center rounded-full justify-center">
                <div className="bg-[rgba(216,216,216,0.07)] h-5 w-16 flex justify-center items-center rounded-full border-[0.6px] border-charcoal">
                  <Label className="text-white text-xs font-light">P2P</Label>
                </div>
              </div>
              <div className="h-[79px] w-full bg-gradient-to-b from-vampire-black/0 to-vampire-black/90"></div>
            </div>
          </div>
        </div>
        <div className="mb-[61px] mt-[35px] flex justify-center">
          <Label className="w-full max-w-[250px] text-center text-xs text-cool-grey">
            Billions lost to CEX hacks and shutdowns. Joint lets you trade P2P with full control, security, and freedom.
          </Label>
        </div>
        <div className="mb-16 flex w-full justify-center">
          <div className="relative flex w-full md:w-fit flex-col gap-8 md:gap-[135px]">
            <div className="flex flex-col md:flex-row w-full md:w-fit gap-8 md:gap-[135px]">
              <div className="relative flex h-[435px] md:h-[335px] w-full  md:w-[225px] items-end overflow-hidden rounded-xl bg-chinese-black p-4 pr-6">
                <Label className="text-sm font-semibold leading-5 text-light-periwinkle">
                  Say goodbye to exchange hacks, frozen funds, and KYC traps.
                </Label>
                <img src={ArcPattern} alt="" className="absolute left-0 top-0 scale-y-[-1]" />
                <img src={ArcPattern} alt="" className="absolute bottom-0 right-0 scale-x-[-1]" />
                <img src={DroidPattern} alt="" className="absolute right-0 top-5 h-auto w-[98px]" />
              </div>
              <div className="relative flex h-[435px] md:h-[335px] w-full  md:w-[225px] items-end overflow-hidden rounded-xl bg-chinese-black pb-4 pl-8 pr-4">
                <Label className="text-sm font-semibold leading-5 text-light-periwinkle">
                  Say goodbye to exchange hacks, frozen funds, and KYC traps.
                </Label>
                <img src={ArcPattern} alt="" className="absolute right-0 top-0 scale-x-[-1] scale-y-[-1]" />
                <img src={ArcPattern} alt="" className="absolute bottom-0 left-0" />
                <img src={DroidPattern} alt="" className="absolute -left-3 top-5 h-auto w-[98px] scale-x-[-1]" />
              </div>
            </div>
            <div className="hidden absolute bottom-0 left-0 right-0 top-0 z-[1] md:flex items-center justify-center">
              <div className="relative h-[240px] w-[240px]">
                <img src={JointXPattern} alt="" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row w-full md:w-fit gap-8 md:gap-[135px]">
              <div className="relative flex h-[435px] md:h-[335px] w-full  md:w-[225px] items-end overflow-hidden rounded-xl bg-chinese-black p-4 pr-6">
                <Label className="text-sm font-semibold leading-5 text-light-periwinkle">
                  Say goodbye to exchange hacks, frozen funds, and KYC traps.
                </Label>
                <img src={ArcPattern} alt="" className="absolute left-0 top-0 scale-x-[-1] scale-y-[-1]" />
                <img src={ArcPattern} alt="" className="absolute bottom-0 right-0" />
                <img src={DroidPattern} alt="" className="absolute right-0 top-10 h-auto w-[98px]" />
              </div>
              <div className="relative flex h-[435px] md:h-[335px] w-full  md:w-[225px] items-end overflow-hidden rounded-xl bg-chinese-black pb-4 pl-8 pr-4">
                <Label className="text-sm font-semibold leading-5 text-light-periwinkle">
                  Say goodbye to exchange hacks, frozen funds, and KYC traps.
                </Label>
                <img src={ArcPattern} alt="" className="absolute right-0 top-0 scale-y-[-1]" />
                <img src={ArcPattern} alt="" className="absolute bottom-0 left-0 scale-x-[-1]" />
                <img src={DroidPattern} alt="" className="absolute -left-3 top-10 h-auto w-[98px] scale-x-[-1]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}
