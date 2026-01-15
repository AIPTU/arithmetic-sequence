import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Arithmetic Sequence Calculator",
	description:
		"Generate and solve arithmetic, geometric, and alphabet sequences",
	icons: {
		icon: "https://img.icons8.com/?size=100&id=21RZGSq7l9zF&format=png&color=000000",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
