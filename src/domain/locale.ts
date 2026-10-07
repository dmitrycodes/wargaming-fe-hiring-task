const DEFAULT_LOCALE = 'en';

export function getLocalizedText(
  translations: Record<string, string>,
  locale: string,
): string | undefined {
  return translations[locale] ?? translations[DEFAULT_LOCALE];
}
