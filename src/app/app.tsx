import { useLanguage } from '@/i18n/context'
import { LanguageProvider } from '@/i18n/language-provider'
import { LanguageSelector } from '@/i18n/language-selector'
import { NavLink, Route, Routes } from 'react-router'
import { HomePage } from '@/pages/home-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { BinarySearchPage } from '@/topics/binary-search/binary-search-page'
import { TwoPointersPage } from '@/topics/two-pointers/two-pointers-page'
import { SlidingWindowPage } from '@/topics/sliding-window/sliding-window-page'
import { HashMapsPage } from '@/topics/hash-maps/hash-maps-page'
import { CodeLanguageProvider } from '@/topics/shared/code-language-provider'
import { ExplanationProvider } from '@/topics/shared/explanation-provider'

function AppContent() {
  const { t } = useLanguage()

  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main')?.focus()
        }}
      >
        {t('Skip to content ')}
      </a>
      <aside className="sidebar">
        <NavLink to="/" className="brand" aria-label={t('Algo home')}>
          <span className="brand-icon" aria-hidden="true">
            a
          </span>
          algo<span className="brand-dot">.</span>
        </NavLink>
        <p className="brand-caption">
          {t('A pocket guide to problem solving.')}
        </p>
        <nav aria-label={t('Topics')}>
          <NavLink to="/" end className="all-topics">
            <span aria-hidden="true">▦</span>
            {t(' All topics')} <span aria-hidden="true">↗</span>
          </NavLink>
          <p className="sidebar-label">{t('THE FIELD GUIDE')}</p>
          <NavLink
            to="/topics/binary-search"
            aria-label={t('Binary search, 7 patterns')}
            className={({ isActive }) =>
              `topic-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="topic-symbol" aria-hidden="true">
              ⌕
            </span>
            {t('Binary search')}
            <span className="topic-count">7</span>
          </NavLink>
          <NavLink
            to="/topics/two-pointers"
            aria-label={t('Two pointers, 8 patterns')}
            className={({ isActive }) =>
              `topic-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="topic-symbol" aria-hidden="true">
              ⇄
            </span>
            {t('Two pointers')}
            <span className="topic-count">8</span>
          </NavLink>
          <NavLink
            to="/topics/sliding-window"
            aria-label={t('Sliding window, 7 patterns')}
            className={({ isActive }) =>
              `topic-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="topic-symbol" aria-hidden="true">
              ▭
            </span>
            {t('Sliding window')}
            <span className="topic-count">7</span>
          </NavLink>
          <NavLink
            to="/topics/hash-maps"
            aria-label={t('Hash maps, 8 patterns')}
            className={({ isActive }) =>
              `topic-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="topic-symbol" aria-hidden="true">
              #
            </span>
            {t('Hash maps')}
            <span className="topic-count">8</span>
          </NavLink>
          <p className="sidebar-label coming-label">{t('ON THE HORIZON')}</p>
          {['Stacks & queues', 'Trees & graphs', 'Dynamic programming'].map(
            (topic) => (
              <div className="upcoming-topic" key={topic}>
                <span aria-hidden="true">○</span>
                {t(topic)}
              </div>
            ),
          )}
        </nav>
        <div className="sidebar-bottom">
          <div className="edition-dot" />
          <span>
            {t('One topic at a time. ')}
            <br />
            <b>{t('Built for the aha! moment.')}</b>
          </span>
        </div>
      </aside>
      <div className="main-shell">
        <div className="topbar">
          <span>{t('THE ALGORITHM CHEAT SHEET')}</span>
          <LanguageSelector />
          <span className="topbar-note">
            <span className="live-dot" />
            {t('Small lessons. Clear patterns. ')}
          </span>
        </div>
        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/topics" element={<HomePage />} />
            <Route
              path="/topics/binary-search"
              element={<BinarySearchPage />}
            />
            <Route path="/topics/two-pointers" element={<TwoPointersPage />} />
            <Route
              path="/topics/sliding-window"
              element={<SlidingWindowPage />}
            />
            <Route path="/topics/hash-maps" element={<HashMapsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <span>
            algo.{' '}
            <span className="muted">
              {t('Less memorizing. More understanding.')}
            </span>
          </span>
          <span>{t('Made for curious minds ↗')}</span>
        </footer>
      </div>
    </div>
  )
}

export function App() {
  return (
    <LanguageProvider>
      <CodeLanguageProvider>
        <ExplanationProvider>
          <AppContent />
        </ExplanationProvider>
      </CodeLanguageProvider>
    </LanguageProvider>
  )
}
