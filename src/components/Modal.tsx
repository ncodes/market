import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/libs/utils";

interface ModalProps {
  open?: boolean;
  triggerComponent?: React.ReactNode;
  triggerClassName?: string;
  onOpenChange?: (open: boolean) => void;
  content?: React.ReactNode;
  desktopClassName?: string;
}

export default function Modal({
  open,
  triggerComponent,
  onOpenChange,
  content,
  triggerClassName,
  desktopClassName,
}: ModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} modal={true} onOpenChange={onOpenChange}>
        {triggerComponent && <DialogTrigger className={triggerClassName}>{triggerComponent}</DialogTrigger>}
        <DialogContent className={cn("border-none bg-transparent px-0 py-0", desktopClassName)} hideCloseButton>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {triggerComponent && <SheetTrigger className={triggerClassName}>{triggerComponent}</SheetTrigger>}
      <SheetContent className="h-fit max-h-[90vh] w-full border-none p-0 font-poppins" hideCloseButton side="bottom">
        {content}
      </SheetContent>
    </Sheet>
  );
}
