import IconDropDown from "@/components/icons/IconDropDown";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

export default function SelectMediatorPool() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <Button className="bg-black-coral">
          Select <IconDropDown />
        </Button>
      </SelectTrigger>
      <SelectContent className="bg-chinese-black border-eerie-black">
        {[1, 2, 3, 4, 5].map((item) => (
          <SelectItem key={item} value={`Mediator Pool ${item}`}>{`Mediator Pool ${item}`}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
