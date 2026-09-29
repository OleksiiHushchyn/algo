import { NavLink, Route, Routes } from 'react-router'
import { HomePage } from '@/pages/home-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { BinarySearchPage } from '@/topics/binary-search/binary-search-page'
import { TwoPointersPage } from '@/topics/two-pointers/two-pointers-page'
import { SlidingWindowPage } from '@/topics/sliding-window/sliding-window-page'
import { HashMapsPage } from '@/topics/hash-maps/hash-maps-page'

export function App() {
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
        Skip to content
      </a>
      <aside className="sidebar">
        <NavLink to="/" className="brand" aria-label="Algo home">
          <span className="brand-icon" aria-hidden="true">
            a
          </span>
          algo<span className="brand-dot">.</span>
        </NavLink>
        <p className="brand-caption">A pocket guide to problem solving.</p>
        <nav aria-label="Topics">
          <NavLink to="/" end className="all-topics">
            <span aria-hidden="true">▦</span> All topics{' '}
            <span aria-hidden="true">↗</span>
          </NavLink>
          <p className="sidebar-label">THE FIELD GUIDE</p>
          <NavLink
            to="/topics/binary-search"
            aria-label="Binary search, 7 patterns"
            className={({ isActive }) =>
              `topic-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="topic-symbol" aria-hidden="true">
              ⌕
            </span>
            Binary search<span className="topic-count">7</span>
          </NavLink>
          <NavLink
            to="/topics/two-pointers"
            aria-label="Two pointers, 8 patterns"
            className={({ isActive }) =>
              `topic-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="topic-symbol" aria-hidden="true">
              ⇄
            </span>
            Two pointers<span className="topic-count">8</span>
          </NavLink>
          <NavLink
            to="/topics/sliding-window"
            aria-label="Sliding window, 7 patterns"
            className={({ isActive }) =>
              `topic-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="topic-symbol" aria-hidden="true">
              ▭
            </span>
            Sliding window<span className="topic-count">7</span>
          </NavLink>
          <NavLink
            to="/topics/hash-maps"
            aria-label="Hash maps, 8 patterns"
            className={({ isActive }) =>
              `topic-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="topic-symbol" aria-hidden="true">
              #
            </span>
            Hash maps<span className="topic-count">8</span>
          </NavLink>
          <p className="sidebar-label coming-label">ON THE HORIZON</p>
          {['Stacks & queues', 'Trees & graphs', 'Dynamic programming'].map(
            (topic) => (
              <div className="upcoming-topic" key={topic}>
                <span aria-hidden="true">○</span>
                {topic}
              </div>
            ),
          )}
        </nav>
        <div className="sidebar-bottom">
          <div className="edition-dot" />
          <span>
            One topic at a time.
            <br />
            <b>Built for the aha! moment.</b>
          </span>
        </div>
      </aside>
      <div className="main-shell">
        <div className="topbar">
          <span>THE ALGORITHM CHEAT SHEET</span>
          <span className="topbar-note">
            <span className="live-dot" />
            Small lessons. Clear patterns.
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
            <span className="muted">Less memorizing. More understanding.</span>
          </span>
          <span>Made for curious minds ↗</span>
        </footer>
      </div>
    </div>
  )
}
