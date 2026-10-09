import { useCallback, useEffect, useState } from 'react';
import {
  emptyFilters,
  filterUrlParams,
  parseFilters,
  serializeFilters,
  toggleValue,
} from '../domain/filters';
import type { ShipCategory, ShipClassKey, ShipTier } from '../domain/types';

export function useFilters() {
  const [filters, setFilters] = useState(() =>
    parseFilters(window.location.search),
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    for (const param of Object.values(filterUrlParams)) {
      params.delete(param);
    }

    const newParams = serializeFilters(filters);
    for (const [key, value] of newParams) {
      params.append(key, value);
    }

    const newUrl = new URL(window.location.href);
    newUrl.search = params.toString();
    if (window.location.href !== newUrl.href) {
      history.replaceState(null, '', newUrl);
    }
  }, [filters]);

  const toggleCategoryFilter = useCallback((category: ShipCategory) => {
    setFilters((prev) => {
      return {
        ...prev,
        categories: toggleValue(prev.categories, category),
      };
    });
  }, []);

  const toggleTierFilter = useCallback((tier: ShipTier) => {
    setFilters((prev) => {
      return {
        ...prev,
        tiers: toggleValue(prev.tiers, tier),
      };
    });
  }, []);

  const toggleClassFilter = useCallback((classKey: ShipClassKey) => {
    setFilters((prev) => {
      return {
        ...prev,
        classes: toggleValue(prev.classes, classKey),
      };
    });
  }, []);

  const toggleNationFilter = useCallback((nation: string) => {
    setFilters((prev) => {
      return {
        ...prev,
        nations: toggleValue(prev.nations, nation),
      };
    });
  }, []);

  const reset = useCallback(() => {
    setFilters(emptyFilters);
  }, []);

  return {
    filters,
    toggleCategoryFilter,
    toggleTierFilter,
    toggleClassFilter,
    toggleNationFilter,
    reset,
  };
}
