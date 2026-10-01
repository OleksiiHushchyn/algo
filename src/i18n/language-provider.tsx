import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext } from './context'
import {
  initialLocale,
  LANGUAGE_KEY,
  translate,
  type Locale,
  type Translate,
} from './messages'
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const t = useMemo<Translate>(
    () => (message, values) => translate(locale, message, values),
    [locale],
  )
  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t('Algo — Algorithm cheat sheet')
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        t(
          'A compact algorithm cheat sheet. Recognize binary search, two-pointer, sliding-window, and hash-map patterns with clear examples, pseudocode, and interactive walkthroughs.',
        ),
      )
    try {
      localStorage.setItem(LANGUAGE_KEY, locale)
    } catch {
      /* Keep working without persistence. */
    }
  }, [locale, t])
  return (
    <LanguageContext value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext>
  )
}
