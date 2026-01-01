import React, { useState, useCallback, memo } from "react";

const GenerateSequence = memo(({ sequenceType, goBack }) => {
  const [initialTerm, setInitialTerm] = useState("");
  const [commonDifferenceOrRatio, setCommonDifferenceOrRatio] = useState("");
  const [numberOfTerms, setNumberOfTerms] = useState("");
  const [generatedSequence, setGeneratedSequence] = useState([]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const sequenceGenerated = generateSequence(
      sequenceType === "alphabet"
        ? initialTerm.toUpperCase()
        : Number(initialTerm),
      Number(commonDifferenceOrRatio),
      Number(numberOfTerms),
      sequenceType
    );
    setGeneratedSequence(sequenceGenerated);
  }, [initialTerm, commonDifferenceOrRatio, numberOfTerms, sequenceType]);

  const generateSequence = useCallback((
    initialTerm,
    commonDifferenceOrRatio,
    numberOfTerms,
    sequenceType
  ) => {
    let result = [];
    switch (sequenceType) {
      case "arithmetic":
        for (let i = 0; i < numberOfTerms; i++) {
          result.push(initialTerm + i * commonDifferenceOrRatio);
        }
        break;
      case "geometric":
        for (let i = 0; i < numberOfTerms; i++) {
          result.push(initialTerm * Math.pow(commonDifferenceOrRatio, i));
        }
        break;
      case "alphabet": {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let index = alphabet.indexOf(initialTerm);
        for (let i = 0; i < numberOfTerms; i++) {
          result.push(
            alphabet[(index + i * commonDifferenceOrRatio) % alphabet.length]
          );
        }
        break;
      }
      default:
        throw new Error("Unknown sequence type");
    }
    return result;
  }, []);

  const handleCopy = useCallback(() => {
    const text = generatedSequence.join(", ");
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied to clipboard"))
      .catch((err) => console.error("Failed to copy text: ", err));
  }, [generatedSequence]);

  return (
    <div className="sequence-page fade-in">
      <motion.h2>{`Generate ${
        sequenceType.charAt(0).toUpperCase() + sequenceType.slice(1)
      } Sequence`}</motion.h2>
      <form onSubmit={handleSubmit} className="sequence-form">
        <div>
          <label>Initial Term:</label>
          <input
            type={sequenceType === "alphabet" ? "text" : "number"}
            value={initialTerm}
            onChange={(event) => setInitialTerm(event.target.value)}
            required
            placeholder={sequenceType === "alphabet" ? "e.g.: A" : "e.g.: 1"}
          />
        </div>

        <div>
          <label>
            {sequenceType === "arithmetic"
              ? "Common Difference"
              : sequenceType === "geometric"
              ? "Common Ratio"
              : "Step"}
          </label>
          <input
            type="number"
            value={commonDifferenceOrRatio}
            onChange={(event) => setCommonDifferenceOrRatio(event.target.value)}
            required
            placeholder="e.g.: 2"
          />
        </div>
        <div>
          <label>Number of Terms:</label>
          <input
            type="number"
            value={numberOfTerms}
            onChange={(event) => setNumberOfTerms(event.target.value)}
            required
            placeholder="e.g.: 5"
          />
        </div>

        <button
          className="button-hover"
          type="submit"
        >
          Generate
        </button>
      </form>
      {generatedSequence.length > 0 && (
        <div>
          <h3>Generated Sequence:</h3>
          <ul>
            {generatedSequence.map((num, index) => (
              <li key={index} className="list-item-hover">
                {num}
              </li>
            ))}
          </ul>
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

export default GenerateSequence;
