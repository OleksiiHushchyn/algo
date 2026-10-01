import { createContext, useContext } from 'react'

export type ExplanationMode = 'compact' | 'detailed'
export const EXPLANATION_MODE_KEY = 'algo.explanationMode'
export function initialExplanationMode(): ExplanationMode {
  try {
    if (localStorage.getItem(EXPLANATION_MODE_KEY) === 'detailed')
      return 'detailed'
  } catch {
    // Use the compact default when storage is blocked.
  }
  return 'compact'
}
export const ExplanationContext = createContext<{
  mode: ExplanationMode
  setMode: (mode: ExplanationMode) => void
}>({ mode: 'compact', setMode: () => {} })
export const useExplanationMode = () => useContext(ExplanationContext)
