import { cn } from "@/libs/utils";
import { TabsTrigger } from "./ui/tabs";

export default function TabHead({ value, title, className }: { value: string; title: string; className?: string }) {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        "flex items-center gap-1 p-0 text-base font-semibold text-black-coral transition-all duration-300 data-[state=active]:bg-transparent data-[state=active]:text-white hover:text-white",
        className,
      )}
    >
      {title}
    </TabsTrigger>
  );
}
