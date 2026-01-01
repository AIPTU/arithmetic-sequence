import React, { useState, useCallback, memo } from "react";

const SolveMissing = memo(({ sequenceType, goBack }) => {
  const [inputSequence, setInputSequence] = useState("");
  const [solvedSequence, setSolvedSequence] = useState([]);
  const [details, setDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateSequence = useCallback((sequence, type) => {
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
        } are allowed for ${type} sequence.`
      );
    }
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setErrorMessage("");
    setDetails("");
    setSolvedSequence([]);

    try {
      const inputArray = inputSequence
        .split(",")
        .map((x) => (x.trim() === "..." ? null : x.trim()));

      if (inputArray.length < 2) {
        throw new Error("Sequence input must have at least two terms.");
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
  }, [inputSequence, sequenceType, validateSequence]);

  const solveSequence = useCallback((sequence, type) => {
    let solvedSequence = [...sequence];

    switch (type) {
      case "arithmetic": {
        const diff = findArithmeticDifference(solvedSequence);
        if (diff === null) {
          throw new Error("Cannot find common difference.");
        }
        solvedSequence = fillMissingTermsArithmetic(solvedSequence, diff);
        return {
          solvedArray: solvedSequence,
          details: `The common difference is ${diff}.`,
        };
      }

      case "geometric": {
        const ratio = findGeometricRatio(solvedSequence);
        if (ratio === null) {
          throw new Error("Cannot find common ratio.");
        }
        solvedSequence = fillMissingTermsGeometric(solvedSequence, ratio);
        return {
          solvedArray: solvedSequence,
          details: `The common ratio is ${ratio}.`,
        };
      }

      case "alphabet": {
        const diff = findAlphabetDifference(solvedSequence);
        if (diff === null) {
          throw new Error("Cannot find common letter difference.");
        }
        solvedSequence = fillMissingTermsAlphabet(solvedSequence, diff);
        return {
          solvedArray: solvedSequence,
          details: `The common letter difference is ${diff}.`,
        };
      }

      default:
        throw new Error("Unknown sequence type.");
    }
  }, []);

  const findArithmeticDifference = useCallback((sequence) => {
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] !== null && sequence[i - 1] !== null) {
        return sequence[i] - sequence[i - 1];
      }
    }
    return null;
  }, []);

  const fillMissingTermsArithmetic = useCallback((sequence, diff) => {
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] === null) {
        sequence[i] = parseFloat(sequence[i - 1]) + diff;
      }
    }
    return sequence;
  }, []);

  const findGeometricRatio = useCallback((sequence) => {
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] !== null && sequence[i - 1] !== null) {
        return sequence[i] / sequence[i - 1];
      }
    }
    return null;
  }, []);

  const fillMissingTermsGeometric = useCallback((sequence, ratio) => {
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] === null) {
        sequence[i] = parseFloat(sequence[i - 1]) * ratio;
      }
    }
    return sequence;
  }, []);

  const findAlphabetDifference = useCallback((sequence) => {
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] !== null && sequence[i - 1] !== null) {
        return sequence[i].charCodeAt(0) - sequence[i - 1].charCodeAt(0);
      }
    }
    return null;
  }, []);

  const fillMissingTermsAlphabet = useCallback((sequence, diff) => {
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] === null) {
        const prevCharCode = sequence[i - 1].charCodeAt(0);
        sequence[i] = String.fromCharCode(prevCharCode + diff);
      }
    }
    return sequence;
  }, []);

  const handleCopy = useCallback(() => {
    const text = solvedSequence.join(", ");
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied to Clipboard"))
      .catch((err) => console.error("Failed to copy text: ", err));
  }, [solvedSequence]);

  const placeholder = {
    arithmetic: "e.g.: 2, 4, 6, 8, ...",
    geometric: "e.g.: 2, 6, 18, 54, ...",
    alphabet: "e.g.: A, D, G, J, ...",
  }[sequenceType];

  return (
    <div className="sequence-page fade-in">
      <motion.h2>{`Solve Missing ${
        sequenceType.charAt(0).toUpperCase() + sequenceType.slice(1)
      } Sequence`}</motion.h2>
      <form onSubmit={handleSubmit} className="sequence-form">
        <div>
          <label>
            Enter sequence (use &quot;...&quot; for missing terms):
          </label>
          <input
            type="text"
            value={inputSequence}
            onChange={(e) => setInputSequence(e.target.value)}
            required
            placeholder={placeholder}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button
          className="button-hover"
          type="submit"
        >
          Solve
        </button>
      </form>

      {solvedSequence.length > 0 && (
        <div>
          <h3>Solved Sequence:</h3>
          <ul>
            {solvedSequence.map((num, index) => (
              <li key={index} className="list-item-hover">
                {num}
              </li>
            ))}
          </ul>
          <p>{details}</p>
          <button
            className="back-button button-hover"
            onClick={handleCopy}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
      <button
        className="back-button button-hover"
        onClick={goBack}
      >
        Back
      </button>
    </div>
  );
});

export default SolveMissing;
