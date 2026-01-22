import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "glass";
}

export default function Card({
  children,
  className = "",
  variant = "glass",
  ...props
}: CardProps) {
  const baseStyles = "rounded-xl p-6 transition-all duration-300";

  const variants = {
    default: "bg-secondary text-secondary-foreground shadow-lg",
    glass: "glass text-card-foreground",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
