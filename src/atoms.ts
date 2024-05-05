import { atom } from 'jotai';
import { IQuestion } from './types';

export const questionsAtom = atom<IQuestion[]>([]);
