import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  emptyFacetFilters,
  filterUrlParams,
  parseFilters,
  serializeFilters,
  type FacetFilters,
  type Filters,
} from '../domain/filters';
import { useDebouncedValue } from './useDebouncedValue';

const DEBOUNCE_DELAY_MS = 300;

export function useFilters() {
  const [initialFilters] = useState(() => parseFilters(window.location.search));
  const { query, ...initialFacetFilters } = initialFilters;

  const [facetFilters, setFacetFilters] = useState(initialFacetFilters);
  const [searchQuery, setSearchQuery] = useState(query);
  const debouncedSearchQuery = useDebouncedValue(
    searchQuery,
    DEBOUNCE_DELAY_MS,
  );

  const effectiveFilters: Filters = useMemo(() => {
    return {
      ...facetFilters,
      query: debouncedSearchQuery,
    };
  }, [facetFilters, debouncedSearchQuery]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    for (const param of Object.values(filterUrlParams)) {
      params.delete(param);
    }

    const newParams = serializeFilters(effectiveFilters);
    for (const [key, value] of newParams) {
      params.append(key, value);
    }

    const newUrl = new URL(window.location.href);
    newUrl.search = params.toString();
    if (window.location.href !== newUrl.href) {
      history.replaceState(null, '', newUrl);
    }
  }, [effectiveFilters]);

  const setFilter = useCallback(
    <T extends keyof FacetFilters>(group: T, values: FacetFilters[T]) => {
      setFacetFilters((prev) => {
        return {
          ...prev,
          [group]: values,
        };
      });
    },
    [],
  );

  const reset = useCallback(() => {
    setFacetFilters(emptyFacetFilters);
    setSearchQuery('');
  }, []);

  return {
    filters: effectiveFilters,
    setFilter,
    reset,
    searchQuery,
    setSearchQuery,
  };
}
