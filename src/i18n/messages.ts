import ru from './ru.json'
import uk from './uk.json'

export type Locale = 'en' | 'ru' | 'uk'
export type Translate = (
  message: string,
  values?: Record<string, string | number | undefined>,
) => string
const catalogs: Record<Exclude<Locale, 'en'>, Record<string, string>> = {
  ru,
  uk: uk satisfies Record<keyof typeof ru, string>,
}
export function translate(
  locale: Locale,
  message: string,
  values: Record<string, string | number | undefined> = {},
): string {
  const translated =
    locale === 'en' ? undefined : catalogs[locale][message.trim()]
  // Preserve spaces around inline text while keeping catalog keys whitespace-free.
  const template =
    translated === undefined
      ? message
      : message.replace(message.trim(), () => translated)
  return template.replace(/\{(\w+)\}/g, (placeholder: string, key: string) =>
    values[key] === undefined ? placeholder : String(values[key]),
  )
}
export const english: Translate = (message, values) =>
  translate('en', message, values)
export function normalizeLocale(value: string | null): Locale | undefined {
  const language = value?.toLowerCase().split(/[-_]/)[0]
  return language === 'ua'
    ? 'uk'
    : language === 'en' || language === 'ru' || language === 'uk'
      ? language
      : undefined
}
export const LANGUAGE_KEY = 'algo.language'
export function initialLocale(): Locale {
  try {
    const saved = normalizeLocale(localStorage.getItem(LANGUAGE_KEY))
    if (saved) return saved
  } catch {
    /* Storage may be disabled. */
  }
  for (const language of navigator.languages) {
    const locale = normalizeLocale(language)
    if (locale) return locale
  }
  return normalizeLocale(navigator.language) ?? 'en'
}
