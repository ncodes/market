import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { cn } from "@/libs/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

export default function SelectDayVolume({ text, className }: { text?: string; className?: string }) {
  return (
    <Select>
      <SelectTrigger
        className="w-fit border-none p-0 outline-none focus:ring-0 active:border-none active:outline-none"
        asChild
      >
        <Button
          variant={"ghost"}
          className={cn(
            "flex items-center px-0 font-light text-cool-grey hover:bg-transparent hover:text-cool-grey",
            className,
          )}
        >
          {text ?? "Volume"} <ChevronDown className="ml-1 h-5 w-5" />
        </Button>
      </SelectTrigger>
      <SelectContent className="border-eerie-black bg-chinese-black">
        {[1, 2, 3, 4, 5].map((item) => (
          <SelectItem
            className="cursor-pointer data-[state=checked]:!bg-eerie-black data-[state=unchecked]:!bg-transparent data-[state=checked]:!text-white data-[state=unchecked]:!text-cool-grey hover:!bg-eerie-black active:!bg-eerie-black"
            key={item}
            value={`${item} Day Volume`}
          >{`${item} Day Volume`}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
