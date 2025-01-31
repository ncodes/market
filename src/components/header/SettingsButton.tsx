import IconArrowRight from "../icons/IconArrowRight";
import IconMore from "../icons/IconMore";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function SettingsButton() {
  return (
    <Popover>
      <PopoverTrigger>
        {" "}
        <div className="bg-gunmetal flex h-11 w-11 cursor-pointer items-center justify-center rounded-full hover:bg-[#555770]">
          <IconMore />
        </div>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-fit border-none bg-transparent p-0 outline-none">
        <div className="border-gunmetal bg-raisin-black mt-2 flex w-[365px] flex-col gap-6 rounded-3xl border p-4 font-poppins">
          <Label className="text-lotion text-base font-bold">Preferences</Label>

          <div className="flex justify-between">
            <Label className="text-cool-grey font-poppins text-base">Theme</Label>
            <div className="flex gap-8">
              <Label className="cursor-pointer text-base font-bold text-white">AUTO</Label>
              <Label className="text-black-coral cursor-pointer text-base font-bold">DARK</Label>
              <Label className="text-black-coral cursor-pointer text-base font-bold">LIGHT</Label>
            </div>
          </div>
          <div className="flex justify-between">
            <Label className="text-cool-grey font-poppins text-base">Default Currency</Label>
            <div className="flex cursor-pointer gap-1">
              <Label className="cursor-pointer text-base font-bold text-white">USD</Label>
              <IconArrowRight />
            </div>
          </div>
          <div className="flex justify-between">
            <Label className="text-cool-grey font-poppins text-base">Need Help?</Label>
            <div className="flex cursor-pointer gap-1">
              <Label className="cursor-pointer text-base font-bold text-white">Contact us</Label>
              <IconArrowRight />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
