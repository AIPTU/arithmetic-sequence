import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "glass" | "glass-heavy";
  hoverEffect?: boolean;
}

export default function Card({
  children,
  className = "",
  variant = "glass",
  hoverEffect = false,
  ...props
}: CardProps) {
  const baseStyles =
    "rounded-2xl p-6 transition-all duration-300 relative overflow-hidden";

  const variants = {
    default:
      "bg-secondary text-secondary-foreground shadow-lg border border-white/5",
    glass: "glass text-card-foreground",
    "glass-heavy":
      "bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl text-card-foreground",
  };

  const hoverStyles = hoverEffect
    ? "hover:scale-[1.01] hover:shadow-2xl hover:border-white/20"
    : "";

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {hoverEffect && (
        <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
