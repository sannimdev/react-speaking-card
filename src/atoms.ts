import { atom } from 'jotai';
import { IQuestion, ISubject } from './types';

export const subjectsAtom = atom<ISubject[]>([]);
export const allQuestionsAtom = atom<IQuestion[]>([]);

export const audioEasterEggAtom = atom(0);

export const audioAutoPlayAtom = atom(false);
