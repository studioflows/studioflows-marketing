"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#FACC15] text-black shadow-[0_10px_28px_rgba(250,204,21,0.3)] hover:brightness-105",
  outline: "border border-white/25 text-white hover:bg-white/[0.08]",
  ghost: "text-white/80 hover:bg-white/[0.08] hover:text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs tracking-[0.14em]",
  md: "h-11 px-5 text-[11px] tracking-[0.18em]",
  lg: "h-12 px-6 text-[11px] tracking-[0.2em]",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, variant = "primary", size = "md", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-semibold uppercase transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/80 disabled:pointer-events-none disabled:opacity-60",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
