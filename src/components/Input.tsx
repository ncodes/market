import { cn } from "@/libs/utils.ts";
import React, { ReactNode } from "react";
import { Label } from "./ui/label";

export default function Input({
  suffix,
  children,
  hideSuffix,
  type,
  placeholder,
  className,
  disabled,
  onChange,
  value,
  readOnly,
  containerClassName,
}: {
  type?: string;
  suffix?: string | React.ReactNode;
  children?: ReactNode;
  hideSuffix?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  value?: string | number;
  readOnly?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  containerClassName?: string;
}) {
  const childrenArray = React.Children.toArray(children);
  const leftLabel = children ? childrenArray.find((child: any) => child.type === LeftLabel) : null;
  const rightLabel = children ? childrenArray.find((child: any) => child.type === RightLabel) : null;

  return (
    <div>
      <div
        className={cn(
          "flex h-11 w-full items-center rounded-3xl bg-black-coral/20 pl-1 transition-all duration-500 focus-within:bg-black-coral/30 hover:bg-black-coral/30",
          containerClassName,
        )}
      >
        <input
          onChange={onChange}
          type={type || "number"}
          value={value}
          readOnly={readOnly}
          placeholder={placeholder || "0.00"}
          className={cn("input focus-within:ring-0", className)}
          disabled={disabled}
        />
        {!hideSuffix && typeof suffix === "string" ? (
          <div className="flex h-full w-max items-center rounded-3xl bg-black-coral/20 px-4">
            <Label className="w-max text-sm tracking-wide text-lotion">{suffix}</Label>
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
}

export function LeftLabel({ label }: { label: ReactNode }) {
  return <Label className="text-xs font-extralight tracking-[2px] text-lotion">{label}</Label>;
}

export function RightLabel({ label }: { label: ReactNode }) {
  return <Label className="text-xs font-extralight text-lotion">{label}</Label>;
}
