"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { SequenceType } from "../types/sequence";
import { solveSequence, validateSequence } from "../utils/sequenceCalculations";
import Button from "./Button";
import Card from "./Card";
import { TbPuzzle, TbCopy, TbArrowLeft, TbHelp } from "react-icons/tb";

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

  const inputClasses =
    "w-full px-10 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all hover:bg-white/10 text-lg";

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
          Solve{" "}
          <span className={`text-seq-${sequenceType} text-glow`}>
            {sequenceType.charAt(0).toUpperCase() + sequenceType.slice(1)}
          </span>{" "}
          Sequence
        </motion.h2>
        <div className="w-[88px]" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <label className="ml-1 block text-sm font-medium text-white/80">
            Enter sequence (use &quot;...&quot; for missing terms):
          </label>
          <div className="relative">
            <TbPuzzle className="absolute top-1/2 left-3 -translate-y-1/2 text-xl text-white/40" />
            <input
              type="text"
              value={inputSequence}
              onChange={(e) => setInputSequence(e.target.value)}
              required
              placeholder={placeholders[sequenceType]}
              className={inputClasses}
            />
          </div>
          <p className="ml-1 text-xs text-white/50">
            Tip: Enter at least two known terms to solve the sequence.
          </p>
        </div>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex items-center gap-3 rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200 backdrop-blur-sm"
          >
            <div className="rounded-full bg-red-500/20 p-1">
              <TbHelp className="text-xl" />
            </div>
            {errorMessage}
          </motion.div>
        )}

        <Button
          type="submit"
          variant={sequenceType}
          fullWidth
          size="lg"
          className="shadow-xl"
        >
          Solve Sequence
        </Button>
      </form>

      {solvedSequence.length > 0 && (
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
              {solvedSequence.map((value, index) => (
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
            {details && (
              <div className="mt-4 rounded-lg border border-white/5 bg-white/5 p-4 text-center text-sm text-white/70">
                {details}
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  );
}
