import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface ModalProps {
  open?: boolean;
  triggerComponent?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  content?: React.ReactNode;
}
export default function Modal({ open, triggerComponent, onOpenChange, content }: ModalProps) {
  return (
    <>
      <div className="hidden w-full lg:block">
        <Dialog open={open} modal={true} onOpenChange={onOpenChange}>
          {triggerComponent && <DialogTrigger>{triggerComponent}</DialogTrigger>}
          <DialogContent className="bg-transparent px-0 py-0" hideCloseButton>
            {content}
          </DialogContent>
        </Dialog>
      </div>
      <div className="block w-full lg:hidden">
        <Sheet open={open} onOpenChange={onOpenChange}>
          {triggerComponent && <SheetTrigger>{triggerComponent}</SheetTrigger>}
          <SheetContent
            className="max-h-[90vh] w-full rounded-b-none rounded-t-3xl border border-raisin-black bg-chinese-black p-0 font-poppins"
            hideCloseButton
            side={"bottom"}
          >
            {content}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
