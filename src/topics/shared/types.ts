export type Pattern = {
  id: string
  title: string
  cue: string
  level: 'Start here' | 'Core' | 'Next step'
  question: string
  idea: string
  steps: string[]
  code: string
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
