"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { SequenceType } from "../types/sequence";
import { generateSequence } from "../utils/sequenceCalculations";
import Button from "../components/Button";

interface GenerateSequenceProps {
	sequenceType: SequenceType;
	goBack: () => void;
}

export default function GenerateSequence({
	sequenceType,
	goBack,
}: GenerateSequenceProps) {
	const [initialTerm, setInitialTerm] = useState("");
	const [commonDifferenceOrRatio, setCommonDifferenceOrRatio] = useState("");
	const [numberOfTerms, setNumberOfTerms] = useState("");
	const [generatedSequence, setGeneratedSequence] = useState<
		(string | number)[]
	>([]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const initial =
			sequenceType === "alphabet"
				? initialTerm.toUpperCase()
				: Number(initialTerm);

		const sequence = generateSequence(
			initial,
			Number(commonDifferenceOrRatio),
			Number(numberOfTerms),
			sequenceType
		);

		setGeneratedSequence(sequence);
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(generatedSequence.join(", "));
			alert("Copied to clipboard!");
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	const getLabel = () => {
		switch (sequenceType) {
			case "arithmetic":
				return "Common Difference";
			case "geometric":
				return "Common Ratio";
			case "alphabet":
				return "Step";
		}
	};

	return (
		<div className="w-full max-w-2xl mx-auto p-8 space-y-6 animate-fadeIn">
			<motion.h2
				className="text-4xl font-bold text-white text-center mb-8"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				Generate {sequenceType.charAt(0).toUpperCase() + sequenceType.slice(1)}{" "}
				Sequence
			</motion.h2>

			<form
				onSubmit={handleSubmit}
				className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-8"
			>
				<div className="space-y-2">
					<label className="block text-white font-medium">Initial Term:</label>
					<input
						type={sequenceType === "alphabet" ? "text" : "number"}
						value={initialTerm}
						onChange={(e) => setInitialTerm(e.target.value)}
						required
						placeholder={sequenceType === "alphabet" ? "e.g., A" : "e.g., 1"}
						className="w-full px-4 py-3 rounded-lg bg-white/20 border border-orange-300/50 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
					/>
				</div>

				<div className="space-y-2">
					<label className="block text-white font-medium">{getLabel()}:</label>
					<input
						type="number"
						value={commonDifferenceOrRatio}
						onChange={(e) => setCommonDifferenceOrRatio(e.target.value)}
						required
						placeholder="e.g., 2"
						className="w-full px-4 py-3 rounded-lg bg-white/20 border border-orange-300/50 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
					/>
				</div>

				<div className="space-y-2">
					<label className="block text-white font-medium">
						Number of Terms:
					</label>
					<input
						type="number"
						value={numberOfTerms}
						onChange={(e) => setNumberOfTerms(e.target.value)}
						required
						placeholder="e.g., 5"
						className="w-full px-4 py-3 rounded-lg bg-white/20 border border-orange-300/50 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
					/>
				</div>

				<Button type="submit" fullWidth>
					Generate
				</Button>
			</form>

			{generatedSequence.length > 0 && (
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="bg-white/10 backdrop-blur-sm rounded-xl p-8 space-y-4"
				>
					<h3 className="text-2xl font-bold text-white mb-4">
						Generated Sequence:
					</h3>
					<ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
						{generatedSequence.map((value, index) => (
							<li
								key={index}
								className="bg-white/20 rounded-lg p-3 text-center text-white font-semibold hover:scale-110 transition-transform cursor-default"
							>
								{value}
							</li>
						))}
					</ul>
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
