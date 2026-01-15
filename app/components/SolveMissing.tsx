"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { SequenceType } from "../types/sequence";
import { solveSequence, validateSequence } from "../utils/sequenceCalculations";
import Button from "../components/Button";

interface SolveMissingProps {
	sequenceType: SequenceType;
	goBack: () => void;
}

export default function SolveMissing({
	sequenceType,
	goBack,
}: SolveMissingProps) {
	const [inputSequence, setInputSequence] = useState("");
	const [solvedSequence, setSolvedSequence] = useState<(string | number)[]>([]);
	const [details, setDetails] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setErrorMessage("");
		setDetails("");
		setSolvedSequence([]);

		try {
			const inputArray = inputSequence
				.split(",")
				.map((x) => (x.trim() === "..." ? null : x.trim()));

			if (inputArray.length < 2) {
				throw new Error("Sequence must have at least two terms.");
			}

			validateSequence(inputArray, sequenceType);

			const { solvedArray, details: detailsText } = solveSequence(
				inputArray,
				sequenceType
			);
			setSolvedSequence(solvedArray);
			setDetails(detailsText);
		} catch (error) {
			setErrorMessage(
				error instanceof Error ? error.message : "An error occurred"
			);
		}
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(solvedSequence.join(", "));
			alert("Copied to clipboard!");
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	const placeholders: Record<SequenceType, string> = {
		arithmetic: "e.g., 2, 4, 6, 8, ...",
		geometric: "e.g., 2, 6, 18, 54, ...",
		alphabet: "e.g., A, D, G, J, ...",
	};

	return (
		<div className="w-full max-w-2xl mx-auto p-8 space-y-6 animate-fadeIn">
			<motion.h2
				className="text-4xl font-bold text-white text-center mb-8"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				Solve Missing{" "}
				{sequenceType.charAt(0).toUpperCase() + sequenceType.slice(1)} Sequence
			</motion.h2>

			<form
				onSubmit={handleSubmit}
				className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-8"
			>
				<div className="space-y-2">
					<label className="block text-white font-medium">
						Enter sequence (use &quot;...&quot; for missing terms):
					</label>
					<input
						type="text"
						value={inputSequence}
						onChange={(e) => setInputSequence(e.target.value)}
						required
						placeholder={placeholders[sequenceType]}
						className="w-full px-4 py-3 rounded-lg bg-white/20 border border-orange-300/50 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
					/>
				</div>

				{errorMessage && (
					<div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-100">
						{errorMessage}
					</div>
				)}

				<Button type="submit" fullWidth>
					Solve
				</Button>
			</form>

			{solvedSequence.length > 0 && (
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="bg-white/10 backdrop-blur-sm rounded-xl p-8 space-y-4"
				>
					<h3 className="text-2xl font-bold text-white mb-4">
						Solved Sequence:
					</h3>
					<ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
						{solvedSequence.map((value, index) => (
							<li
								key={index}
								className="bg-white/20 rounded-lg p-3 text-center text-white font-semibold hover:scale-110 transition-transform cursor-default"
							>
								{value}
							</li>
						))}
					</ul>
					<p className="text-white text-center font-medium mt-4">{details}</p>
					<Button onClick={handleCopy} fullWidth>
						Copy to Clipboard
					</Button>
				</motion.div>
			)}

			<Button onClick={goBack} variant="secondary" fullWidth>
				Back to Menu
			</Button>
		</div>
	);
}
