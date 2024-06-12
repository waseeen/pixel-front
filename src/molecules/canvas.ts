import { atom } from 'jotai';
import { Tile } from '../types/Tile';
import { Color } from '../types/Colors';

export const selectedTileAtom = atom<number | null>(null);
export const hoveredTileAtom = atom<{ x: number; y: number } | null>(null);
export const selectedColorAtom = atom<Color | null>(null);
export const cooldownAtom = atom(1000);

export const tilesAtom = atom<Tile[]>([]);
export const sizeAtom = atom<{ x: number; y: number }>({ x: 0, y: 0 });

export const nextCooldownAtom = atom(
  (Number(localStorage.getItem('cooldown') ?? 0) - Date.now()) / 1000,
);
