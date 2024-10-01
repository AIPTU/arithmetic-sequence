/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import React, { useState } from "react";

const SolveMissing = ({ sequenceType, goBack }) => {
  const [inputSequence, setInputSequence] = useState("");
  const [solvedSequence, setSolvedSequence] = useState([]);
  const [details, setDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateSequence = (sequence, type) => {
    const isNumeric = (x) => !isNaN(parseFloat(x)) && isFinite(x);
    const isAlphabetic = (x) => /^[a-zA-Z]+$/.test(x);

    const hasInvalidNumber = sequence.some(
      (x) => x !== null && type !== "alphabet" && !isNumeric(x)
    );
    const hasInvalidLetter = sequence.some(
      (x) => x !== null && type === "alphabet" && !isAlphabetic(x)
    );

    if (hasInvalidNumber || hasInvalidLetter) {
      throw new Error(
        `Invalid input: Only ${
          type === "alphabet" ? "letters" : "numbers"
        } are allowed for ${type} sequences.`
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setDetails("");
    setSolvedSequence([]);

    try {
      const inputArray = inputSequence
        .split(",")
        .map((x) => (x.trim() === "..." ? null : x.trim()));

      if (inputArray.length < 2) {
        throw new Error("Input sequence must have at least two terms.");
      }

      validateSequence(inputArray, sequenceType);

      const { solvedArray, details: detailsText } = solveSequence(
        inputArray,
        sequenceType
      );
      setSolvedSequence(solvedArray);
      setDetails(detailsText);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const solveSequence = (sequence, type) => {
    let solvedSequence = [...sequence];

    switch (type) {
      case "arithmetic": {
        const diff = findArithmeticDifference(solvedSequence);
        if (diff === null) {
          throw new Error("Could not find a common difference.");
        }
        solvedSequence = fillMissingTermsArithmetic(solvedSequence, diff);
        return {
          solvedArray: solvedSequence,
          details: `Common difference is ${diff}.`,
        };
      }

      case "geometric": {
        const ratio = findGeometricRatio(solvedSequence);
        if (ratio === null) {
          throw new Error("Could not find a common ratio.");
        }
        solvedSequence = fillMissingTermsGeometric(solvedSequence, ratio);
        return {
          solvedArray: solvedSequence,
          details: `Common ratio is ${ratio}.`,
        };
      }

      case "alphabet": {
        const diff = findAlphabetDifference(solvedSequence);
        if (diff === null) {
          throw new Error("Could not find a common letter difference.");
        }
        solvedSequence = fillMissingTermsAlphabet(solvedSequence, diff);
        return {
          solvedArray: solvedSequence,
          details: `Common letter difference is ${diff}.`,
        };
      }

      default:
        throw new Error("Unknown sequence type.");
    }
  };

  const findArithmeticDifference = (sequence) => {
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] !== null && sequence[i - 1] !== null) {
        return sequence[i] - sequence[i - 1];
      }
    }
    return null;
  };

  const fillMissingTermsArithmetic = (sequence, diff) => {
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] === null) {
        sequence[i] = parseFloat(sequence[i - 1]) + diff;
      }
    }
    return sequence;
  };

  const findGeometricRatio = (sequence) => {
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] !== null && sequence[i - 1] !== null) {
        return sequence[i] / sequence[i - 1];
      }
    }
    return null;
  };

  const fillMissingTermsGeometric = (sequence, ratio) => {
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] === null) {
        sequence[i] = parseFloat(sequence[i - 1]) * ratio;
      }
    }
    return sequence;
  };

  const findAlphabetDifference = (sequence) => {
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] !== null && sequence[i - 1] !== null) {
        return sequence[i].charCodeAt(0) - sequence[i - 1].charCodeAt(0);
      }
    }
    return null;
  };

  const fillMissingTermsAlphabet = (sequence, diff) => {
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] === null) {
        const prevCharCode = sequence[i - 1].charCodeAt(0);
        sequence[i] = String.fromCharCode(prevCharCode + diff);
      }
    }
    return sequence;
  };

  const handleCopy = () => {
    const text = solvedSequence.join(", ");
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied to clipboard"))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  const placeholder = {
    arithmetic: "e.g. 2, 4, 6, 8, ...",
    geometric: "e.g. 2, 6, 18, 54, ...",
    alphabet: "e.g. A, D, G, J, ...",
  }[sequenceType];

  return (
    <motion.div
      className="sequence-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2>{`Solve Missing ${
        sequenceType.charAt(0).toUpperCase() + sequenceType.slice(1)
      } Terms`}</motion.h2>
      <form onSubmit={handleSubmit} className="sequence-form">
        <div>
          <label>Input Sequence (use &quot;...&quot; for missing terms):</label>
          <input
            type="text"
            value={inputSequence}
            onChange={(e) => setInputSequence(e.target.value)}
            required
            placeholder={placeholder}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          type="submit"
        >
          Solve
        </motion.button>
      </form>

      {solvedSequence.length > 0 && (
        <div>
          <h3>Solved Sequence:</h3>
          <motion.ul>
            {solvedSequence.map((num, index) => (
              <motion.li key={index} whileHover={{ scale: 1.1 }}>
                {num}
              </motion.li>
            ))}
          </motion.ul>
          <p>{details}</p>
          <motion.button
            className="back-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={handleCopy}
          >
            Copy to Clipboard
          </motion.button>
        </div>
      )}
      <motion.button
        className="back-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={goBack}
      >
        Back
      </motion.button>
    </motion.div>
  );
};

export default SolveMissing;
