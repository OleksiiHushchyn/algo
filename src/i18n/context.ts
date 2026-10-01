import { createContext, useContext } from 'react'
import { english, type Locale, type Translate } from './messages'
export const LanguageContext = createContext<{
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translate
}>({ locale: 'en', setLocale: () => {}, t: english })
export const useLanguage = () => useContext(LanguageContext)
