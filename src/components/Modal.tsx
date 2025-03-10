import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useMediaQuery } from "usehooks-ts";

interface ModalProps {
  open?: boolean;
  triggerComponent?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  content?: React.ReactNode;
}

export default function Modal({ open, triggerComponent, onOpenChange, content }: ModalProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return (
      <Dialog open={open} modal={true} onOpenChange={onOpenChange}>
        {triggerComponent && <DialogTrigger>{triggerComponent}</DialogTrigger>}
        <DialogContent className="border-none bg-transparent px-0 py-0" hideCloseButton>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {triggerComponent && <SheetTrigger>{triggerComponent}</SheetTrigger>}
      <SheetContent
        className="h-fit max-h-[90vh] w-full rounded-b-none rounded-t-3xl border border-raisin-black bg-chinese-black p-0 font-poppins"
        hideCloseButton
        side="bottom"
      >
        {content}
      </SheetContent>
    </Sheet>
  );
}