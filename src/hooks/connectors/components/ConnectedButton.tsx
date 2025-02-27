import TabHead from "@/components/TabHead.tsx";
import EmojiAvatar from "@/components/avatar/EmojiAvatar";
import { AvatarSize } from "@/components/avatar/useAvatar";
import IconArrowRight from "@/components/icons/IconArrowRight.tsx";
import IconBought from "@/components/icons/IconBought.tsx";
import IconConnectedLink from "@/components/icons/IconConnectedLink.tsx";
import IconMinus from "@/components/icons/IconMinus.tsx";
import IconPlus from "@/components/icons/IconPlus.tsx";
import IconSold from "@/components/icons/IconSold.tsx";
import IconUpdatedMarket from "@/components/icons/IconUpdatedMarket.tsx";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs.tsx";
import { transactions } from "@/libs/data.ts";
import { shortenAddress, shortenAddress2 } from "@/libs/helpers.ts";
import { cn } from "@/libs/utils.ts";
import { TransactionType } from "@/libs/wallets.ts";
import { CheckIcon, ChevronDown, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "../../useSession.ts";
import { useConnectorContext } from "../useConnectorContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog.tsx";

export const ConnectedButton = ({
  className,
  noSessionCreation,
}: {
  openWalletModal?: () => void;
  className?: string;
  noSessionCreation?: boolean;
}) => {
  const { address, ready } = useConnectorContext();
  const { token } = useSession();
  const [openSheet, setOpenSheet] = useState(false);

  // const { setUser } = useStore((state) => ({ setUser: state.setUser }));
  // const { createSessionFromWallet } = useAuthService();
  // const queryClient = useQueryClient();
  // const createSessionMut = useMutation({
  // mutationFn: createSessionFromWallet,
  // });

  useEffect(() => {
    if (!ready || token || noSessionCreation) return;

    const createSession = async () => {
      // const msg = createSignatureMessage(address, "", "24 hours");
      // const sig = await sign(msg.toString("utf-8"));
      // console.log("Msg", "0x" + msg.toString("hex"));
      // console.log("Sig", sig);
      // try {
      //   const resp = await createSessionMut.mutateAsync({
      //     walletAddress: address,
      //     msg: "0x" + msg.toString("hex"),
      //     signedMsg: sig,
      //   });
      //   setUser(resp.user);
      //   setAccessToken(address, resp.token);
      //   queryClient.refetchQueries({ queryKey: ["getVideo", "getClip"] });
      // } catch (error) {
      //   logError(error);
      //   toast.error("Unable to create session");
      // }
    };

    void createSession();
  }, [ready, token]);

  return (
    <Sheet open={openSheet} onOpenChange={(open) => setOpenSheet(open)}>
      <SheetTrigger>
        {" "}
        <Button
          variant={"ghost"}
          className={cn(
            "flex h-auto min-w-[150px] items-center justify-between gap-1 rounded-full bg-card bg-chinese-black px-2 py-1 pl-[2px] transition-all duration-500 hover:scale-x-[1.02] hover:bg-eerie-black [&>*]:cursor-pointer",
            className,
          )}
          onClick={() => {}}
        >
          <div className="pl-1">
            <EmojiAvatar size={AvatarSize.Small} randomStr={address as string} />
          </div>
          <p className={cn("text font-poppins text-sm font-normal tracking-wider text-gray-100 lg:inline-block", {})}>
            <>
              <span className="hidden lg:inline-block">{shortenAddress(address as string)}</span>
              <span className="lg:hidden">{shortenAddress2(address as string)}</span>
            </>
          </p>
        </Button>
      </SheetTrigger>
      <SheetContent
        hideCloseButton
        className="mr-6 mt-4 h-[97%] w-[382px] overflow-hidden rounded-3xl border-none bg-chinese-black p-0"
      >
        <div className="flex h-full w-full flex-col">
          <div className="flex items-center justify-between px-4 py-4">
            <EmojiAvatar size={AvatarSize.Medium} randomStr="joint" />
            <div className="flex items-center gap-12 rounded-3xl bg-raisin-black px-[14px] py-2">
              <Label className="text-sm font-light tracking-wider text-gray-300">0x121292JAK28NK</Label>
              <DisconnectWallet />
            </div>
            <Button
              onClick={() => setOpenSheet(false)}
              variant="ghost"
              className="reset-btn text-gray-600 hover:bg-transparent hover:text-gray-100"
            >
              <XIcon className="size-8" />
            </Button>
          </div>
          <Tabs defaultValue="balance" className="w-full">
            <TabsList className="flex w-full justify-between border-b border-eerie-black/50 bg-transparent px-4 py-0">
              <div className="flex justify-start gap-6">
                <TabHead value="balance" title="Balance" />
                <TabHead value="eth" title="ETH" />
                <TabHead value="join" title="$JOIN" />
              </div>
            </TabsList>
            <TabsContent value="balance" className="m-0 w-full">
              <div className="flex w-full flex-col">
                <div className="w-full border-b border-eerie-black px-4 py-5">
                  <Label className="font-dosis text-[32px] font-semibold leading-none text-white">$6000.00</Label>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="eth" className="m-0 w-full">
              <div className="flex w-full flex-col">
                <div className="w-full border-b border-eerie-black px-4 py-5">
                  <Label className="font-dosis text-[32px] font-semibold leading-none text-white">6000 ETH</Label>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="join" className="m-0 w-full">
              <div className="flex w-full flex-col">
                <div className="w-full border-b border-eerie-black px-4 py-5">
                  <Label className="font-dosis text-[32px] font-semibold leading-none text-white">6000 $JOIN</Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <div className="h-auto w-full overflow-hidden">
            <div className="flex w-full items-center gap-2 px-4 py-3">
              <Label className="font-semibold text-cool-grey">Activity</Label>
              <TypesButton />
            </div>
            <div className="flex h-[100%] w-full flex-col gap-2 overflow-auto">
              <Label className="ml-4 text-sm font-light text-white">Today</Label>
              <div className="flex w-full flex-col">
                {transactions.map((transaction, index) => (
                  <div className="group w-full">
                    <div
                      className="flex w-full cursor-pointer items-start gap-2 bg-gradient-to-r px-4 py-2 group-hover:from-eerie-black group-hover:to-chinese-black"
                      key={index}
                    >
                      <div
                        className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", {
                          "bg-[#ff5c5c23]": transaction.type.toLowerCase() === TransactionType.SOLD,
                          "bg-[#c8ed5a18]": transaction.type.toLowerCase() === TransactionType.BOUGHT,
                          "bg-[#28293d]":
                            transaction.type.toLowerCase() === TransactionType.ADDED_LIQUIDITY ||
                            transaction.type.toLowerCase() === TransactionType.REMOVED_LIQUITY ||
                            transaction.type.toLowerCase() === TransactionType.UPDATED_MARKET,
                        })}
                      >
                        {transaction.type.toLowerCase() === TransactionType.SOLD && <IconSold />}
                        {transaction.type.toLowerCase() === TransactionType.ADDED_LIQUIDITY && <IconPlus />}
                        {transaction.type.toLowerCase() === TransactionType.BOUGHT && <IconBought />}
                        {transaction.type.toLowerCase() === TransactionType.REMOVED_LIQUITY && <IconMinus />}
                        {transaction.type.toLowerCase() === TransactionType.UPDATED_MARKET && <IconUpdatedMarket />}
                      </div>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col">
                          <Label className="cursor-pointer text-sm font-normal tracking-wide text-gray-200">
                            {transaction.type}
                          </Label>
                          <Label className="cursor-pointer text-xs font-light tracking-wide text-cool-grey">
                            {transaction.content}
                          </Label>
                        </div>
                        <IconArrowRight className="hidden group-hover:block" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

function TypesButton() {
  const [open, setOpen] = useState(false);
  const types = ["All", "Buy", "Sell", "Add Liquidity", "Remove Liquidity", "Updated Market"];
  const [selectedType, setSelectedType] = useState("All");

  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger>
        <Button
          className={cn("flex h-[30px] items-center bg-transparent px-3 py-0 hover:bg-eerie-black", {
            "bg-eerie-black": open,
          })}
        >
          {selectedType} <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className="w-[180px] rounded-2xl border-gunmetal/50 bg-chinese-black p-0 px-1 py-1"
      >
        {types.map((type) => (
          <Button
            onClick={() => setSelectedType(type)}
            variant={"ghost"}
            className="h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
          >
            {type}
            <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm bg-[#282943] p-0">
              {selectedType === type && <CheckIcon className="text-white" />}
            </div>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function DisconnectWallet() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog modal={true} open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger>
        <Button
          variant={"ghost"}
          className="m-0 h-6 w-6 bg-transparent p-0 transition-transform duration-200 hover:scale-125 hover:bg-transparent"
        >
          <IconConnectedLink />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[401px] border-none bg-transparent p-0 tracking-wide transition-all duration-300"
        hideCloseButton
      >
        <div className="flex w-full flex-col gap-2">
          <div className="rounded-3xl border border-gunmetal bg-chinese-black">
            <div className="flex w-full justify-between border-b border-gunmetal/40 px-5 py-3">
              <Label className="text-2xl font-semibold text-lotion">Disconnect Wallet</Label>
              <Button
                onClick={() => setOpen(false)}
                variant="ghost"
                className="reset-btn text-gray-600 hover:bg-transparent hover:text-gray-100"
              >
                <XIcon className="size-5" />
              </Button>
            </div>
            <div className="mb-6 px-5 py-4 pb-0">
              <Label className="text-sm font-light text-cool-grey">
                Are you sure you want to disconnect your wallet?
              </Label>
            </div>
          </div>
          <Button
            variant={"secondary"}
            className="h-12 bg-sunset-orange text-lg font-semibold text-white hover:bg-sunset-orange/70"
            onClick={() => setOpen(false)}
          >
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
