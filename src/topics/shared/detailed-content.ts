import type { Locale } from '@/i18n/messages'

export type DetailedContent = {
  picture: string
  steps: string[]
  why: string
  code: string
}
export type LocalizedDetail = Record<Locale, DetailedContent>

// Each text has English, Ukrainian, and Russian versions in that order.
type Text = [string, string, string]
export function detail(
  picture: Text,
  steps: Text[],
  why: Text,
  code: Text,
): LocalizedDetail {
  const make = (index: number): DetailedContent => ({
    picture: picture[index]!,
    steps: steps.map((step) => step[index]!),
    why: why[index]!,
    code: code[index]!,
  })
  return { en: make(0), uk: make(1), ru: make(2) }
}
