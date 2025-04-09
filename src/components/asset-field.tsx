import { USDCIcon } from "@/assets";
import { cn } from "@/libs/utils";
import { Avatar } from "./avatar/avatar";

interface AssetFieldProps {
  width?: number;
  rootClassName?: string;
  className?: string;
  readOnly?: boolean;
  placeholder?: string;
  value?: string | number;
  type?: React.HTMLInputTypeAttribute;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function AssetField({
  width,
  rootClassName,
  className,
  readOnly,
  placeholder,
  value,
  onChange,
  type = "number",
}: AssetFieldProps) {
  return (
    <div className="group w-fit">
      <div
        className={cn(
          "flex w-fit gap-2 rounded-3xl bg-vampire-black px-2 py-[6px] focus-within:bg-raisin-black group-hover:bg-raisin-black group-focus:bg-raisin-black",
          rootClassName,
        )}
      >
        <Avatar src={USDCIcon} rootClassName="w-8 h-8" className="h-8 w-8" />

        <input
          onChange={onChange}
          type={type}
          value={value}
          placeholder={placeholder}
          className={cn(
            "border-none bg-transparent px-1 font-semibold text-white outline-none placeholder:text-gunmetal active:outline-none",
            className,
          )}
          readOnly={readOnly}
          style={{ width: width ?? 100 }}
        />
      </div>
    </div>
  );
}
