import CloseIcon from "@/components/close-icon";
import { Label } from "@/components/ui/label";

export function ConfirmModalHeader({
  loading,
  setOpen,
  title,
  description,
}: {
  loading: boolean;
  setOpen: () => void;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-gunmetal/50 px-5 py-4">
      <span className="flex flex-col gap-1">
        <Label className="text-xl font-semibold text-lotion lg:text-2xl">{title}</Label>
        <Label className="text-xs font-light tracking-widest text-lotion/40">{description}</Label>
      </span>
      <CloseIcon setOpen={loading ? () => {} : setOpen} />
    </div>
  );
}
