interface ShowActiveProps {
  isActive?: boolean;
}
export default function ShowActive({ isActive }: ShowActiveProps) {
  return (
    <div className="relative h-[8px] w-full px-[10px]">
      <div
        className={`h-[8px] w-full rounded-se-[3px] rounded-ss-[3px] blur-[8px] ${isActive ? "bg-light-green" : "bg-transparent"}`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 rounded-se-[3px] rounded-ss-[3px] ${isActive ? "bg-light-green" : "bg-transparent"}`}
      ></div>
    </div>
  );
}
