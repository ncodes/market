import { cn } from "@/libs/utils";

export default function AssetAmountInput({ className }: { className?: string }) {
    return (
      <div className="mt-2">
        <input
          type="number"
          className={cn(
            "h-[40px] w-full bg-transparent p-0 font-dosis text-5xl text-white outline-none placeholder:text-5xl placeholder:text-gray-400",
            className,
          )}
          placeholder="0.00"
        />
      </div>
    );
  }