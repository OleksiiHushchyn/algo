import { createContext, useContext } from 'react'

export type CodeLanguage = 'pseudocode' | 'javascript' | 'java'
export const CODE_LANGUAGE_KEY = 'algo.codeLanguage'
export function isCodeLanguage(value: string | null): value is CodeLanguage {
  return value === 'pseudocode' || value === 'javascript' || value === 'java'
}
export function initialCodeLanguage(): CodeLanguage {
  try {
    const saved = localStorage.getItem(CODE_LANGUAGE_KEY)
    if (isCodeLanguage(saved)) return saved
  } catch {
    // The selector still works if browser storage is unavailable.
  }
  return 'pseudocode'
}
export const CodeLanguageContext = createContext<{
  language: CodeLanguage
  setLanguage: (language: CodeLanguage) => void
}>({ language: 'pseudocode', setLanguage: () => {} })
export const useCodeLanguage = () => useContext(CodeLanguageContext)
