import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { App } from '@/app/app'
import { patterns as binary } from '../binary-search/patterns'
import { patterns as pointers } from '../two-pointers/patterns'
import { patterns as windows } from '../sliding-window/patterns'
import { patterns as maps } from '../hash-maps/patterns'
import { CodeBlock } from './code-block'
import { CodeLanguageProvider } from './code-language-provider'
import { CODE_LANGUAGE_KEY } from './code-language'

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('algo.language', 'en')
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  localStorage.clear()
})

function renderApp(path = '/topics/binary-search') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

it('keeps the choice through patterns, topics, remounts, and a switch back to pseudocode', async () => {
  const user = userEvent.setup()
  const app = renderApp()
  expect(screen.getByRole('combobox', { name: 'Code language' })).toHaveValue(
    'pseudocode',
  )
  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Code language' }),
    'javascript',
  )
  expect(localStorage.getItem(CODE_LANGUAGE_KEY)).toBe('javascript')
  await user.click(
    within(
      screen.getByRole('navigation', { name: 'Binary search patterns' }),
    ).getByRole('button', { name: /Find the first match/ }),
  )
  expect(
    screen.getByLabelText('Find the first match · JavaScript code'),
  ).toHaveTextContent('function lowerBound')
  await user.click(screen.getByRole('link', { name: 'Hash maps, 8 patterns' }))
  expect(
    screen.getByLabelText('Have I seen it before? · JavaScript code'),
  ).toHaveTextContent('new Set()')
  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Code language' }),
    'java',
  )
  expect(localStorage.getItem(CODE_LANGUAGE_KEY)).toBe('java')
  app.unmount()
  renderApp('/topics/sliding-window?pattern=cover')
  expect(screen.getByRole('combobox', { name: 'Code language' })).toHaveValue(
    'java',
  )
  expect(
    screen.getByLabelText('Cover every required character · Java code'),
  ).toHaveTextContent('class Solution')
  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Code language' }),
    'pseudocode',
  )
  expect(
    screen.getByLabelText('Cover every required character pseudocode'),
  ).toHaveTextContent('missing = length(t)')
  expect(localStorage.getItem(CODE_LANGUAGE_KEY)).toBe('pseudocode')
})

it('falls back from an invalid saved value', () => {
  localStorage.setItem(CODE_LANGUAGE_KEY, 'python')
  renderApp()
  expect(screen.getByRole('combobox', { name: 'Code language' })).toHaveValue(
    'pseudocode',
  )
})

it('still switches and navigates when local storage throws', async () => {
  const user = userEvent.setup()
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('blocked')
  })
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('full')
  })
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['en'])
  renderApp()
  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Code language' }),
    'java',
  )
  await user.click(
    screen.getByRole('link', { name: 'Two pointers, 8 patterns' }),
  )
  expect(screen.getByRole('combobox', { name: 'Code language' })).toHaveValue(
    'java',
  )
  expect(screen.getByLabelText('Find a pair · Java code')).toHaveTextContent(
    'static int[] findPair',
  )
})

it('keeps code choice independent of translated UI and preserves walkthrough state', async () => {
  const user = userEvent.setup()
  renderApp()
  await user.click(screen.getByRole('button', { name: 'Next step' }))
  const step = screen.getByRole('status').textContent
  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Code language' }),
    'java',
  )
  expect(screen.getByRole('status')).toHaveTextContent(step)
  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Language' }),
    'uk',
  )
  expect(screen.getByRole('combobox', { name: 'Мова коду' })).toHaveValue(
    'java',
  )
  expect(screen.getByRole('region', { name: 'Java' })).toHaveTextContent(
    'static int binarySearch',
  )
  expect(localStorage.getItem('algo.language')).toBe('uk')
  expect(localStorage.getItem(CODE_LANGUAGE_KEY)).toBe('java')
})

it.each([...binary, ...pointers, ...windows, ...maps])(
  'renders all three versions of $title',
  (pattern) => {
    render(
      <CodeLanguageProvider>
        <CodeBlock pattern={pattern} />
      </CodeLanguageProvider>,
    )
    expect(
      screen.getByRole('region', { name: 'Pseudocode' }),
    ).toBeInTheDocument()
    for (const [value, label] of [
      ['javascript', 'JavaScript'],
      ['java', 'Java'],
    ]) {
      fireEvent.change(
        screen.getByRole('combobox', { name: 'Code language' }),
        { target: { value } },
      )
      expect(screen.getByRole('region', { name: label })).toHaveTextContent(
        value === 'java' ? 'class Solution' : 'function ',
      )
    }
  },
)
