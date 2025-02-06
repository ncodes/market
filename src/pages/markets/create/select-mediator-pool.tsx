import IconDropDown from "@/components/icons/IconDropDown";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useState } from "react";

export default function SelectMediatorPool() {
  const [selectedValue, setSelectedValue] = useState<string>();

  return (
    <Select onValueChange={(value) => setSelectedValue(value)}>
      <SelectTrigger
        hideCaret
        className="w-fit border-none p-0 outline-none focus:ring-0 active:border-none active:outline-none"
      >
        <Button className="bg-black-coral/20 hover:bg-black-coral/30">
          {selectedValue ?? "Select"} <IconDropDown />
        </Button>
      </SelectTrigger>
      <SelectContent className="bg-chinese-black border-eerie-black">
        {[1, 2, 3, 4, 5].map((item) => (
          <SelectItem
            className="hover:!bg-june-bud active:!bg-june-bud data-[state=checked]:!bg-june-bud data-[state=unchecked]:!bg-transparent data-[state=unchecked]:!text-white"
            key={item}
            value={`Mediator Pool ${item}`}
          >{`Mediator Pool ${item}`}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
