import { cn, sanitizeNumber } from "@/libs/utils.ts";
import React, { ReactNode, memo, useEffect, useState } from "react";
import { Label } from "./ui/label";

const Input = memo(function Input({
  suffix,
  children,
  hideSuffix,
  type,
  placeholder,
  className,
  disabled,
  defaultValue,
  readOnly,
  containerClassName,
  number,
  value,
  onChange,
  onKeyDown,
  onKeyUp,
}: {
  type?: string;
  suffix?: string | React.ReactNode;
  children?: ReactNode;
  hideSuffix?: boolean;
  placeholder?: string;
  value?: string;
  className?: string;
  number?: {
    min?: number;
    max?: number;
    defaultValue?: string;
    allowNegative?: boolean;
    allowDecimal?: boolean;
  };
  disabled?: boolean;
  defaultValue?: string;
  readOnly?: boolean;
  containerClassName?: string;
  onChange?: (value: string) => void;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
}) {
  const [val, setVal] = useState(defaultValue ?? "");
  const childrenArray = React.Children.toArray(children);
  const leftLabel = children ? childrenArray.find((child: any) => child.type === LeftLabel) : null;
  const rightLabel = children ? childrenArray.find((child: any) => child.type === RightLabel) : null;
  const headerLeftLabel = children ? childrenArray.find((child: any) => child.type === HeaderLeftLabel) : null;
  const headerRightLabel = children ? childrenArray.find((child: any) => child.type === HeaderRightLabel) : null;

  useEffect(() => {
    onChange?.(val ?? "");
  }, [val]);

  useEffect(() => {
    setVal(value || "");
  }, [value]);

  return (
    <div>
      {headerLeftLabel && headerRightLabel && (
        <div className="flex items-center justify-between">
          {headerLeftLabel && headerLeftLabel}
          {headerRightLabel && headerRightLabel}
        </div>
      )}
      <div
        className={cn(
          "flex h-11 w-full items-center rounded-3xl bg-black-coral/20 pl-1 transition-all duration-500 focus-within:bg-black-coral/30 hover:bg-black-coral/30",
          containerClassName,
        )}
      >
        <input
          onChange={(e) => {
            if (number) {
              const sanitizedValue = sanitizeNumber(e.target.value, {
                defaultValue: "",
                allowNegative: number.allowNegative ?? false,
                min: number.min,
                max: number.max,
              });
              setVal(sanitizedValue);
            } else {
              setVal(e.target.value);
            }
          }}
          type={type || "number"}
          value={val}
          readOnly={readOnly}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder={placeholder || "0.00"}
          className={cn("input font-bold tracking-widest focus-within:ring-0", className)}
          disabled={disabled}
        />
        {!hideSuffix && typeof suffix === "string" ? (
          <div className="flex h-full w-max items-center rounded-r-3xl bg-gradient-to-r from-black-coral/5 to-black-coral/50 px-4">
            <Label className="w-max text-sm font-bold tracking-wider text-lotion/60">{suffix}</Label>
          </div>
        ) : (
          suffix
        )}
      </div>
      {(leftLabel || rightLabel) && (
        <div className="mt-1 flex w-full items-center justify-between px-1">
          {leftLabel && leftLabel}
          {rightLabel && rightLabel}
        </div>
      )}
    </div>
  );
});

export const LeftLabel = memo(function LeftLabel({ label }: { label: ReactNode }) {
  return <Label className="text-xs font-extralight tracking-[2px] text-lotion">{label}</Label>;
});

export const RightLabel = memo(function RightLabel({ label }: { label: ReactNode }) {
  return <Label className="text-xs font-extralight text-lotion">{label}</Label>;
});

export const HeaderLeftLabel = memo(function HeaderLeftLabel({
  label,
  className,
}: {
  label: ReactNode;
  className?: string;
}) {
  return <Label className={cn("text-xs font-extralight tracking-[2px] text-lotion", className)}>{label}</Label>;
});

export const HeaderRightLabel = memo(function HeaderRightLabel({
  label,
  className,
}: {
  label: ReactNode;
  className?: string;
}) {
  return <Label className={cn("text-xs font-extralight tracking-[2px] text-lotion", className)}>{label}</Label>;
});

export default Input;
