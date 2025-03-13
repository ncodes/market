import { XIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function CloseIcon({ setOpen }: { setOpen: (open: boolean) => void }) {
  return (
    <Button
      variant="ghost"
      className="flex h-auto w-auto items-center justify-center bg-gray-800 p-1 text-gray-400 opacity-50 hover:bg-gray-700 hover:text-gray-100 hover:opacity-100"
      onClick={() => setOpen(false)}
    >
      <XIcon className="h-5 w-5" />
    </Button>
  );
}
