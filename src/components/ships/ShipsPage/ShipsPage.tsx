import { useMemo } from 'react';
import { useCatalog } from '../../../hooks/useCatalog';
import { Page } from '../../layout/Page';
import { normalize } from '../../../api/normalize';
import { ShipsCatalog } from '../ShipsCatalog';
import { ErrorState } from '../ErrorState';

export function ShipsPage() {
  const { data, status } = useCatalog();

  const normalizedCatalog = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return normalize(data);
  }, [data]);
  console.log('data', data);

  const isLoading = status === 'pending';
  const isError = status === 'error';

  return (
    <Page>
      <ShipsCatalog isLoading={isLoading} ships={normalizedCatalog?.ships} />
      {isError && <ErrorState />}
    </Page>
  );
}
