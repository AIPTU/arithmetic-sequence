"use client";

import { useState, lazy, Suspense } from "react";
import { SequenceType } from "./types/sequence";
import Button from "./components/Button";

const GenerateSequence = lazy(() => import("./components/GenerateSequence"));
const SolveMissing = lazy(() => import("./components/SolveMissing"));

type PageType = "generate" | "solve" | null;

export default function Home() {
	const [currentPage, setCurrentPage] = useState<PageType>(null);
	const [sequenceType, setSequenceType] = useState<SequenceType>("arithmetic");

	const handleNavigation = (
		page: PageType,
		type: SequenceType = "arithmetic"
	) => {
		setCurrentPage(page);
		setSequenceType(type);
	};

	const renderPage = () => {
		switch (currentPage) {
			case "generate":
				return (
					<Suspense fallback={<LoadingSpinner />}>
						<GenerateSequence
							sequenceType={sequenceType}
							goBack={() => setCurrentPage(null)}
						/>
					</Suspense>
				);
			case "solve":
				return (
					<Suspense fallback={<LoadingSpinner />}>
						<SolveMissing
							sequenceType={sequenceType}
							goBack={() => setCurrentPage(null)}
						/>
					</Suspense>
				);
			default:
				return <MainMenu onNavigate={handleNavigation} />;
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4">
			<div className="w-full max-w-4xl bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-8">
				{renderPage()}
			</div>
			<footer className="mt-8 text-white/80 text-sm">
				&copy; {new Date().getFullYear()} AIPTU. All rights reserved.
			</footer>
		</div>
	);
}

function LoadingSpinner() {
	return (
		<div className="flex justify-center items-center min-h-100">
			<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
		</div>
	);
}

interface MainMenuProps {
	onNavigate: (page: PageType, type: SequenceType) => void;
}

function MainMenu({ onNavigate }: MainMenuProps) {
	const menuItems: Array<{
		type: SequenceType;
		page: PageType;
		label: string;
	}> = [
		{
			type: "arithmetic",
			page: "generate",
			label: "Generate Arithmetic Sequence",
		},
		{
			type: "arithmetic",
			page: "solve",
			label: "Solve Missing Arithmetic Sequence",
		},
		{
			type: "geometric",
			page: "generate",
			label: "Generate Geometric Sequence",
		},
		{
			type: "geometric",
			page: "solve",
			label: "Solve Missing Geometric Sequence",
		},
		{ type: "alphabet", page: "generate", label: "Generate Alphabet Sequence" },
		{
			type: "alphabet",
			page: "solve",
			label: "Solve Missing Alphabet Sequence",
		},
	];

	return (
		<div className="space-y-8 animate-fadeIn">
			<h1 className="text-5xl md:text-6xl font-bold text-white text-center animate-slideDown">
				Arithmetic Sequence
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{menuItems.map((item, index) => (
					<Button
						key={index}
						variant={item.type}
						onClick={() => onNavigate(item.page, item.type)}
						fullWidth
					>
						{item.label}
					</Button>
				))}
			</div>
		</div>
	);
}
