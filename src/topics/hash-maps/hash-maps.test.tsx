import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { App } from '@/app/app'

function renderApp(path = '/topics/hash-maps') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('hash maps lesson', () => {
  it('opens from home, selects the sidebar link, and preserves earlier topics', async () => {
    const user = userEvent.setup()
    renderApp('/')
    await user.click(
      screen.getByRole('link', { name: /04 \/ Remember what matters/ }),
    )
    expect(
      screen.getByRole('heading', { level: 1, name: 'Hash maps.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Hash maps, 8 patterns' }),
    ).toHaveAttribute('aria-current', 'page')
    expect(
      screen.getByRole('heading', { level: 2, name: 'Have I seen it before?' }),
    ).toBeInTheDocument()
    await user.click(
      screen.getByRole('link', { name: 'Sliding window, 7 patterns' }),
    )
    expect(
      screen.getByRole('heading', { level: 1, name: 'Sliding window.' }),
    ).toBeInTheDocument()
  })

  it('steps through the pair map, goes back, resets, and handles index zero and no pair', async () => {
    const user = userEvent.setup()
    renderApp('/topics/hash-maps?pattern=partner')
    const next = () => screen.getByRole('button', { name: 'Next step' })
    expect(screen.getByRole('status')).toHaveTextContent('empty map')
    await user.click(next())
    expect(screen.getByRole('table')).toHaveTextContent('Empty map')
    await user.click(next())
    expect(screen.getByRole('row', { name: '4 0' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Previous step' }))
    expect(screen.getByRole('table')).toHaveTextContent('Empty map')
    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByRole('button', { name: 'Previous step' })).toBeDisabled()
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Example' }),
      '1',
    )
    for (let i = 0; i < 3; i++) await user.click(next())
    expect(screen.getByRole('status')).toHaveTextContent(
      'Answer: indices 0 and 1',
    )
    expect(next()).toBeDisabled()
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Example' }),
      '3',
    )
    expect(screen.getByRole('status')).toHaveTextContent('empty map')
    for (let i = 0; i < 7; i++) await user.click(next())
    expect(screen.getByRole('status')).toHaveTextContent(
      'No pair of different indices',
    )
    expect(next()).toBeDisabled()
  })

  it('shows repeated prefix counts and resets when the pattern changes', async () => {
    const user = userEvent.setup()
    renderApp('/topics/hash-maps?pattern=prefix')
    expect(screen.getByRole('row', { name: '0 1' })).toBeInTheDocument()
    for (let i = 0; i < 6; i++)
      await user.click(screen.getByRole('button', { name: 'Next step' }))
    expect(screen.getByRole('status')).toHaveTextContent('3 subarrays sum to 1')
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Example' }),
      '2',
    )
    expect(screen.getByRole('status')).toHaveTextContent('Seed 0')
    for (let i = 0; i < 6; i++)
      await user.click(screen.getByRole('button', { name: 'Next step' }))
    expect(screen.getByRole('status')).toHaveTextContent('6 subarrays sum to 0')
    expect(screen.getByRole('row', { name: '0 4' })).toBeInTheDocument()
    const navigation = screen.getByRole('navigation', {
      name: 'Hash maps patterns',
    })
    await user.click(
      within(navigation).getByRole('button', {
        name: /Find the missing partner/,
      }),
    )
    expect(screen.getByRole('status')).toHaveTextContent('empty map')
  })

  it('supports practice links, pattern navigation, and unknown-pattern fallback', async () => {
    const user = userEvent.setup()
    const { unmount } = renderApp('/topics/hash-maps?pattern=group')
    expect(
      screen.getByRole('link', { name: /Group Anagrams/ }),
    ).toHaveAttribute('href', 'https://leetcode.com/problems/group-anagrams/')
    await user.click(
      within(
        screen.getByRole('navigation', { name: 'Hash maps patterns' }),
      ).getByRole('button', { name: /Keep a one-to-one mapping/ }),
    )
    expect(screen.getByRole('link', { name: /Word Pattern/ })).toHaveAttribute(
      'href',
      'https://leetcode.com/problems/word-pattern/',
    )
    expect(
      screen.getByLabelText('Keep a one-to-one mapping pseudocode'),
    ).toHaveTextContent('backward')
    unmount()
    renderApp('/topics/hash-maps?pattern=unknown')
    expect(
      screen.getByRole('heading', { level: 2, name: 'Have I seen it before?' }),
    ).toBeInTheDocument()
  })
})
