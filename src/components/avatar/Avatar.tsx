import { ReactNode } from "react";
import { cn } from "../../libs/utils.ts";
import { AvatarFallback, AvatarImage, Avatar as UIAvatar } from "../ui/avatar";

export function Avatar({
  src,
  fallback,
  className,
  fallbackClassName,
  rootClassName,
}: {
  src: string;
  fallback?: ReactNode;
  rootClassName?: string;
  className?: string;
  fallbackClassName?: string;
}) {
  return (
    <UIAvatar className={cn("flex w-auto items-center", rootClassName)}>
      {!!src && <AvatarImage src={src} className={cn("h-[30px] w-[30px] rounded-full", className)} />}
      {(fallback || !src) && (
        <AvatarFallback className={cn("h-[30px] w-[30px] overflow-hidden text-xs", fallbackClassName)}>
          {fallback}
        </AvatarFallback>
      )}
    </UIAvatar>
  );
}
