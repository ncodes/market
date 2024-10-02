import { ToolTip } from "@/components/toolTip";
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

export function ConfirmDialog({
  tip,
  title,
  description,
  children,
  confirmBtnText,
  cancelBtnText,
  portalContainer,
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
  portalContainer?: HTMLElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}) {
  return (
    <ToolTip tip={tip}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger className="flex">{children}</DialogTrigger>
        <DialogContent
          container={portalContainer}
          className="w-[350px] border-boulder/10 bg-eerie-black p-3 text-gray-100"
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={onCancel}>
                {cancelBtnText || "Cancel"}
              </Button>
            </DialogClose>
            <Button type="button" variant="destructive" onClick={onConfirm}>
              {confirmBtnText || "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ToolTip>
  );
}
