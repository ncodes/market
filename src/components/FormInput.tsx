import { ToolTip } from "@/components/ToolTip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/utils";
import { InfoIcon } from "lucide-react";

export function FormInput({
  fieldName,
  value,
  label,
  tip,
  placeholder,
  onChange,
  errMsg,
  errField,
  required,
  topRightText,
}: {
  fieldName: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  tip: string;
  placeholder: string;
  errMsg?: string;
  required?: boolean;
  errField?: string;
  topRightText?: string;
}) {
  if (fieldName != errField) {
    errMsg = "";
  }

  return (
    <div className="flex flex-col gap-1">
      <Label className="flex items-center justify-between font-light tracking-wider text-gray-300">
        <div className="flex items-center gap-1">
          <span>{label}</span>
          <ToolTip tip={tip} className="text-gray-500 hover:text-gray-100">
            <InfoIcon className="h-4 w-4" />
          </ToolTip>
          {required && <span className="text-red-500">*</span>}
        </div>
        {topRightText && <span className="text-gray-500">{topRightText}</span>}
      </Label>
      <Input
        className={cn("input border border-transparent", {
          "input-error": !!errMsg,
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errMsg && <div className="text-[12px] text-red-500">{errMsg}</div>}
    </div>
  );
}
