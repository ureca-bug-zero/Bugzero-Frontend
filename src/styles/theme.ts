import { palette } from './palette';
import { typo } from './typo';

export interface TypeOfTheme {
  typo: TypeOfTypo;
  palette: TypeOfPalette;
}

export const theme: TypeOfTheme = {
  typo,
  palette,
};

export type TypeOfPalette = typeof palette; /*전체 구조*/
export type KeyOfPalette = keyof typeof palette; /*key만(props에서 사용)*/

export type TypeOfTypo = typeof typo;
export type KeyOfTypo = keyof typeof typo;
