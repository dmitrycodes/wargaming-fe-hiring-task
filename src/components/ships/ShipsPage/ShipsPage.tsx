import { useMemo } from 'react';
import { useCatalog } from '../../../hooks/useCatalog';
import { Page } from '../../layout/Page';
import { normalize } from '../../../api/normalize';
import { LoadingState } from '../LoadingState';
import { ErrorState } from '../ErrorState';

export function ShipsPage() {
  const { data, status, refetch } = useCatalog();

  const normalizedCatalog = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return normalize(data);
  }, [data]);

  const isLoading = status === 'pending' || true;
  const isError = status === 'error';

  return (
    <Page>
      {isLoading && <LoadingState />}
      {isError && <ErrorState />}
    </Page>
  );
}
