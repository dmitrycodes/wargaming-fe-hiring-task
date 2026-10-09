import { getSearchTerms } from './search';
import {
  shipCategories,
  shipClassKeys,
  shipTiers,
  type Ship,
  type ShipCategory,
  type ShipClassKey,
  type ShipTier,
} from './types';

export interface Filters {
  categories: ShipCategory[];
  tiers: ShipTier[];
  classes: ShipClassKey[];
  nations: string[];
  query: string;
}

export const filterUrlParams = {
  categories: 'categories',
  tiers: 'tiers',
  classes: 'classes',
  nations: 'nations',
  query: 'q',
} satisfies Record<keyof Filters, string>;

export const emptyFilters: Filters = {
  categories: [],
  tiers: [],
  classes: [],
  nations: [],
  query: '',
};

function matches<T>(selected: T[], value: T): boolean {
  return selected.length === 0 || selected.includes(value);
}

function matchesSearchTerms(terms: string[], searchString: string): boolean {
  return terms.every((term) => searchString.includes(term));
}

export function applyFilters(ships: Ship[], filters: Filters): Ship[] {
  if (!hasActiveFilters(filters)) {
    return ships;
  }

  const searchTerms = getSearchTerms(filters.query);

  return ships.filter((ship) => {
    return (
      matches(filters.categories, ship.category) &&
      matches(filters.tiers, ship.tier) &&
      matches(filters.classes, ship.classKey) &&
      matches(filters.nations, ship.nationKey) &&
      matchesSearchTerms(searchTerms, ship.searchString)
    );
  });
}

export function hasActiveFilters(filters: Filters): boolean {
  const { query, ...facetFilters } = filters;

  return (
    Object.values(facetFilters).some((values) => values.length !== 0) ||
    getSearchTerms(query).length > 0
  );
}

export function serializeFilters(filters: Filters): URLSearchParams {
  const params = new URLSearchParams();

  const categories = [...filters.categories].sort();
  for (const category of categories) {
    params.append(filterUrlParams.categories, category);
  }

  const tiers = [...filters.tiers].sort((a, b) => a - b);
  for (const tier of tiers) {
    params.append(filterUrlParams.tiers, tier.toString());
  }

  const classes = [...filters.classes].sort();
  for (const classKey of classes) {
    params.append(filterUrlParams.classes, classKey);
  }

  const nations = [...filters.nations].sort();
  for (const nation of nations) {
    params.append(filterUrlParams.nations, nation);
  }

  if (getSearchTerms(filters.query).length > 0) {
    params.append(filterUrlParams.query, filters.query.trim());
  }

  return params;
}

export function isOneOf<T extends string | number>(
  list: readonly T[],
  value: string | number,
): value is T {
  return (list as readonly (string | number)[]).includes(value);
}

export function parseFilters(search: string): Filters {
  const params = new URLSearchParams(search);
  const rawCategories = params.getAll(filterUrlParams.categories);
  const rawTiers = params.getAll(filterUrlParams.tiers);
  const rawClasses = params.getAll(filterUrlParams.classes);
  const rawNations = params.getAll(filterUrlParams.nations);
  const rawQuery = params.get(filterUrlParams.query)?.substring(0, 100) ?? '';

  const categories = rawCategories
    .filter((rawCategory) => isOneOf(shipCategories, rawCategory))
    .sort();

  const tiers = rawTiers
    .map(Number)
    .filter((rawTier) => isOneOf(shipTiers, rawTier))
    .sort((a, b) => a - b);

  const classes = rawClasses
    .filter((rawClass) => isOneOf(shipClassKeys, rawClass))
    .sort();

  const nations = rawNations.filter((rawNation) => rawNation !== '').sort();

  return {
    categories: [...new Set(categories)],
    tiers: [...new Set(tiers)],
    classes: [...new Set(classes)],
    nations: [...new Set(nations)],
    query: rawQuery,
  };
}
