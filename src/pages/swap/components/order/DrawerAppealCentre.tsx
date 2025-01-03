import { Button } from "@/components/ui/button.tsx";
import { motion } from "framer-motion";
import { AlertCircle, SendIcon, UploadIcon, XIcon } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import EmojiAvatar from "../../../../components/avatar/EmojiAvatar";
import { AvatarSize } from "../../../../components/avatar/useAvatar";
import { Input } from "../../../../components/ui/input";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";
import useStore from "../../../../hooks/store/useStore";
import { humanizeBytes } from "../../../../libs/helpers";
import { cn } from "../../../../libs/utils";
import { SwapOrderState } from "./useSwapOrderLogic";

type Participant = {
  name: string;
  address: string;
  isRouter: boolean;
};

const defaultState: {
  selectedParticipant: Participant | undefined;
  files: File[];
  fileHashes: string[];
} = {
  selectedParticipant: undefined,
  files: [],
  fileHashes: [],
};

export function DrawerAppealCentre({
  closeRequested,
  containerHeight,
  order,
}: {
  containerHeight?: number;
  drawerRef: React.RefObject<HTMLDivElement>;
  swapOrderState: SwapOrderState;
  order: Swap;
  closeRequested?: () => void;
}) {
  const user = useStore((state) => state.user);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState({
    ...defaultState,
    selectedParticipant: { address: order.taker, isRouter: false, name: "Seller" },
  });

  const routers = getRouters(order).map((router) => ({
    name: router.name,
    address: router.address,
    isRouter: true,
  }));

  let participants: Participant[] = [];

  if (user?.isDelegate) {
    participants = [
      { name: "Seller", address: order.taker, isRouter: false },
      { name: "Buyer", address: order.provider, isRouter: false },
      ...routers,
    ];
  }

  function handleParticipantClick(name: string, address: string, isRouter: boolean) {
    setState({ ...state, selectedParticipant: { address, isRouter, name } });
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!fileInputRef.current) return;
    if (!e.target.files) return;

    // Each files cannot be more that 10MB in size
    for (const file of e.target.files) {
      const max = import.meta.env.VITE_FILE_UPLOAD_MAX_SIZE;
      if (file.size > parseInt(max)) {
        toast.error(`File too large (max: ${humanizeBytes(max)})`);
        fileInputRef.current.value = "";
        return;
      }
    }

    setState({ ...state, files: [...state.files, ...Array.from(e.target.files)] });

    fileInputRef.current.value = "";
  }

  return (
    <motion.div
      className="m-0 flex min-h-[500px] max-w-[650px] flex-col rounded-3xl py-4 pb-0 pt-2"
      animate={{ height: "auto" }}
    >
      <h2 className="mb-2 flex items-center justify-between px-4 font-medium tracking-wider text-white">
        <span className="relative">Appeal Centre</span>
        <span className="flex items-center gap-2">
          <span>
            <Button
              variant="link"
              className="h-auto p-0 hover:bg-transparent"
              onClick={() => {
                closeRequested?.();
              }}
            >
              <XIcon className="h-5 w-5 cursor-pointer text-white opacity-30 transition-all duration-300 hover:opacity-100" />
            </Button>
          </span>
        </span>
      </h2>

      {!user?.isDelegate && (
        <div className="mx-4 mb-2">
          <div className="flex items-center gap-2 rounded-3xl border-0 bg-yellow-500/20 p-2 tracking-wide text-yellow-400">
            <AlertCircle className="h-5 w-5 !text-yellow-400" />
            <span className="text-xs font-light tracking-wider">
              Messages will be visible to only our mediators who will arbitrate the dispute.
            </span>
          </div>
        </div>
      )}

      <div
        className="flex h-full w-full flex-1 flex-col overflow-auto p-3 px-3 pt-0"
        style={{ maxHeight: containerHeight }}
      >
        <div className="flex items-center gap-2 px-2 text-sm font-light tracking-wide text-gray-300">
          <ScrollArea type="scroll" className="flex w-full gap-2 overflow-x-auto">
            <div className="flex gap-2">
              {participants.map((participant) => (
                <Participant
                  key={participant.address}
                  name={participant.name}
                  address={participant.address}
                  isRouter={participant.isRouter}
                  onClick={handleParticipantClick}
                  selected={
                    state.selectedParticipant?.address === participant.address &&
                    state.selectedParticipant?.isRouter === participant.isRouter
                  }
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </div>
        <div className="flex h-full flex-1 gap-2">
          <div className="flex flex-1 flex-col">
            <div className="flex h-full w-full flex-col gap-2 rounded-xl bg-baltic-sea/50 p-3">
              <Message
                received={false}
                senderAddress="0x123"
                message="I paid for the order but did not get confirmation Seller Seller Seller Seller Seller Seller Seller Seller"
              />
              <Message
                received={true}
                senderAddress="0x554"
                message="I paid for the order but did not get confirmation Seller Seller Seller Seller Seller Seller Seller Seller"
              />
            </div>
          </div>
        </div>
        <div className="mt-3 flex rounded-xl bg-baltic-sea/50">
          <div className="flex flex-1 flex-col">
            {/* <Textarea placeholder="Type your message here." className="resize-none ring-0 focus-visible:ring-0" /> */}
            <TextareaAutosize
              maxRows={5}
              placeholder="Type your message here."
              className="border-input flex w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm ring-0 transition-all duration-300 placeholder:text-muted-foreground focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/png, image/jpeg, image/jpg, video/mp4, video/quicktime, video/wmv"
              onChange={handleFileChange}
              disabled={isSending}
            />
            <div className="flex justify-between p-2">
              <Button
                variant="ghost"
                className="h-auto rounded-lg bg-baltic-sea/80 p-2 text-gray-400 hover:bg-baltic-sea hover:text-gray-300"
              >
                <UploadIcon className="h-5 w-5" />
              </Button>
              <Button variant="default" className="h-auto rounded-lg p-2">
                <SendIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Participant({
  name,
  address,
  selected,
  isRouter,
  onClick,
}: {
  name: string;
  address: string;
  selected?: boolean;
  isRouter?: boolean;
  onClick?: (name: string, address: string, isRouter: boolean) => void;
}) {
  return (
    <Button
      variant="ghost"
      className="h-auto rounded-none p-0 hover:bg-transparent hover:text-white"
      onClick={() => {
        onClick?.(name, address, isRouter ?? false);
      }}
    >
      <span
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-t-xl p-2 px-2 text-xs transition-all duration-300",
          selected ? "bg-baltic-sea/50" : "hover:scale-105 hover:bg-baltic-sea/50",
        )}
      >
        <EmojiAvatar className="rounded-md" randomStr={address} size={AvatarSize.Micro} />
        <span>{name}</span>
      </span>
    </Button>
  );
}

function Message({ senderAddress, message, received }: { senderAddress: string; message: string; received: boolean }) {
  const avatar = (
    <div className="pt-2">
      <EmojiAvatar className="rounded-lg" randomStr={senderAddress} size={AvatarSize.Small} />
    </div>
  );

  return (
    <div className="flex gap-2">
      {received ? avatar : null}
      <div className="flex flex-col rounded-xl bg-baltic-sea px-3 py-2">
        <div className="flex items-center gap-1 leading-[0]">
          <span className="text-xs text-gray-400">Seller</span>
          <span className="text-xs text-gray-500">{senderAddress}</span>
        </div>
        <div className="text-xs leading-snug text-gray-100">{message}</div>
      </div>
      {received ? null : avatar}
    </div>
  );
}

function getRouters(order: Swap) {
  const routers = order.payRouterRequest.routes || [];
  return routers.map((router, index) => {
    return {
      name: `Router #${index}`,
      address: router.owner,
    };
  });
}
