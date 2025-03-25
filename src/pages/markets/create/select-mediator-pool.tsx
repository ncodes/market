import IconDropDown from "@/components/icons/IconDropDown";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import useStore from "@/hooks/store/useStore";
import { useState } from "react";
import { MediatorPools } from "@jointlabs/meta";

export default function SelectMediatorPool({
  onMediatorPoolSelected,
}: {
  onMediatorPoolSelected?: (value: MediatorPool) => void;
}) {
  const [selectedValue, setSelectedValue] = useState<string>();
  const { selectedChain } = useStore();

  return (
    <Select
      onValueChange={(value) => {
        setSelectedValue(value);
        onMediatorPoolSelected?.(MediatorPools[selectedChain.queryName]![Number(value)]);
      }}
    >
      <SelectTrigger
        hideCaret
        className="w-fit border-none p-0 outline-none focus:ring-0 active:border-none active:outline-none"
      >
        <Button className="bg-black-coral/20 hover:bg-black-coral/30">
          {selectedValue && MediatorPools[selectedChain.queryName]
            ? MediatorPools[selectedChain.queryName]![Number(selectedValue)].name
            : "Select"}{" "}
          <IconDropDown />
        </Button>
      </SelectTrigger>
      <SelectContent className="border-eerie-black bg-chinese-black">
        {MediatorPools[selectedChain.queryName]?.map((pool, index) => (
          <SelectItem
            className="data-[state=checked]:!bg-eerie-black data-[state=unchecked]:!bg-transparent data-[state=checked]:!text-white data-[state=unchecked]:!text-cool-grey hover:!bg-eerie-black active:!bg-eerie-black"
            key={index}
            value={pool.id.toString()}
          >
            {pool.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
