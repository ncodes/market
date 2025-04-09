import { useState } from "react";
import CloseIcon from "./close-icon";
import Modal from "./modal";
import Swap from "./swap";
import { Button } from "./ui/button";

export default function SwapModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      onOpenChange={(open) => setOpen(open)}
      triggerClassName="w-full z-50"
      triggerComponent={
        <Button
          variant={"secondary"}
          className="w-full max-w-[400px] bg-white py-2 text-lg font-semibold text-gunmetal"
        >
          Swap
        </Button>
      }
      content={<Swap showEmbeddedButton closeButton={<CloseIcon setOpen={setOpen} />} />}
    />
  );
}
