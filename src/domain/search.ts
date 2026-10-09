export function normalizeSearchString(s: string): string {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

export function getSearchTerms(query: string): string[] {
  const normalizedQuery = normalizeSearchString(query);

  return normalizedQuery.length === 0 ? [] : normalizedQuery.split(' ');
}
