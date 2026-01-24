"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { SequenceType } from "../types/sequence";
import { generateSequence } from "../utils/sequenceCalculations";
import Button from "./Button";
import Card from "./Card";
import {
  TbMathFunction,
  TbNumbers,
  TbListNumbers,
  TbCopy,
  TbArrowLeft,
} from "react-icons/tb";

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
    "w-full px-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all hover:bg-white/10";

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <Button
          onClick={goBack}
          variant="secondary"
          size="sm"
          icon={<TbArrowLeft />}
        >
          Back
        </Button>
        <motion.h2
          className="text-center text-2xl font-bold md:text-3xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Generate{" "}
          <span className={`text-seq-${sequenceType} text-glow`}>
            {sequenceType.charAt(0).toUpperCase() + sequenceType.slice(1)}
          </span>{" "}
          Sequence
        </motion.h2>
        <div className="w-[88px]" /> {/* Spacer for centering */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="ml-1 block text-sm font-medium text-white/80">
              Initial Term
            </label>
            <div className="relative">
              <TbMathFunction className="absolute top-1/2 left-3 -translate-y-1/2 text-lg text-white/40" />
              <input
                type={sequenceType === "alphabet" ? "text" : "number"}
                value={initialTerm}
                onChange={(e) => setInitialTerm(e.target.value)}
                required
                placeholder={
                  sequenceType === "alphabet" ? "e.g., A" : "e.g., 1"
                }
                className={inputClasses}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="ml-1 block text-sm font-medium text-white/80">
              {getLabel()}
            </label>
            <div className="relative">
              <TbNumbers className="absolute top-1/2 left-3 -translate-y-1/2 text-lg text-white/40" />
              <input
                type="number"
                value={commonDifferenceOrRatio}
                onChange={(e) => setCommonDifferenceOrRatio(e.target.value)}
                required
                placeholder="e.g., 2"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="ml-1 block text-sm font-medium text-white/80">
              Number of Terms
            </label>
            <div className="relative">
              <TbListNumbers className="absolute top-1/2 left-3 -translate-y-1/2 text-lg text-white/40" />
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
        </div>

        <Button
          type="submit"
          variant={sequenceType}
          fullWidth
          size="lg"
          className="shadow-xl"
        >
          Generate Sequence
        </Button>
      </form>

      {generatedSequence.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card
            className="space-y-6 border-white/10 bg-black/40 backdrop-blur-md"
            hoverEffect
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white/90">Results</h3>
              <Button
                onClick={handleCopy}
                variant="secondary"
                size="sm"
                icon={<TbCopy />}
              >
                Copy
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {generatedSequence.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.1, translateY: -2 }}
                  className={`bg-seq-${sequenceType}/20 border border-seq-${sequenceType}/30 min-w-[60px] rounded-xl px-4 py-3 text-center font-mono text-xl font-bold shadow-lg backdrop-blur-sm`}
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
