import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { App } from '@/app/app'
import { LanguageContext } from '@/i18n/context'
import { translate } from '@/i18n/messages'
import { patterns as binary } from '../binary-search/patterns'
import { patterns as pointers } from '../two-pointers/patterns'
import { patterns as windows } from '../sliding-window/patterns'
import { patterns as maps } from '../hash-maps/patterns'
import { DetailedExplanation } from './detailed-explanation'
import { EXPLANATION_MODE_KEY } from './explanation-mode'

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('algo.language', 'en')
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  localStorage.clear()
})
function renderApp(path = '/topics/hash-maps?pattern=partner') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

it('defaults to compact and switches without resetting code or walkthrough state', async () => {
  const user = userEvent.setup()
  renderApp()
  expect(screen.getByRole('radio', { name: 'Compact' })).toBeChecked()
  expect(screen.getByText(maps[1]!.idea)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Next step' }))
  const step = screen.getByRole('status').textContent
  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Code language' }),
    'java',
  )
  await user.click(screen.getByRole('radio', { name: 'Detailed' }))
  const detail = screen.getByRole('region', { name: 'Detailed explanation' })
  expect(
    within(detail).getByText(maps[1]!.detailed.en.picture),
  ).toBeInTheDocument()
  expect(screen.queryByText(maps[1]!.idea)).not.toBeInTheDocument()
  expect(screen.getByRole('status')).toHaveTextContent(step)
  expect(screen.getByRole('combobox', { name: 'Code language' })).toHaveValue(
    'java',
  )
  expect(localStorage.getItem(EXPLANATION_MODE_KEY)).toBe('detailed')
  await user.click(screen.getByRole('radio', { name: 'Compact' }))
  expect(screen.getByText(maps[1]!.idea)).toBeInTheDocument()
  expect(
    screen.queryByRole('region', { name: 'Detailed explanation' }),
  ).not.toBeInTheDocument()
  expect(screen.getByRole('status')).toHaveTextContent(step)
  expect(localStorage.getItem(EXPLANATION_MODE_KEY)).toBe('compact')
})

it('remembers detailed mode across patterns, topics, home, and a fresh app mount', async () => {
  const user = userEvent.setup()
  const app = renderApp()
  await user.click(screen.getByRole('radio', { name: 'Detailed' }))
  await user.click(
    within(
      screen.getByRole('navigation', { name: 'Hash maps patterns' }),
    ).getByRole('button', { name: /Count target-sum subarrays/ }),
  )
  expect(screen.getByText(maps[6]!.detailed.en.picture)).toBeInTheDocument()
  await user.click(screen.getByRole('link', { name: 'Algo home' }))
  await user.click(screen.getByRole('link', { name: /01 \/ Start here/ }))
  expect(screen.getByText(binary[0]!.detailed.en.picture)).toBeInTheDocument()
  expect(screen.getByRole('radio', { name: 'Detailed' })).toBeChecked()
  app.unmount()
  renderApp('/topics/sliding-window?pattern=cover')
  expect(screen.getByText(windows[6]!.detailed.en.picture)).toBeInTheDocument()
  expect(screen.getByRole('radio', { name: 'Detailed' })).toBeChecked()
})

it('supports keyboard selection and keeps locale, mode, and code preferences independent', async () => {
  const user = userEvent.setup()
  renderApp()
  screen.getByRole('radio', { name: 'Compact' }).focus()
  await user.keyboard('{ArrowRight}')
  expect(screen.getByRole('radio', { name: 'Detailed' })).toBeChecked()
  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Language' }),
    'uk',
  )
  expect(screen.getByRole('radio', { name: 'Докладно' })).toBeChecked()
  expect(screen.getByText(maps[1]!.detailed.uk.picture)).toBeInTheDocument()
  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Мова коду' }),
    'javascript',
  )
  expect(localStorage.getItem('algo.language')).toBe('uk')
  expect(localStorage.getItem('algo.codeLanguage')).toBe('javascript')
  expect(localStorage.getItem(EXPLANATION_MODE_KEY)).toBe('detailed')
})

it('falls back to compact for an invalid stored mode', () => {
  localStorage.setItem(EXPLANATION_MODE_KEY, 'unknown')
  renderApp()
  expect(screen.getByRole('radio', { name: 'Compact' })).toBeChecked()
})

it('keeps working across topics when storage is unavailable', async () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('blocked')
  })
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('blocked')
  })
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['en'])
  const user = userEvent.setup()
  renderApp()
  await user.click(screen.getByRole('radio', { name: 'Detailed' }))
  await user.click(
    screen.getByRole('link', { name: 'Two pointers, 8 patterns' }),
  )
  expect(screen.getByRole('radio', { name: 'Detailed' })).toBeChecked()
  expect(screen.getByText(pointers[0]!.detailed.en.picture)).toBeInTheDocument()
})

const lessons = [...binary, ...pointers, ...windows, ...maps]
it.each(
  lessons.flatMap((pattern) =>
    (['en', 'uk', 'ru'] as const).map((locale) => ({
      pattern,
      locale,
      title: pattern.title,
    })),
  ),
)(
  'renders the complete $locale detailed lesson for $title',
  ({ pattern, locale }) => {
    render(
      <LanguageContext
        value={{
          locale,
          setLocale: () => {},
          t: (text, values) => translate(locale, text, values),
        }}
      >
        <DetailedExplanation content={pattern.detailed} />
      </LanguageContext>,
    )
    const lesson = pattern.detailed[locale]
    expect(screen.getByText(lesson.picture)).toBeInTheDocument()
    expect(screen.getByText(lesson.why)).toBeInTheDocument()
    expect(screen.getByText(lesson.code)).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(lesson.steps.length)
    expect(lesson.steps.length).toBeGreaterThanOrEqual(3)
    if (locale !== 'en') {
      for (const text of [
        lesson.picture,
        ...lesson.steps,
        lesson.why,
        lesson.code,
      ])
        expect(text).toMatch(/[А-Яа-яІіЇїЄє]/)
    }
  },
)
