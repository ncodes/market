import { Button } from "@/components/ui/button.tsx";
import { XIcon } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";

export function SwapDrawerAdvanceSettings({ closeRequested }: { closeRequested?: () => void }) {
  return (
    <div className="max-w-[650px] rounded-3xl p-4">
      <h2 className="mb-4 flex items-center justify-between font-medium tracking-wider text-white">
        <span>Advance Settings</span>
        <span>
          <Button
            variant="ghost"
            className="h-auto p-0"
            onClick={() => {
              closeRequested?.();
            }}
          >
            <XIcon className="h-5 w-5 cursor-pointer text-white opacity-30 transition-all duration-300 hover:opacity-100" />
          </Button>
        </span>
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-light text-boulder">Set slippage</label>
          <div className="flex items-center space-x-2">
            <Button className="rounded-lg bg-byzantine-blue text-white">0.5%</Button>
            <Button className="rounded-lg bg-gray-700/90 text-white hover:bg-gray-700">1%</Button>
            <span>
              <Input
                type="number"
                className="w-24 rounded-md border-none bg-gray-700/90 px-2 py-2.5 text-white outline-0 focus-visible:bg-gray-700"
                placeholder="1.5"
              />
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="font-light text-boulder">Swap Expires after</label>
          <div className="flex items-center space-x-2">
            <Button className="rounded-lg bg-byzantine-blue text-white">30m</Button>
            <Button className="rounded-lg bg-gray-700/90 text-white hover:bg-gray-700">1h</Button>
            <span>
              <Input
                type="number"
                className="w-24 rounded-md border-none bg-gray-700/90 px-2 py-2.5 text-white outline-0 focus-visible:bg-gray-700"
                placeholder="300s"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Button variant="secondary" className="h-auto w-full py-4 text-xl font-medium text-black">
          Update
        </Button>
      </div>
    </div>
  );
}
