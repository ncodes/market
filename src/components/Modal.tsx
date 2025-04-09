import { cn } from "@/libs/utils";
import { VisuallyHidden } from "radix-ui";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface ModalProps {
  open?: boolean;
  triggerComponent?: React.ReactNode;
  triggerClassName?: string;
  onOpenChange?: (open: boolean) => void;
  content?: React.ReactNode;
  desktopClassName?: string;
  title?: string;
}

export default function Modal({
  open,
  triggerComponent,
  onOpenChange,
  content,
  triggerClassName,
  desktopClassName,
  title,
}: ModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} modal={true} onOpenChange={onOpenChange}>
        {triggerComponent && (
          <DialogTrigger asChild className={triggerClassName}>
            {triggerComponent}
          </DialogTrigger>
        )}
        <VisuallyHidden.Root asChild>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden.Root>
        <DialogContent
          className={cn("border-none bg-transparent px-0 py-0 xl:top-1/3", desktopClassName)}
          hideCloseButton
        >
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
