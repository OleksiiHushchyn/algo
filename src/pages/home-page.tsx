import { useLanguage } from '@/i18n/context'
import { Link } from 'react-router'

export function HomePage() {
  const { t } = useLanguage()

  return (
    <>
      <div className="breadcrumb">
        <span>{t('Your field guide')}</span>
        <span>/</span>
        <span>{t('Topics')}</span>
      </div>
      <header className="home-heading">
        <p className="eyebrow accent">
          {t('A little clarity goes a long way')}
        </p>
        <h1>
          {t('Find the pattern. ')}
          <br />
          {t('Know the next step')}
          <span className="accent">.</span>
        </h1>
        <p className="page-description">
          {t(
            'Short explanations. Visual examples. Just enough theory to get you unstuck. ',
          )}
        </p>
      </header>
      <div className="section-topline topic-list-heading">
        <h2>{t('Explore the topics')}</h2>
        <span className="small muted">{t('04 ready to explore')}</span>
      </div>
      <Link to="/topics/binary-search" className="featured-topic">
        <div className="featured-illustration" aria-hidden="true">
          <div>
            <i />
            <i />
            <i />
            <i className="marked" />
            <i />
            <i />
            <i />
          </div>
          <div>
            <i />
            <i className="marked" />
            <i />
          </div>
          <div>
            <i className="marked" />
          </div>
        </div>
        <div>
          <span className="eyebrow accent">{t('01 / Start here')}</span>
          <h2>{t('Binary search')}</h2>
          <p>
            {t(
              'Cut the possibilities in half. Learn to spot sorted arrays, boundaries, and hidden search spaces. ',
            )}
          </p>
          <div className="topic-tags">
            <span>{t('7 patterns')}</span>
            <span>{t('Interactive walkthrough')}</span>
            <span>{t('9 practice problems')}</span>
          </div>
        </div>
        <span className="featured-arrow" aria-hidden="true">
          ↗
        </span>
      </Link>
      <Link to="/topics/two-pointers" className="featured-topic second-topic">
        <div
          className="featured-illustration pointer-illustration"
          aria-hidden="true"
        >
          <span>→</span>
          <div>
            <i className="marked" />
            <i />
            <i />
            <i />
            <i className="marked" />
          </div>
          <span>←</span>
        </div>
        <div>
          <span className="eyebrow accent">{t('02 / Keep moving')}</span>
          <h2>{t('Two pointers')}</h2>
          <p>
            {t(
              'Track two positions with a purpose. Find pairs, compare sequences, and make one pass do more. ',
            )}
          </p>
          <div className="topic-tags">
            <span>{t('8 patterns')}</span>
            <span>{t('Interactive walkthrough')}</span>
            <span>{t('10 practice problems')}</span>
          </div>
        </div>
        <span className="featured-arrow" aria-hidden="true">
          ↗
        </span>
      </Link>
      <Link to="/topics/sliding-window" className="featured-topic second-topic">
        <div
          className="featured-illustration window-illustration"
          aria-hidden="true"
        >
          <div>
            <i className="marked" />
            <i className="marked" />
            <i className="marked" />
            <i />
            <i />
          </div>
          <span>→</span>
          <div>
            <i />
            <i className="marked" />
            <i className="marked" />
            <i className="marked" />
            <i />
          </div>
        </div>
        <div>
          <span className="eyebrow accent">{t('03 / Reuse the work')}</span>
          <h2>{t('Sliding window')}</h2>
          <p>
            {t(
              'Find the right continuous stretch. Slide fixed windows, grow and shrink flexible ones, and keep useful counts. ',
            )}
          </p>
          <div className="topic-tags">
            <span>{t('7 patterns')}</span>
            <span>{t('2 interactive walkthroughs')}</span>
            <span>{t('8 practice problems')}</span>
          </div>
        </div>
        <span className="featured-arrow" aria-hidden="true">
          ↗
        </span>
      </Link>
      <Link to="/topics/hash-maps" className="featured-topic second-topic">
        <div
          className="featured-illustration hash-illustration"
          aria-hidden="true"
        >
          <span>
            a <b>→</b> 2
          </span>
          <span>
            b <b>→</b> 1
          </span>
          <span>
            c <b>→</b> 3
          </span>
        </div>
        <div>
          <span className="eyebrow accent">
            {t('04 / Remember what matters')}
          </span>
          <h2>{t('Hash maps')}</h2>
          <p>
            {t(
              'Remember useful facts with keys and values. Spot duplicates, find partners, count copies, and group similar items. ',
            )}
          </p>
          <div className="topic-tags">
            <span>{t('8 patterns')}</span>
            <span>{t('2 interactive walkthroughs')}</span>
            <span>{t('10 practice problems')}</span>
          </div>
        </div>
        <span className="featured-arrow" aria-hidden="true">
          ↗
        </span>
      </Link>
      <div className="future-grid">
        {[
          { name: 'Stacks & queues', hint: 'Choose what comes next.' },
          { name: 'Trees & graphs', hint: 'Follow the connections.' },
          { name: 'Dynamic programming', hint: 'Build on smaller answers.' },
        ].map((topic) => (
          <div className="future-card" key={topic.name}>
            <span className="eyebrow">{t('Coming later')}</span>
            <h3>{t(topic.name)}</h3>
            <p>{t(topic.hint)}</p>
          </div>
        ))}
      </div>
      <aside className="home-note">
        <span aria-hidden="true">✳</span>
        <p>
          {t('You don’t need to memorize every solution. ')}
          <br />
          <strong>
            {t('Learn what to look for. The pattern does the heavy lifting. ')}
          </strong>
        </p>
      </aside>
    </>
  )
}
