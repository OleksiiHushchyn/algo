import { useLanguage } from '@/i18n/context'
import { Link, useSearchParams } from 'react-router'
import type { ReactNode } from 'react'
import type { Pattern } from './types'
import { CodeBlock } from './code-block'
import { ExplanationSelector } from './explanation-selector'
import { useExplanationMode } from './explanation-mode'
import { DetailedExplanation } from './detailed-explanation'

type TopicPageProps = {
  title: string
  number: string
  category: string
  description: string
  stamp: string
  stampCaption: string
  clue: string
  patterns: Pattern[]
  diagrams: Record<string, ReactNode>
}

export function TopicPage({
  title,
  number,
  category,
  description,
  stamp,
  stampCaption,
  clue,
  patterns,
  diagrams,
}: TopicPageProps) {
  const { t } = useLanguage()
  const { mode } = useExplanationMode()

  const [params, setParams] = useSearchParams()
  const pattern =
    patterns.find((item) => item.id === params.get('pattern')) ?? patterns[0]!
  const patternIndex = patterns.indexOf(pattern)

  return (
    <>
      <div className="breadcrumb">
        <Link to="/">{t('Topics')}</Link>
        <span>/</span>
        <span>{t(title)}</span>
      </div>
      <header className="topic-heading">
        <div>
          <p className="eyebrow accent">
            {t('Topic {number} · {category}', {
              number,
              category: t(category),
            })}
          </p>
          <h1>
            {t(title)}
            <span className="accent">.</span>
          </h1>
          <p className="page-description">{t(description)}</p>
        </div>
        <div className="topic-stamp" aria-hidden="true">
          {stamp}
          <span>{t(stampCaption)}</span>
        </div>
      </header>
      <section
        className="recognition-banner"
        aria-label={t('When to use {title}', { title: t(title).toLowerCase() })}
      >
        <span className="recognition-icon" aria-hidden="true">
          ↳
        </span>
        <div>
          <strong>{t('The clue to look for')}</strong>
          <p>{t(clue)}</p>
        </div>
      </section>
      <div className="lesson-layout">
        <nav
          className="pattern-navigation"
          aria-label={t('{title} patterns', { title: t(title) })}
        >
          <div className="section-topline">
            <span className="eyebrow">{t('Recognize the pattern')}</span>
            <span className="count">
              {String(patterns.length).padStart(2, '0')}
            </span>
          </div>
          {patterns.map((item, index) => (
            <button
              key={item.id}
              className={`pattern-button ${item.id === pattern.id ? 'selected' : ''}`}
              aria-current={item.id === pattern.id ? 'true' : undefined}
              onClick={() =>
                setParams({ pattern: item.id }, { preventScrollReset: true })
              }
            >
              <span className="pattern-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>
                <strong>{t(item.title)}</strong>
                <small>{t(item.cue)}</small>
              </span>
              <span className="pattern-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
          <div className="margin-note">
            <span aria-hidden="true">✳</span>
            <p>
              {t('New to this? ')}
              <br />
              {t('Start with patterns 01–03. ')}
              <br />
              {t('The rest build on them. ')}
            </p>
          </div>
        </nav>
        <article
          key={pattern.id}
          className="pattern-content"
          aria-label={t(pattern.title)}
        >
          <div className="pattern-heading">
            <span className="eyebrow accent">
              {t('Pattern {number}', {
                number: String(patternIndex + 1).padStart(2, '0'),
              })}
            </span>
            <span
              className={`level-badge ${pattern.level === 'Start here' ? 'beginner' : ''}`}
            >
              {t(pattern.level)}
            </span>
          </div>
          <h2>{t(pattern.title)}</h2>
          <p className="example-question">{t(pattern.question)}</p>
          <ExplanationSelector />
          {mode === 'compact' ? (
            <>
              <div className="idea-block">
                <h3>{t('The idea')}</h3>
                <p>{t(pattern.idea)}</p>
              </div>
              <ol className="steps-list">
                {pattern.steps.map((step) => (
                  <li key={step}>{t(step)}</li>
                ))}
              </ol>
            </>
          ) : (
            <DetailedExplanation content={pattern.detailed} />
          )}
          {diagrams[pattern.id] ?? (
            <figure className="static-diagram">
              <span className="eyebrow">{t('A tiny example')}</span>
              {(
                pattern.diagramRows ?? [
                  {
                    label: '',
                    values: pattern.values,
                    highlight: pattern.highlight,
                  },
                ]
              ).map((row, rowIndex) => (
                <div key={rowIndex}>
                  {row.label && <p className="diagram-label">{t(row.label)}</p>}
                  <div className="array-scroll">
                    <div className="array-row">
                      {row.values.map((value, index) => (
                        <div className="array-item" key={index}>
                          <span className="array-index">{index}</span>
                          <span
                            className={`array-value ${row.highlight.includes(index) ? 'highlight' : ''}`}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <figcaption>{t(pattern.caption)}</figcaption>
            </figure>
          )}
          <CodeBlock pattern={pattern} />
          <div className="complexity-row">
            <span>
              <b>{pattern.time}</b>
              {t(' time ')}
            </span>
            <span>
              <b>{pattern.space ?? 'O(1)'}</b>
              {t(' extra space ')}
            </span>
          </div>
          <p className="complexity-note">
            {t(pattern.timeNote)}{' '}
            {t(
              pattern.spaceNote ??
                'O(1) means a fixed number of extra variables.',
            )}
          </p>
          <aside className="pitfall">
            <span aria-hidden="true">!</span>
            <div>
              <strong>{t('Watch out')}</strong>
              <p>{t(pattern.trap)}</p>
            </div>
          </aside>
          <section className="practice-section">
            <div className="section-topline">
              <h3>{t('Put it into practice')}</h3>
              <span className="small muted">LeetCode ↗</span>
            </div>
            {pattern.tasks.map((task) => (
              <a
                className="practice-link"
                key={task.id}
                href={`https://leetcode.com/problems/${task.slug}/`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="task-id">{task.id}</span>
                <strong>{task.title}</strong>
                <span className={`difficulty ${task.difficulty.toLowerCase()}`}>
                  {t(task.difficulty)}
                </span>
                <span aria-hidden="true">↗</span>
                <span className="sr-only">{t(' (opens in a new tab)')}</span>
              </a>
            ))}
          </section>
          <div className="lesson-footer">
            <span>
              {t('{current} / {total} patterns', {
                current: patternIndex + 1,
                total: patterns.length,
              })}
            </span>
            {patterns[patternIndex + 1] ? (
              <button
                className="text-button"
                onClick={() => {
                  setParams({ pattern: patterns[patternIndex + 1]!.id })
                  window.scrollTo({ top: 0 })
                }}
              >
                {t('Next: {title} →', {
                  title: t(patterns[patternIndex + 1]!.title),
                })}
              </button>
            ) : (
              <button
                className="text-button"
                onClick={() => {
                  setParams({ pattern: patterns[0]!.id })
                  window.scrollTo({ top: 0 })
                }}
              >
                {t('Back to the basics ↑ ')}
              </button>
            )}
          </div>
        </article>
      </div>
    </>
  )
}
