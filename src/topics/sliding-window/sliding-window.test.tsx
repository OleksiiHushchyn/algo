import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { App } from '@/app/app'

function renderApp(path = '/topics/sliding-window') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('sliding window lesson', () => {
  it('opens from the topic list and links to the existing topics', async () => {
    const user = userEvent.setup()
    renderApp('/')
    await user.click(screen.getByRole('link', { name: /03 \/ Reuse the work/ }))
    expect(
      screen.getByRole('heading', { level: 1, name: 'Sliding window.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Sliding window, 7 patterns' }),
    ).toHaveAttribute('aria-current', 'page')
    await user.click(
      screen.getByRole('link', { name: 'Two pointers, 8 patterns' }),
    )
    expect(
      screen.getByRole('heading', { level: 1, name: 'Two pointers.' }),
    ).toBeInTheDocument()
  })

  it('slides, goes back, resets, and handles a whole-array window', async () => {
    const user = userEvent.setup()
    renderApp()
    expect(screen.getByRole('status')).toHaveTextContent('sum = 8')
    for (let index = 0; index < 3; index += 1)
      await user.click(screen.getByRole('button', { name: 'Next step' }))
    expect(screen.getByRole('status')).toHaveTextContent('Maximum sum: 9')
    expect(screen.getByText(/Best window: \[5, 1, 3\]/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next step' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Previous step' }))
    expect(screen.getByRole('status')).toHaveTextContent('= 9')
    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByRole('button', { name: 'Previous step' })).toBeDisabled()
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Window size' }),
      '6',
    )
    expect(screen.getByRole('status')).toHaveTextContent('Maximum sum: 14')
    expect(screen.getByRole('button', { name: 'Next step' })).toBeDisabled()
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Window size' }),
      '2',
    )
    expect(screen.getByRole('status')).toHaveTextContent('sum = 3')
    expect(screen.getByRole('button', { name: 'Next step' })).toBeEnabled()
  })

  it('shows invalid windows, shrinks repeatedly, and measures only after repair', async () => {
    const user = userEvent.setup()
    renderApp('/topics/sliding-window?pattern=unique')
    expect(
      screen.getByRole('region', {
        name: 'Interactive unique-character window',
      }),
    ).toBeInTheDocument()
    for (let index = 0; index < 3; index += 1)
      await user.click(screen.getByRole('button', { name: 'Next step' }))
    expect(screen.getByText('Repeat · must shrink')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('It now repeats')
    await user.click(screen.getByRole('button', { name: 'Next step' }))
    expect(screen.getByText('Unique · can measure')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Next step' }))
    await user.click(screen.getByRole('button', { name: 'Next step' }))
    expect(screen.getByRole('status')).toHaveTextContent('shrink again')
    for (let index = 0; index < 3; index += 1)
      await user.click(screen.getByRole('button', { name: 'Next step' }))
    expect(screen.getByRole('status')).toHaveTextContent(
      'Longest unique length: 3',
    )
    expect(screen.getByRole('button', { name: 'Next step' })).toBeDisabled()
  })

  it('supports pattern deep links, challenge difficulty, and unknown-pattern fallback', async () => {
    const user = userEvent.setup()
    const { unmount } = renderApp('/topics/sliding-window?pattern=anagrams')
    expect(
      screen.getByRole('link', { name: /Find All Anagrams/ }),
    ).toHaveAttribute(
      'href',
      'https://leetcode.com/problems/find-all-anagrams-in-a-string/',
    )
    await user.click(
      within(
        screen.getByRole('navigation', { name: 'Sliding window patterns' }),
      ).getByRole('button', { name: /Cover every required character/ }),
    )
    expect(
      screen.getByLabelText('Cover every required character pseudocode'),
    ).toHaveTextContent('missing = length(t)')
    expect(
      screen.getByRole('link', { name: /Minimum Window Substring/ }),
    ).toHaveTextContent('Hard')
    unmount()
    renderApp('/topics/sliding-window?pattern=unknown')
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Keep a fixed-size window',
      }),
    ).toBeInTheDocument()
  })
})
