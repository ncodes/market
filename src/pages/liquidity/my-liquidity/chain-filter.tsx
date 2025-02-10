import { AllNetworksIcon } from "@/assets";
import IconDropDown from "@/components/icons/IconDropDown";
import { Button } from "@/components/ui/button";

export default function ChainFilter() {
  return (
    <Button variant={"ghost"} className="gap-1 font-light text-cool-grey hover:bg-transparent hover:text-cool-grey">
      <img src={AllNetworksIcon} className="h-6 w-6" /> Chain <IconDropDown />
    </Button>
  );
}
