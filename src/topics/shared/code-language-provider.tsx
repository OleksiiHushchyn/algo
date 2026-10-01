import { useEffect, useState, type ReactNode } from 'react'
import {
  CODE_LANGUAGE_KEY,
  CodeLanguageContext,
  initialCodeLanguage,
} from './code-language'

export function CodeLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(initialCodeLanguage)
  useEffect(() => {
    try {
      localStorage.setItem(CODE_LANGUAGE_KEY, language)
    } catch {
      // Keep the in-memory choice even when storage is blocked or full.
    }
  }, [language])
  return (
    <CodeLanguageContext value={{ language, setLanguage }}>
      {children}
    </CodeLanguageContext>
  )
}
