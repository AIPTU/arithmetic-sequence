"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { SequenceType } from "../types/sequence";
import { generateSequence } from "../utils/sequenceCalculations";
import Button from "./Button";
import Card from "./Card";

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

  const inputClasses =
    "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all";

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <div className="mb-8 flex items-center justify-between">
        <Button onClick={goBack} variant="secondary" className="px-4!">
          ← Back
        </Button>
        <motion.h2
          className="text-center text-2xl font-bold md:text-3xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Generate{" "}
          <span className={`text-seq-${sequenceType}`}>
            {sequenceType.charAt(0).toUpperCase() + sequenceType.slice(1)}
          </span>{" "}
          Sequence
        </motion.h2>
        <div className="w-[88px]" /> {/* Spacer for centering */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">
              Initial Term
            </label>
            <input
              type={sequenceType === "alphabet" ? "text" : "number"}
              value={initialTerm}
              onChange={(e) => setInitialTerm(e.target.value)}
              required
              placeholder={sequenceType === "alphabet" ? "e.g., A" : "e.g., 1"}
              className={inputClasses}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">
              {getLabel()}
            </label>
            <input
              type="number"
              value={commonDifferenceOrRatio}
              onChange={(e) => setCommonDifferenceOrRatio(e.target.value)}
              required
              placeholder="e.g., 2"
              className={inputClasses}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-white/80">
              Number of Terms
            </label>
            <input
              type="number"
              value={numberOfTerms}
              onChange={(e) => setNumberOfTerms(e.target.value)}
              required
              placeholder="e.g., 5"
              className={inputClasses}
            />
          </div>
        </div>

        <Button
          type="submit"
          variant={sequenceType}
          fullWidth
          className="text-lg"
        >
          Generate Sequence
        </Button>
      </form>

      {generatedSequence.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="space-y-4 border-white/5 bg-black/20">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white/90">Results</h3>
              <Button
                onClick={handleCopy}
                variant="secondary"
                className="px-3 py-1 text-xs"
              >
                Copy
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {generatedSequence.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-seq-${sequenceType} bg-opacity-20 border border-seq-${sequenceType}/30 min-w-12 rounded-lg px-4 py-2 text-center font-mono text-lg font-bold`}
                >
                  {value}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
