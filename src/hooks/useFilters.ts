import { useCallback, useEffect, useState } from 'react';
import {
  emptyFilters,
  filterUrlParams,
  parseFilters,
  serializeFilters,
  type Filters,
} from '../domain/filters';

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

  const setFilter = useCallback(
    <T extends keyof Filters>(group: T, values: Filters[T]) => {
      setFilters((prev) => {
        return {
          ...prev,
          [group]: values,
        };
      });
    },
    [],
  );

  const reset = useCallback(() => {
    setFilters(emptyFilters);
  }, []);

  return {
    filters,
    setFilter,
    reset,
  };
}
