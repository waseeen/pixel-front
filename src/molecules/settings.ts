import { atom } from 'jotai';

export const languageAtom = atom<string>(localStorage.getItem('lang') ?? 'ru');
