import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HashRouter } from 'react-router'
import { afterEach, describe, expect, it } from 'vitest'
import { App } from '@/app/app'

afterEach(() => window.history.replaceState(null, '', '/'))

describe('GitHub Pages routing', () => {
  it('opens a shared pattern URL under the repository path and survives remounting', async () => {
    const user = userEvent.setup()
    window.history.replaceState(
      null,
      '',
      '/algo/#/topics/binary-search?pattern=range',
    )
    const { unmount } = render(
      <HashRouter>
        <App />
      </HashRouter>,
    )
    expect(
      screen.getByRole('heading', { name: 'Find a duplicate range' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Skip to content' }))
    expect(screen.getByRole('main')).toHaveFocus()
    expect(window.location.hash).toBe('#/topics/binary-search?pattern=range')

    await user.click(screen.getByRole('button', { name: /Search the answer/ }))
    const sharedUrl = window.location.href
    expect(window.location.pathname).toBe('/algo/')
    expect(window.location.hash).toContain('?pattern=answer')
    unmount()

    render(
      <HashRouter>
        <App />
      </HashRouter>,
    )
    expect(window.location.href).toBe(sharedUrl)
    expect(
      screen.getByRole('heading', { name: 'Search the answer' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Algo home' }))
    expect(window.location.pathname).toBe('/algo/')
    expect(window.location.hash).toBe('#/')
    expect(
      screen.getByRole('heading', { name: 'Explore the topics' }),
    ).toBeInTheDocument()
  })
})
