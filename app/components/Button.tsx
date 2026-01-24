import { ButtonHTMLAttributes, ReactNode } from "react";
import { SequenceType } from "../types/sequence";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | SequenceType;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  size = "md",
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 transform active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden group";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantStyles: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-primary to-orange-400 text-white shadow-orange-500/20 hover:shadow-orange-500/40 border border-orange-400/20",
    secondary:
      "bg-white/10 text-white hover:bg-white/20 border border-white/5 backdrop-blur-sm",
    outline:
      "bg-transparent border-2 border-white/20 text-white hover:bg-white/5 hover:border-white/40",
    arithmetic:
      "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-blue-500/20 hover:shadow-blue-500/40 border border-blue-400/20",
    geometric:
      "bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-purple-500/20 hover:shadow-purple-500/40 border border-purple-400/20",
    alphabet:
      "bg-gradient-to-r from-emerald-600 to-emerald-400 text-white shadow-emerald-500/20 hover:shadow-emerald-500/40 border border-emerald-400/20",
  };

  const widthStyles = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-in-out group-hover:translate-y-0" />

      {icon && <span className="mr-2 text-xl">{icon}</span>}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
