import { useMemo } from 'react';
import { useCatalog } from '../../../hooks/useCatalog';
import { Page } from '../../layout/Page';
import { normalize } from '../../../api/normalize';

export function ShipsPage() {
  const { data, status, refetch } = useCatalog();

  const normalizedCatalog = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return normalize(data);
  }, [data]);

  console.log(normalizedCatalog);

  return (
    <Page>
      <div></div>
    </Page>
  );
}
