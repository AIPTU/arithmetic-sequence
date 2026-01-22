import { ButtonHTMLAttributes, ReactNode } from "react";
import { SequenceType } from "../types/sequence";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | SequenceType;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";

  const variantStyles: Record<string, string> = {
    primary:
      "bg-primary text-primary-foreground hover:brightness-110 focus:ring-primary",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary",
    arithmetic:
      "bg-seq-arithmetic text-white hover:brightness-110 focus:ring-seq-arithmetic",
    geometric:
      "bg-seq-geometric text-white hover:brightness-110 focus:ring-seq-geometric",
    alphabet:
      "bg-seq-alphabet text-white hover:brightness-110 focus:ring-seq-alphabet",
  };

  const widthStyles = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
