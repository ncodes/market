import { ReactNode } from "react";
import { cn } from "../../libs/utils.ts";
import { AvatarFallback, AvatarImage, Avatar as UIAvatar } from "../ui/avatar.tsx";

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
      <AvatarImage src={src} className={cn("w-[30px]", className)} />
      {fallback && <AvatarFallback className={cn("w-[30px]", fallbackClassName)}>{fallback}</AvatarFallback>}
    </UIAvatar>
  );
}
