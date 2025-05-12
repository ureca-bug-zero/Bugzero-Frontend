import { textPalette, bgPalette } from './palette';
import { typo } from './typo';

export interface TypeOfTheme {
  typo: TypeOfTypo;
  textPalette: TypeOfTextPalette;
  bgPalette: TypeOfBgPalette;
}

export const theme: TypeOfTheme = {
  typo,
  textPalette,
  bgPalette,
};

export type TypeOfTextPalette = typeof textPalette; /*전체 구조*/
export type KeyOfTextPalette =
  keyof typeof textPalette; /*key만(props에서 사용)*/

export type TypeOfBgPalette = typeof bgPalette;
export type KeyOfBgPalette = keyof typeof bgPalette;

export type TypeOfTypo = typeof typo;
export type KeyOfTypo = keyof typeof typo;
