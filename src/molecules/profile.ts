import { atom } from 'jotai';
import { ProfileData } from '../types/ProfileData';

export const profileAtom = atom<ProfileData | null>(null);
