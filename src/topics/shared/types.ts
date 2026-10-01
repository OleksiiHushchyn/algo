import type { CodeExamples } from './code-examples'
import type { LocalizedDetail } from './detailed-content'

export type Pattern = {
  id: string
  title: string
  cue: string
  level: 'Start here' | 'Core' | 'Next step'
  question: string
  idea: string
  steps: string[]
  code: string
  codeExamples: CodeExamples
  detailed: LocalizedDetail
  values: string[]
  highlight: number[]
  caption: string
  trap: string
  time: string
  timeNote: string
  space?: string
  spaceNote?: string
  codeNote?: string
  diagramRows?: { label: string; values: string[]; highlight: number[] }[]
  tasks: {
    id: number
    title: string
    slug: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
  }[]
}
