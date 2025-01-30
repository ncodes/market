import { cn } from "../libs/utils";

interface ShowActiveProps {
  isActive?: boolean;
}
export default function ShowActive({ isActive }: ShowActiveProps) {
  return (
    <div className="relative h-[5px] w-full px-[4px]">
      <div
        className={cn("h-[6px] w-full rounded-full blur-[6px]", {
          "bg-light-green": isActive,
          "bg-transparent": !isActive,
        })}
      ></div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-se-[3px] rounded-ss-[3px] ${isActive ? "bg-light-green" : "bg-transparent"}`}
      ></div>
    </div>
  );
}
