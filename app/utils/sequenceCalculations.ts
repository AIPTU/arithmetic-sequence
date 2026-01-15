import { SequenceType, SolveResult } from '../types/sequence';

export function generateSequence(
    initialTerm: string | number,
    commonDifferenceOrRatio: number,
    numberOfTerms: number,
    sequenceType: SequenceType
): (string | number)[] {
    const result: (string | number)[] = [];

    switch (sequenceType) {
        case 'arithmetic': {
            const initial = Number(initialTerm);
            for (let i = 0; i < numberOfTerms; i++) {
                result.push(initial + i * commonDifferenceOrRatio);
            }
            break;
        }
        case 'geometric': {
            const initial = Number(initialTerm);
            for (let i = 0; i < numberOfTerms; i++) {
                result.push(initial * Math.pow(commonDifferenceOrRatio, i));
            }
            break;
        }
        case 'alphabet': {
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const initial = String(initialTerm).toUpperCase();
            const index = alphabet.indexOf(initial);

            for (let i = 0; i < numberOfTerms; i++) {
                const newIndex = (index + i * commonDifferenceOrRatio) % alphabet.length;
                result.push(alphabet[newIndex >= 0 ? newIndex : newIndex + alphabet.length]);
            }
            break;
        }
    }

    return result;
}

export function validateSequence(
    sequence: (string | number | null)[],
    type: SequenceType
): void {
    const isNumeric = (x: string | number | null): boolean =>
        x !== null && !isNaN(parseFloat(String(x))) && isFinite(Number(x));

    const isAlphabetic = (x: string | number | null): boolean =>
        x !== null && /^[a-zA-Z]+$/.test(String(x));

    const hasInvalidNumber = sequence.some(
        (x) => x !== null && type !== 'alphabet' && !isNumeric(x)
    );

    const hasInvalidLetter = sequence.some(
        (x) => x !== null && type === 'alphabet' && !isAlphabetic(x)
    );

    if (hasInvalidNumber || hasInvalidLetter) {
        throw new Error(
            `Invalid input: Only ${type === 'alphabet' ? 'letters' : 'numbers'} are allowed for ${type} sequence.`
        );
    }
}

export function solveSequence(
    sequence: (string | number | null)[],
    type: SequenceType
): SolveResult {
    const solvedSequence = [...sequence];

    switch (type) {
        case 'arithmetic': {
            const diff = findArithmeticDifference(solvedSequence);
            if (diff === null) throw new Error('Cannot find common difference.');

            const filled = fillMissingTermsArithmetic(solvedSequence, diff);
            return {
                solvedArray: filled,
                details: `The common difference is ${diff}.`,
            };
        }
        case 'geometric': {
            const ratio = findGeometricRatio(solvedSequence);
            if (ratio === null) throw new Error('Cannot find common ratio.');

            const filled = fillMissingTermsGeometric(solvedSequence, ratio);
            return {
                solvedArray: filled,
                details: `The common ratio is ${ratio}.`,
            };
        }
        case 'alphabet': {
            const diff = findAlphabetDifference(solvedSequence);
            if (diff === null) throw new Error('Cannot find common letter difference.');

            const filled = fillMissingTermsAlphabet(solvedSequence, diff);
            return {
                solvedArray: filled,
                details: `The common letter difference is ${diff}.`,
            };
        }
    }
}

function findArithmeticDifference(sequence: (string | number | null)[]): number | null {
    for (let i = 1; i < sequence.length; i++) {
        if (sequence[i] !== null && sequence[i - 1] !== null) {
            return Number(sequence[i]) - Number(sequence[i - 1]);
        }
    }
    return null;
}

function fillMissingTermsArithmetic(
    sequence: (string | number | null)[],
    diff: number
): (string | number)[] {
    const result = [...sequence];
    for (let i = 1; i < result.length; i++) {
        if (result[i] === null) {
            result[i] = Number(result[i - 1]) + diff;
        }
    }
    return result as (string | number)[];
}

function findGeometricRatio(sequence: (string | number | null)[]): number | null {
    for (let i = 1; i < sequence.length; i++) {
        if (sequence[i] !== null && sequence[i - 1] !== null) {
            return Number(sequence[i]) / Number(sequence[i - 1]);
        }
    }
    return null;
}

function fillMissingTermsGeometric(
    sequence: (string | number | null)[],
    ratio: number
): (string | number)[] {
    const result = [...sequence];
    for (let i = 1; i < result.length; i++) {
        if (result[i] === null) {
            result[i] = Number(result[i - 1]) * ratio;
        }
    }
    return result as (string | number)[];
}

function findAlphabetDifference(sequence: (string | number | null)[]): number | null {
    for (let i = 1; i < sequence.length; i++) {
        if (sequence[i] !== null && sequence[i - 1] !== null) {
            return String(sequence[i]).charCodeAt(0) - String(sequence[i - 1]).charCodeAt(0);
        }
    }
    return null;
}

function fillMissingTermsAlphabet(
    sequence: (string | number | null)[],
    diff: number
): (string | number)[] {
    const result = [...sequence];
    for (let i = 1; i < result.length; i++) {
        if (result[i] === null) {
            const prevCharCode = String(result[i - 1]).charCodeAt(0);
            result[i] = String.fromCharCode(prevCharCode + diff);
        }
    }
    return result as (string | number)[];
}
