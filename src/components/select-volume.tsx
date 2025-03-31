import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/libs/utils";

export default function SelectVolume({text, className}: {text?: string, className?: string}) {
    return (
      <Select>
        <SelectTrigger
          hideCaret
          className="w-fit border-none p-0 outline-none focus:ring-0 active:border-none active:outline-none"
          asChild
        >
          <Button
            variant={"ghost"}
            className={cn("flex items-center font-light text-cool-grey hover:bg-transparent hover:text-cool-grey px-0", className)}
          >
            {text ?? "Volume"} <ChevronDown className="ml-1 h-5 w-5" />
          </Button>
        </SelectTrigger>
        <SelectContent className="border-eerie-black bg-chinese-black">
          {[1, 2, 3, 4, 5].map((item) => (
            <SelectItem
              className="cursor-pointer data-[state=checked]:!bg-eerie-black data-[state=unchecked]:!bg-transparent data-[state=checked]:!text-white data-[state=unchecked]:!text-cool-grey hover:!bg-eerie-black active:!bg-eerie-black"
              key={item}
              value={`Volume ${item}`}
            >{`Volume ${item}`}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }