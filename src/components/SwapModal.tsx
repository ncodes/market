import Modal from "./Modal";
import Swap from "./Swap";
import { Button } from "./ui/button";

export default function SwapModal() {
  return (
    <Modal
      triggerClassName="w-full"
      triggerComponent={
        <Button
          variant={"secondary"}
          className="w-full max-w-[400px] bg-white py-2 text-lg font-semibold text-gunmetal"
        >
          Swap
        </Button>
      }
      content={<Swap showEmbeddedButton />}
    />
  );
}
