import { TabsTrigger } from "./ui/tabs";

export default function TabHead({ value, title }: { value: string; title: string }) {
  return (
    <TabsTrigger
      value={value}
      className="flex items-center gap-1 p-0 text-sm font-semibold text-black-coral data-[state=active]:bg-transparent data-[state=active]:text-white"
    >
      {title}
    </TabsTrigger>
  );
}
