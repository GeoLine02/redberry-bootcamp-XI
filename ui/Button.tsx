"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-lg font-medium",
    "transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-primary-purple",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary-purple text-white hover:bg-dark-puple",

        secondary: "bg-secondary-purple text-white hover:bg-primary-purple",

        outline:
          "border-2 border-secondary-purple text-primary-purple hover:bg-light-purple hover:bg-primary-purple hover:text-white hover:border-primary-purple",

        ghost: "text-primary-purple hover:bg-light-purple",

        text: "text-primary-purple underline-offset-4 hover:underline",
      },

      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          className,
          "cursor-pointer",
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
