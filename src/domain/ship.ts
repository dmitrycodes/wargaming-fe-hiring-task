import {
  shipClassKeys,
  shipTiers,
  type Ship,
  type ShipCategory,
  type ShipClassKey,
  type ShipTier,
} from './types';
import { getLocalizedText } from './locale';
import { normalizeSearchString } from './search';

export function deriveShipCategory(tags: string[]): ShipCategory {
  if (tags.includes('uiPremium')) {
    return 'premium';
  }

  if (tags.includes('uiSpecial')) {
    return 'special';
  }

  return 'tech-tree';
}

export function deriveShipClassKey(tags: string[]): ShipClassKey | undefined {
  return shipClassKeys.find((shipClassKey) => tags.includes(shipClassKey));
}

export function deriveShipTier(level: number): ShipTier | undefined {
  return shipTiers.find((shipTier) => shipTier === level);
}

export function isShipHidden(tags: string[]): boolean {
  return tags.some((tag) => tag.startsWith('catalogueHidden'));
}

export function getShipFullName(
  ship: Ship,
  locale: string,
): string | undefined {
  return getLocalizedText(ship.fullNames, locale);
}

export function getShipShortName(
  ship: Ship,
  locale: string,
): string | undefined {
  return getLocalizedText(ship.shortNames, locale);
}

export function deriveShipSearchString(
  shortTranslations: Record<string, string>,
  fullTranslations: Record<string, string>,
) {
  const searchString = [
    getLocalizedText(shortTranslations, 'en'),
    getLocalizedText(fullTranslations, 'en'),
  ]
    .filter(Boolean)
    .join(' ');

  return normalizeSearchString(searchString);
}
