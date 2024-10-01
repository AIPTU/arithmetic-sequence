/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import React, { useState } from "react";

const GenerateSequence = ({ sequenceType, goBack }) => {
  const [initialTerm, setInitialTerm] = useState("");
  const [commonDifferenceOrRatio, setCommonDifferenceOrRatio] = useState("");
  const [numberOfTerms, setNumberOfTerms] = useState("");
  const [generatedSequence, setGeneratedSequence] = useState([]);

  const handleSubmit = (event) => {
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
  };

  const generateSequence = (
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
        throw new Error("Tipe urutan tidak diketahui");
    }
    return result;
  };

  const handleCopy = () => {
    const text = generatedSequence.join(", ");
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Disalin ke clipboard"))
      .catch((err) => console.error("Gagal menyalin teks: ", err));
  };

  return (
    <motion.div
      className="sequence-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2>{`Buat ${
        sequenceType.charAt(0).toUpperCase() + sequenceType.slice(1)
      } Urutan`}</motion.h2>
      <form onSubmit={handleSubmit} className="sequence-form">
        <div>
          <label>Suku Awal:</label>
          <input
            type={sequenceType === "alphabet" ? "text" : "number"}
            value={initialTerm}
            onChange={(event) => setInitialTerm(event.target.value)}
            required
            placeholder={sequenceType === "alphabet" ? "contoh: A" : "contoh: 1"}
          />
        </div>

        <div>
          <label>
            {sequenceType === "arithmetic"
              ? "Selisih Umum"
              : sequenceType === "geometric"
              ? "Rasio Umum"
              : "Langkah"}
          </label>
          <input
            type="number"
            value={commonDifferenceOrRatio}
            onChange={(event) => setCommonDifferenceOrRatio(event.target.value)}
            required
            placeholder="contoh: 2"
          />
        </div>
        <div>
          <label>Jumlah Suku:</label>
          <input
            type="number"
            value={numberOfTerms}
            onChange={(event) => setNumberOfTerms(event.target.value)}
            required
            placeholder="contoh: 5"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          type="submit"
        >
          Buat
        </motion.button>
      </form>
      {generatedSequence.length > 0 && (
        <div>
          <h3>Urutan yang Dihasilkan:</h3>
          <motion.ul>
            {generatedSequence.map((num, index) => (
              <motion.li key={index} whileHover={{ scale: 1.1 }}>
                {num}
              </motion.li>
            ))}
          </motion.ul>
          <motion.button
            className="back-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={handleCopy}
          >
            Salin ke Clipboard
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
        Kembali
      </motion.button>
    </motion.div>
  );
};

export default GenerateSequence;
