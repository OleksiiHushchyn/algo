import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from '@/app/app'
import { patterns as binary } from '@/topics/binary-search/patterns'
import { patterns as pointers } from '@/topics/two-pointers/patterns'
import { patterns as windows } from '@/topics/sliding-window/patterns'
import { patterns as maps } from '@/topics/hash-maps/patterns'
import { traceSearch } from '@/topics/binary-search/trace'
import { tracePair } from '@/topics/two-pointers/trace'
import {
  traceFixedWindow,
  traceUniqueWindow,
} from '@/topics/sliding-window/trace'
import {
  tracePair as traceMapPair,
  tracePrefix,
} from '@/topics/hash-maps/trace'
import {
  initialLocale,
  LANGUAGE_KEY,
  normalizeLocale,
  translate,
  type Locale,
  type Translate,
} from './messages'
import ru from './ru.json'
import uk from './uk.json'

beforeEach(() => {
  localStorage.clear()
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['en-US'])
  vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US')
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  localStorage.clear()
  document.documentElement.lang = 'en'
})

function Location() {
  const location = useLocation()
  return (
    <span data-testid="location">
      {location.pathname}
      {location.search}
    </span>
  )
}
function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <Location />
    </MemoryRouter>,
  )
}

describe('language selection', () => {
  it('switches all UI languages and preserves the lesson, URL, and walkthrough step', async () => {
    const user = userEvent.setup()
    renderApp('/topics/binary-search?pattern=exact')
    await user.click(screen.getByRole('button', { name: 'Next step' }))
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Language' }),
      'ru',
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Бинарный поиск.',
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Найти значение',
    )
    expect(screen.getByRole('status')).toHaveTextContent('38 > 23. Отбросьте')
    expect(screen.getByText('Шаг 2 из 3')).toBeInTheDocument()
    expect(screen.getByTestId('location')).toHaveTextContent(
      '/topics/binary-search?pattern=exact',
    )
    expect(document.documentElement.lang).toBe('ru')
    expect(document.title).toBe('Algo — Шпаргалка по алгоритмам')
    expect(localStorage.getItem(LANGUAGE_KEY)).toBe('ru')
    expect(
      within(screen.getByRole('navigation', { name: 'Темы' })).getByText(
        'Стеки и очереди',
      ),
    ).toBeInTheDocument()
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Язык' }),
      'uk',
    )
    expect(screen.getByRole('status')).toHaveTextContent('38 > 23. Відкиньте')
    expect(screen.getByText('Крок 2 із 3')).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('uk')
    await user.click(screen.getByRole('button', { name: 'Наступний крок' }))
    expect(screen.getByRole('status')).toHaveTextContent(
      'Знайдено на індексі 5',
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Мова' }),
      'en',
    )
    expect(screen.getByRole('status')).toHaveTextContent('Found at index 5')
    expect(screen.getByRole('button', { name: 'Next step' })).toBeDisabled()
  })

  it('persists the chosen language across navigation and remounting', async () => {
    const user = userEvent.setup()
    const { unmount } = renderApp()
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Language' }),
      'uk',
    )
    await user.click(
      screen.getByRole('link', { name: 'Хеш-таблиці, 8 прийомів' }),
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Чи траплялося це раніше?',
    )
    unmount()
    renderApp('/topics/hash-maps?pattern=group')
    expect(screen.getByRole('combobox', { name: 'Мова' })).toHaveValue('uk')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Групувати за спільним ключем',
    )
    expect(
      screen.getByRole('link', { name: /Group Anagrams/ }),
    ).toHaveAttribute('href', 'https://leetcode.com/problems/group-anagrams/')
    expect(
      screen.getByLabelText('Групувати за спільним ключем: псевдокод'),
    ).toHaveTextContent('key')
  })

  it('accepts the ua alias and localizes the missing-page route', () => {
    localStorage.setItem(LANGUAGE_KEY, 'ua')
    renderApp('/missing')
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Сторінку не знайдено.',
    )
    expect(screen.getByRole('link', { name: 'На головну' })).toHaveAttribute(
      'href',
      '/',
    )
    expect(document.documentElement.lang).toBe('uk')
    expect(localStorage.getItem(LANGUAGE_KEY)).toBe('uk')
  })

  it('uses browser preferences, honors saved choices, and falls back to English', () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue([
      'fr-FR',
      'uk-UA',
      'ru-RU',
    ])
    expect(initialLocale()).toBe('uk')
    localStorage.setItem(LANGUAGE_KEY, 'ru')
    expect(initialLocale()).toBe('ru')
    localStorage.setItem(LANGUAGE_KEY, 'invalid')
    expect(initialLocale()).toBe('uk')
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['fr-FR'])
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('fr-FR')
    expect(initialLocale()).toBe('en')
    expect(normalizeLocale('RU-ru')).toBe('ru')
    expect(normalizeLocale('uk_UA')).toBe('uk')
  })

  it('continues switching languages when storage is blocked', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    const user = userEvent.setup()
    renderApp()
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Language' }),
      'ru',
    )
    expect(
      screen.getByRole('heading', { name: 'Изучайте темы' }),
    ).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('ru')
  })
})

