import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { App } from '@/app/app'

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('algorithm field guide', () => {
  it('opens binary search from the topic list', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole('link', { name: /01 \/ Start here/ }))
    expect(
      screen.getByRole('heading', { level: 1, name: 'Binary search.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: 'Interactive binary search' }),
    ).toBeInTheDocument()
  })

  it('walks to a match, goes back, and resets when the target changes', async () => {
    const user = userEvent.setup()
    renderApp('/topics/binary-search')
    expect(screen.getByRole('button', { name: 'Previous step' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Next step' }))
    await user.click(screen.getByRole('button', { name: 'Next step' }))
    expect(screen.getByRole('status')).toHaveTextContent('Found at index 5')
    expect(screen.getByRole('button', { name: 'Next step' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Previous step' }))
    expect(screen.getByRole('status')).toHaveTextContent('38 > 23')
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Find' }),
      '13',
    )
    expect(screen.getByRole('button', { name: 'Previous step' })).toBeDisabled()
    while (
      !screen
        .getByRole('button', { name: 'Next step' })
        .hasAttribute('disabled')
    ) {
      await user.click(screen.getByRole('button', { name: 'Next step' }))
    }
    expect(screen.getByRole('status')).toHaveTextContent('not found')
    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByRole('status')).toHaveTextContent('16 > 13')
  })

  it('switches patterns and shows the matching theory, code, and practice', async () => {
    const user = userEvent.setup()
    renderApp('/topics/binary-search')
    await user.click(screen.getByRole('button', { name: /Search the answer/ }))
    expect(
      screen.getByRole('heading', { level: 2, name: 'Search the answer' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Search possible answers instead of array positions/),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('Search the answer pseudocode'),
    ).toHaveTextContent('function works(speed)')
    expect(
      screen.getByRole('link', { name: /Koko Eating Bananas/ }),
    ).toHaveAttribute(
      'href',
      'https://leetcode.com/problems/koko-eating-bananas/',
    )
    expect(
      screen.queryByRole('region', { name: 'Interactive binary search' }),
    ).not.toBeInTheDocument()
  })

  it('supports a directly linked pattern and defaults safely for unknown patterns', () => {
    const { unmount } = renderApp('/topics/binary-search?pattern=range')
    expect(
      screen.getByRole('heading', { level: 2, name: 'Find a duplicate range' }),
    ).toBeInTheDocument()
    unmount()
    renderApp('/topics/binary-search?pattern=unknown')
    expect(
      screen.getByRole('heading', { level: 2, name: 'Find a value' }),
    ).toBeInTheDocument()
  })

  it('offers a way home from an unknown route', async () => {
    const user = userEvent.setup()
    renderApp('/missing')
    await user.click(screen.getByRole('link', { name: 'Back to home' }))
    expect(
      screen.getByRole('heading', { name: 'Explore the topics' }),
    ).toBeInTheDocument()
  })
})

describe('two pointers topic', () => {
  it('opens from the topic list and keeps binary search available', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole('link', { name: /02 \/ Keep moving/ }))
    expect(
      screen.getByRole('heading', { level: 1, name: 'Two pointers.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: 'Interactive two pointers' }),
    ).toBeInTheDocument()
    await user.click(
      screen.getByRole('link', { name: 'Binary search, 7 patterns' }),
    )
    expect(
      screen.getByRole('heading', { level: 1, name: 'Binary search.' }),
    ).toBeInTheDocument()
  })

  it('finds a pair, resets, and refuses to reuse a single item', async () => {
    const user = userEvent.setup()
    renderApp('/topics/two-pointers')
    const next = () => screen.getByRole('button', { name: 'Next step' })
    for (let i = 0; i < 8 && !next().hasAttribute('disabled'); i += 1)
      await user.click(next())
    expect(screen.getByRole('status')).toHaveTextContent(
      'Found a pair at indices 2 and 3',
    )
    expect(next()).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Previous step' }))
    expect(screen.getByRole('status')).toHaveTextContent('Move L right')
    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByRole('status')).toHaveTextContent('1 + 11 = 12')
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Target sum' }),
      '2',
    )
    expect(screen.getByRole('button', { name: 'Previous step' })).toBeDisabled()
    for (let i = 0; i < 8 && !next().hasAttribute('disabled'); i += 1)
      await user.click(next())
    expect(screen.getByRole('status')).toHaveTextContent('No pair found')
  })

  it('opens linked-list patterns directly and selects other examples', async () => {
    const user = userEvent.setup()
    renderApp('/topics/two-pointers?pattern=fast-slow')
    expect(
      screen.getByRole('heading', { level: 2, name: 'Use different speeds' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: /D loops back to B/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Linked List Cycle/ }),
    ).toHaveAttribute(
      'href',
      'https://leetcode.com/problems/linked-list-cycle/',
    )
    await user.click(
      screen.getByRole('button', { name: /Fix one, find a pair/ }),
    )
    expect(
      screen.getByLabelText('Fix one, find a pair pseudocode'),
    ).toHaveTextContent('sort A ascending')
    expect(screen.getByText('O(s + k)')).toBeInTheDocument()
    await user.click(
      within(
        screen.getByRole('navigation', { name: 'Two pointers patterns' }),
      ).getByRole('button', { name: /Move the limiting side/ }),
    )
    expect(
      screen.getByRole('img', { name: /Walls of heights/ }),
    ).toBeInTheDocument()
  })
})
