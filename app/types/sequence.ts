export type SequenceType = 'arithmetic' | 'geometric' | 'alphabet';

export interface SolveResult {
    solvedArray: (string | number)[];
    details: string;
}