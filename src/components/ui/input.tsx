import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

const inputVariants = cva(
  "flex min-h-8 w-full bg-background duration-300 text-sm shadow-sm transition-all  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        primary: "pl-2 border-blue-300/40",
        ghost: "border-transparent bg-transparent focus-visible:ring-transparent focus-visible:outline-0",
      },
      sz: {
        default: "",
      },
      w: {
        default: "w-full",
        sm: "!w-1/4",
        lg: "!w-2/4",
        xl: "!w-2/4",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      sz: "default",
      w: "default",
      rounded: "default",
    },
  },
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, rounded, w, sz, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "input";
    return <Comp className={inputVariants({ variant, w, className, rounded, sz })} ref={ref} {...props} />;
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
