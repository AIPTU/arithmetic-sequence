"use client";

import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SequenceType } from "./types/sequence";
import Button from "./components/Button";
import Card from "./components/Card";

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {!currentPage ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl"
          >
            <MainMenu onNavigate={handleNavigation} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl"
          >
            <Card className="p-8">
              <Suspense fallback={<LoadingSpinner />}>
                {currentPage === "generate" ? (
                  <GenerateSequence
                    sequenceType={sequenceType}
                    goBack={() => setCurrentPage(null)}
                  />
                ) : (
                  <SolveMissing
                    sequenceType={sequenceType}
                    goBack={() => setCurrentPage(null)}
                  />
                )}
              </Suspense>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-8 text-sm font-medium text-white/60">
        &copy; {new Date().getFullYear()} AIPTU. All rights reserved.
      </footer>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex min-h-100 items-center justify-center">
      <div className="border-primary h-16 w-16 animate-spin rounded-full border-t-4 border-b-4"></div>
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
    <Card className="p-8 md:p-12">
      <h1 className="mb-12 bg-linear-to-r from-white to-white/70 bg-clip-text text-center text-4xl font-black text-transparent md:text-6xl">
        Arithmetic Sequence
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant={item.type}
            onClick={() => onNavigate(item.page, item.type)}
            fullWidth
            className="h-16 text-lg shadow-md"
          >
            {item.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
