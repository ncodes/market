import { XIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function CloseIcon({ setOpen, onClick }: { setOpen?: (open: boolean) => void; onClick?: () => void }) {
  return (
    <Button
      variant="ghost"
      className="flex h-auto w-auto shrink-0 items-center justify-center bg-cool-grey/20 p-1.5 text-cool-grey opacity-50 hover:bg-gray-700 hover:text-gray-100 hover:opacity-100"
      onClick={() => {
        setOpen?.(false);
        onClick?.();
      }}
    >
      <XIcon className="h-5 w-5" />
    </Button>
  );
}
