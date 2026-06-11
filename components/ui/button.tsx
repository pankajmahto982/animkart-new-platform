import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "dark";
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  const variants = {
    default: "bg-[#0B8F47] text-white shadow-sm hover:bg-[#08783c]",
    outline: "border border-slate-200 bg-white text-slate-900 hover:border-[#0B8F47] hover:text-[#0B8F47]",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
    dark: "bg-slate-950 text-white hover:bg-slate-800"
  };

  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
