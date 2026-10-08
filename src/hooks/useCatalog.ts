import { useCallback, useEffect, useState } from 'react';
import { fetchCatalog, type RawCatalog } from '../api/catalog';
import { toApiError, type ApiError } from '../api/errors';

interface SuccessCatalogOutcome {
  status: 'success';
  data: RawCatalog;
}

interface PendingCatalogOutcome {
  status: 'pending';
}

interface ErrorCatalogOutcome {
  status: 'error';
  error: ApiError;
}

type CatalogOutcome =
  SuccessCatalogOutcome | PendingCatalogOutcome | ErrorCatalogOutcome;

type UseCatalogResult = CatalogOutcome & {
  data: RawCatalog | undefined;
  fetching: boolean;
  refetch: () => void;
};

export function useCatalog(): UseCatalogResult {
  const [refetchCounter, setRefetchCounter] = useState(0);
  const refetch = useCallback(() => {
    setRefetchCounter((oldRefetchCounter) => {
      return oldRefetchCounter + 1;
    });
  }, []);

  const [state, setState] = useState<
    CatalogOutcome & {
      counter: number;
    }
  >({ status: 'pending', counter: 0 });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRawCatalog() {
      try {
        const catalog = await fetchCatalog({ signal: controller.signal });

        if (controller.signal.aborted) {
          return;
        }

        setState({
          status: 'success',
          counter: refetchCounter,
          data: catalog,
        });
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          status: 'error',
          counter: refetchCounter,
          error: toApiError(err, 'unknown'),
        });
      }
    }

    void fetchRawCatalog();

    return () => {
      controller.abort();
    };
  }, [refetchCounter]);

  const { counter, ...cleanState } = state;

  return {
    data: undefined,
    ...cleanState,
    refetch,
    fetching: counter !== refetchCounter || cleanState.status === 'pending', // initially counter and refetchCounter both equal to 0 so pending status is checked
  };
}
