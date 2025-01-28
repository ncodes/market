import { ToolTip } from "@/components/ToolTip";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "../libs/utils";

export function ConfirmDialog({
  tip,
  title,
  description,
  children,
  confirmBtnText,
  cancelBtnText,
  portalContainer,
  contentClassName,
  triggerClassName,
  confirmBtnClassName,
  cancelBtnClassName,
  cancelBtnVariant = "secondary",
  confirmBtnVariant = "destructive",
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: {
  tip: string;
  title: string;
  description: string;
  children: React.ReactNode;
  confirmBtnText?: string;
  cancelBtnText?: string;
  contentClassName?: string;
  triggerClassName?: string;
  confirmBtnClassName?: string;
  cancelBtnClassName?: string;
  cancelBtnVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  confirmBtnVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  portalContainer?: HTMLElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}) {
  const content = (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className={cn("flex", triggerClassName)} asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        container={portalContainer}
        className={cn("w-[350px] border-boulder/10 bg-eerie-black p-3 text-gray-100", contentClassName)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-gray-400">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button type="button" variant={cancelBtnVariant} onClick={onCancel} className={cn(cancelBtnClassName)}>
              {cancelBtnText}
            </Button>
          </DialogClose>
          <Button type="button" variant={confirmBtnVariant} onClick={onConfirm} className={cn(confirmBtnClassName)}>
            {confirmBtnText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (tip) {
    return <ToolTip tip={tip}>{content}</ToolTip>;
  } else {
    return content;
  }
}
