import { CaretSortIcon} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";
import { cn } from "../libs/utils.ts";

type CustomSelectTriggerProps = {
    isRightIcon: Boolean
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
    CustomSelectTriggerProps
>(({ className, children, isRightIcon=true, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-8 w-full items-center justify-between rounded-md border border-gray-600 bg-transparent px-3 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
    {isRightIcon && (
      <SelectPrimitive.Icon asChild>
      <CaretSortIcon className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
    )}
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export { SelectTrigger }
