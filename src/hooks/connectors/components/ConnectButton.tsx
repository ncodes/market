import { Button } from "@/components/ui/button";
import IconWallet from "@/components/icons/IconWallet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import IconClose from "@/components/icons/IconClose";
import { useState } from "react";

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
      <PopoverContent className="w-max border border-gray-800 bg-gray-900">
        <div className="">
          <div className="flex gap-32">
            <Label className="text-2xl font-bold text-gray-50">Connect Wallet</Label>
            <div
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gray-800"
              onClick={() => setOpen(false)}
            >
              <IconClose />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
