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
		"px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg";

	const variantStyles: Record<string, string> = {
		primary:
			"bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white",
		secondary:
			"bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white",
		arithmetic:
			"bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white",
		geometric:
			"bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white",
		alphabet:
			"bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white",
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
