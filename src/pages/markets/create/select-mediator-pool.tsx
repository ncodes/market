import IconDropDown from "@/components/icons/IconDropDown";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { MediatorPools } from "@jointlabs/meta";
import { useState } from "react";
import { useConnectorContext } from "../../../hooks/connectors/useConnectorContext";

export default function SelectMediatorPool({
  onMediatorPoolSelected,
}: {
  onMediatorPoolSelected?: (value: MediatorPool) => void;
}) {
  const { chainInfo } = useConnectorContext();
  const [selectedValue, setSelectedValue] = useState<string>();

  if (!chainInfo) return null;

  return (
    <Select
      onValueChange={(value) => {
        setSelectedValue(value);
        onMediatorPoolSelected?.(MediatorPools[chainInfo.queryName]![Number(value)]);
      }}
    >
      <SelectTrigger
        className="w-fit border-none p-0 outline-none focus:ring-0 active:border-none active:outline-none"
        asChild
      >
        <Button className="bg-black-coral/20 hover:bg-black-coral/30">
          {selectedValue && MediatorPools[chainInfo.queryName]
            ? MediatorPools[chainInfo.queryName]![Number(selectedValue)].name
            : "Select"}{" "}
          <IconDropDown />
        </Button>
      </SelectTrigger>
      <SelectContent className="border-eerie-black bg-chinese-black">
        {MediatorPools[chainInfo.queryName]?.map((pool, index) => (
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
