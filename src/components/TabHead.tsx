import { TabsTrigger } from "./ui/tabs";

export default function TabHead({ value, title }: { value: string; title: string }) {
  return (
    <TabsTrigger
      value={value}
      className="text-md flex items-center gap-1 p-0 font-semibold text-black-coral transition-all duration-300 data-[state=active]:bg-transparent data-[state=active]:text-white hover:text-white"
    >
      {title}
    </TabsTrigger>
  );
}
