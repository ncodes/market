import CloseIcon from "@/components/close-icon";
import InfoLabel from "@/components/info-label";
import Input from "@/components/input";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function UpdateCommision() {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <Modal
      open={open}
      onOpenChange={(open) => setOpen(open)}
      triggerComponent={
        <Button
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
        >
          Update Commission
          <ChevronRight className="text-cool-grey group-hover:text-white" />
        </Button>
      }
      content={
        <div className="flex w-full flex-col gap-2">
          <div className="rounded-b-none rounded-t-3xl border border-gunmetal bg-chinese-black md:rounded-b-3xl">
            <div className="flex w-full justify-between border-b border-gunmetal/40 px-5 py-3">
              <Label className="text-base font-semibold text-lotion lg:text-2xl">
                {isSubmitted ? "Confirm" : "Update Commission"}
              </Label>
              <CloseIcon setOpen={setOpen} />
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
                  <Input className="text-cool-grey" defaultValue={"20%"} type="text" />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Label className="text-sm font-light text-white">New Commission</Label>
                  <Input className="text-white" defaultValue={"20%"} type="text" />
                </div>
              </div>
            )}

            <div className="flex px-5 pb-3 lg:hidden">
              <Button
                variant={"secondary"}
                className="h-12 w-full text-lg font-semibold text-gunmetal"
                onClick={isSubmitted ? () => setOpen(false) : () => setSubmitted(true)}
              >
                Update
              </Button>
            </div>
          </div>
          <Button
            variant={"secondary"}
            className="hidden h-12 text-lg font-semibold text-gunmetal lg:flex"
            onClick={isSubmitted ? () => setOpen(false) : () => setSubmitted(true)}
          >
            Update
          </Button>
        </div>
      }
    />
  );
}
