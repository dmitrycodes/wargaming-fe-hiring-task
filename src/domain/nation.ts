import { getLocalizedText } from './locale';
import type { Nation } from './types';

export function getNationFullName(
  nation: Nation,
  locale: string,
): string | undefined {
  return getLocalizedText(nation.fullNames, locale);
}