describe.each(['ru', 'uk'] as const)(
  '%s lesson and walkthrough coverage',
  (locale) => {
    const t: Translate = (message, values) => translate(locale, message, values)
    const catalog: Record<string, string> = locale === 'ru' ? ru : uk
    it('translates every lesson explanation, step, label, and note', () => {
      for (const pattern of [...binary, ...pointers, ...windows, ...maps]) {
        const messages = [
          pattern.title,
          pattern.cue,
          pattern.level,
          pattern.question,
          pattern.idea,
          ...pattern.steps,
          pattern.caption,
          pattern.trap,
          pattern.timeNote,
          pattern.spaceNote,
          pattern.codeNote,
          ...(pattern.diagramRows?.map((row) => row.label) ?? []),
          ...pattern.tasks.map((task) => task.difficulty),
        ]
        for (const message of messages) {
          if (!message) continue
          expect(catalog[message], message).toBeTruthy()
          expect(t(message), message).toMatch(/[А-Яа-яІіЇїЄє]/)
        }
      }
    })

    it('translates every trace branch without changing algorithm results', () => {
      const traces = [
        (t?: Translate) => traceSearch([2, 5, 8], 5, t),
        (t?: Translate) => traceSearch([2, 5, 8], 7, t),
        (t?: Translate) => tracePair([1, 3, 4, 6, 8, 11], 10, t),
        (t?: Translate) => tracePair([1, 3], 1, t),
        (t?: Translate) => traceFixedWindow([2, 1, 5, 1, 3, 2], 3, t),
        (t?: Translate) => traceUniqueWindow('abcaac', t),
        (t?: Translate) => traceUniqueWindow('', t),
        (t?: Translate) => traceMapPair([4, 1, 7, 3], 10, t),
        (t?: Translate) => traceMapPair([3, 1, 7], 6, t),
        (t?: Translate) => tracePrefix([1, -1, 1], 1, t),
      ]
      for (const trace of traces) {
        const original = trace()
        const localized = trace(t)
        expect(localized).toHaveLength(original.length)
        localized.forEach((step, index) => {
          const { message, ...state } = step
          const { message: englishMessage, ...englishState } = original[index]!
          expect(state).toEqual(englishState)
          expect(message).not.toBe(englishMessage)
          expect(message).toMatch(/[А-Яа-яІіЇїЄє]/)
          expect(message).not.toMatch(/\{\w+\}/)
        })
      }
    })

    it.each([
      ['/topics/two-pointers', 'Interactive two pointers'],
      ['/topics/sliding-window', 'Interactive fixed-size window'],
      [
        '/topics/sliding-window?pattern=unique',
        'Interactive unique-character window',
      ],
      ['/topics/hash-maps?pattern=partner', 'Interactive pair lookup'],
      ['/topics/hash-maps?pattern=prefix', 'Interactive prefix-sum map'],
    ])('keeps controls working at %s', async (path, label) => {
      localStorage.setItem(LANGUAGE_KEY, locale)
      const user = userEvent.setup()
      renderApp(path)
      expect(screen.getByRole('region', { name: t(label) })).toBeInTheDocument()
      const first = screen.getByRole('status').textContent
      await user.click(screen.getByRole('button', { name: t('Next step') }))
      expect(screen.getByRole('status').textContent).not.toBe(first)
      await user.click(screen.getByRole('button', { name: t('Previous step') }))
      expect(screen.getByRole('status').textContent).toBe(first)
      await user.click(screen.getByRole('button', { name: t('Next step') }))
      await user.click(screen.getByRole('button', { name: t('Reset') }))
      expect(screen.getByRole('status').textContent).toBe(first)
    })
  },
)

it('keeps catalog keys and interpolation placeholders in sync', () => {
  expect(Object.keys(ru).sort()).toEqual(Object.keys(uk).sort())
  const placeholders = (value: string) =>
    [...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort()
  for (const catalog of [ru, uk]) {
    for (const [source, translated] of Object.entries(catalog)) {
      expect(translated.trim(), source).not.toBe('')
      expect(placeholders(translated), source).toEqual(placeholders(source))
    }
  }
})
it('falls back to English and preserves literal interpolation values and spaces', () => {
  for (const locale of ['en', 'ru', 'uk'] satisfies Locale[]) {
    expect(translate(locale, 'Unknown {value}', { value: '$& {other}' })).toBe(
      'Unknown $& {other}',
    )
  }
  expect(translate('uk', ' Next step ')).toBe(' Наступний крок ')
})
