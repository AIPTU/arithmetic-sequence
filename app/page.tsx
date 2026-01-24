"use client";

import { useState, lazy, Suspense } from "react";
import { FaGithub } from "react-icons/fa";
import {
  TbMath,
  TbChartDots,
  TbAbc,
  TbMathSymbols,
  TbQuestionMark,
  TbAlphabetGreek,
} from "react-icons/tb";
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
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <AnimatePresence mode="wait">
        {!currentPage ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-5xl"
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
            <Card className="border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-xl">
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

      <footer className="mt-12 text-sm font-medium text-white/40">
        <div className="mb-3 flex items-center justify-center gap-4">
          <a
            href="https://github.com/AIPTU/arithmetic-sequence"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <FaGithub className="text-xl" />
            <span>View on GitHub</span>
          </a>
        </div>
        &copy; {new Date().getFullYear()} AIPTU. All rights reserved.
      </footer>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="relative h-16 w-16">
        <div className="bg-primary/20 absolute inset-0 animate-ping rounded-full"></div>
        <div className="border-primary shadow-primary/50 relative h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 shadow-lg"></div>
      </div>
    </div>
  );
}

interface MainMenuProps {
  onNavigate: (page: PageType, type: SequenceType) => void;
}

function MainMenu({ onNavigate }: MainMenuProps) {
  const menuItems = [
    {
      type: "arithmetic" as SequenceType,
      page: "generate" as PageType,
      label: "Generate Arithmetic",
      desc: "Create number sequences with a constant difference",
      icon: <TbMath />,
    },
    {
      type: "arithmetic" as SequenceType,
      page: "solve" as PageType,
      label: "Solve Arithmetic",
      desc: "Find missing terms in arithmetic progressions",
      icon: <TbMathSymbols />,
    },
    {
      type: "geometric" as SequenceType,
      page: "generate" as PageType,
      label: "Generate Geometric",
      desc: "Create sequences with a constant ratio",
      icon: <TbChartDots />,
    },
    {
      type: "geometric" as SequenceType,
      page: "solve" as PageType,
      label: "Solve Geometric",
      desc: "Find missing terms in geometric progressions",
      icon: <TbQuestionMark />,
    },
    {
      type: "alphabet" as SequenceType,
      page: "generate" as PageType,
      label: "Generate Alphabet",
      desc: "Create patterns using letters",
      icon: <TbAbc />,
    },
    {
      type: "alphabet" as SequenceType,
      page: "solve" as PageType,
      label: "Solve Alphabet",
      desc: "Find missing letters in a sequence",
      icon: <TbAlphabetGreek />,
    },
  ];

  return (
    <Card className="relative overflow-hidden border-white/10 bg-black/30 p-8 shadow-2xl backdrop-blur-md md:p-12">
      <div className="relative z-10 mb-12 text-center">
        <h1 className="mb-4 bg-linear-to-r from-white via-white to-white/60 bg-clip-text text-5xl font-black text-transparent drop-shadow-2xl md:text-7xl">
          Arithmetic Sequence
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-white/50">
          Explore the beauty of mathematical patterns. Generate complicated
          sequences or solve for missing terms with ease.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-6">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant={item.type}
              onClick={() => onNavigate(item.page, item.type)}
              fullWidth
              size="lg"
              className="group flex h-full flex-col items-center justify-center gap-3 border border-white/5 py-8 text-center hover:border-white/20"
            >
              <span className="mb-2 text-4xl opacity-80 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-bold">{item.label}</span>
                <span className="mx-auto max-w-[200px] text-xs leading-relaxed font-normal opacity-70">
                  {item.desc}
                </span>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
