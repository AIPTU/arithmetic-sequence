import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Arithmetic Sequence | Arithmetic, Geometric & Alphabet",
  description:
    "A powerful tool to generate and solve arithmetic, geometric, and alphabet sequences. Perfect for students and educators.",
  keywords: [
    "math",
    "sequence",
    "arithmetic",
    "geometric",
    "alphabet",
    "solver",
    "generator",
  ],
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
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
