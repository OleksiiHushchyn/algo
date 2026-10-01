import { useEffect, useState, type ReactNode } from 'react'
import {
  EXPLANATION_MODE_KEY,
  ExplanationContext,
  initialExplanationMode,
} from './explanation-mode'

export function ExplanationProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState(initialExplanationMode)
  useEffect(() => {
    try {
      localStorage.setItem(EXPLANATION_MODE_KEY, mode)
    } catch {
      // Keep the in-memory preference even if persistence is unavailable.
    }
  }, [mode])
  return (
    <ExplanationContext value={{ mode, setMode }}>
      {children}
    </ExplanationContext>
  )
}
