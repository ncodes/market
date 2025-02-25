import InfoLabel from "@/components/InfoLabel";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ChevronRight, XIcon } from "lucide-react";
import { useState } from "react";

export default function UpdateCommision() {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <Dialog modal={true} open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger>
        <Button
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
        >
          Update Commission
          <ChevronRight className="text-cool-grey group-hover:text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[360px] border-none bg-transparent p-0 tracking-wide transition-all duration-300"
        hideCloseButton
      >
        <div className="flex w-full flex-col gap-2">
          <div className="rounded-3xl border border-gunmetal bg-chinese-black">
            <div className="flex w-full justify-between border-b border-gunmetal/40 px-5 py-3">
              <Label className="text-2xl font-semibold text-lotion">
                {isSubmitted ? "Confirm" : "Update Commission"}
              </Label>
              <Button
                onClick={() => setOpen(false)}
                variant="ghost"
                className="reset-btn text-gray-600 hover:bg-transparent hover:text-gray-100"
              >
                <XIcon className="size-5" />
              </Button>
            </div>
            {!isSubmitted && (
              <div className="mb-8 flex flex-col gap-2 px-5 py-[14px] pb-0">
                <InfoLabel text="Commission" info="Commission" />
                <Input suffix="%" className="text-white" />
              </div>
            )}
            {isSubmitted && (
              <div className="mb-8 flex gap-[30px] px-5 py-[14px] pb-0">
                <div className="flex w-full flex-col gap-2">
                  <Label className="text-sm font-light text-cool-grey">Old Commission</Label>
                  <Input className="text-cool-grey" value={"20%"} type="text" />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Label className="text-sm font-light text-white">New Commission</Label>
                  <Input className="text-white" value={"20%"} type="text" />
                </div>
              </div>
            )}
          </div>
          <Button
            variant={"secondary"}
            className="h-12 text-lg font-semibold text-gunmetal"
            onClick={isSubmitted ? () => setOpen(false) : () => setSubmitted(true)}
          >
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
