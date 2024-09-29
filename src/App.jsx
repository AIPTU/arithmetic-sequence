/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import React, { useState } from "react";
import GenerateSequence from "./components/GenerateSequence";
import SolveMissing from "./components/SolveMissing";
import "./index.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [sequenceType, setSequenceType] = useState("arithmetic");

  const handleNavigation = (page, type = "arithmetic") => {
    setCurrentPage(page);
    setSequenceType(type);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "generate":
        return (
          <GenerateSequence
            sequenceType={sequenceType}
            goBack={() => setCurrentPage(null)}
          />
        );
      case "solve":
        return (
          <SolveMissing
            sequenceType={sequenceType}
            goBack={() => setCurrentPage(null)}
          />
        );
      default:
        return (
          <motion.div
            className="main-menu"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Sequence Solver
            </motion.h1>
            <div className="button-group">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="menu-button"
                onClick={() => handleNavigation("generate", "arithmetic")}
              >
                Generate Arithmetic Sequence
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="menu-button"
                onClick={() => handleNavigation("solve", "arithmetic")}
              >
                Solve Missing Arithmetic Terms
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="menu-button"
                onClick={() => handleNavigation("generate", "geometric")}
              >
                Generate Geometric Sequence
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="menu-button"
                onClick={() => handleNavigation("solve", "geometric")}
              >
                Solve Missing Geometric Terms
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="menu-button"
                onClick={() => handleNavigation("generate", "alphabet")}
              >
                Generate Alphabet Sequence
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="menu-button"
                onClick={() => handleNavigation("solve", "alphabet")}
              >
                Solve Missing Alphabet Sequence
              </motion.button>
            </div>
          </motion.div>
        );
    }
  };

  return <div className="container">{renderPage()}</div>;
};

export default App;
