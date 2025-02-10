import { AllNetworksIcon } from "@/assets";
import IconDropDown from "@/components/icons/IconDropDown";
import { Button } from "@/components/ui/button";

export default function ChainFilter() {
  return (
    <Button variant={"ghost"} className="text-cool-grey hover:text-cool-grey gap-1 font-light hover:bg-transparent">
      <img src={AllNetworksIcon} className="h-6 w-6" /> Chain <IconDropDown />
    </Button>
  );
}
