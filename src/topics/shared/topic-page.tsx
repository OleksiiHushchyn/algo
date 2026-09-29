import { Link, useSearchParams } from 'react-router'
import type { ReactNode } from 'react'
import type { Pattern } from './types'

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
  const [params, setParams] = useSearchParams()
  const pattern =
    patterns.find((item) => item.id === params.get('pattern')) ?? patterns[0]!
  const patternIndex = patterns.indexOf(pattern)

  return (
    <>
      <div className="breadcrumb">
        <Link to="/">Topics</Link>
        <span>/</span>
        <span>{title}</span>
      </div>
      <header className="topic-heading">
        <div>
          <p className="eyebrow accent">
            Topic {number} · {category}
          </p>
          <h1>
            {title}
            <span className="accent">.</span>
          </h1>
          <p className="page-description">{description}</p>
        </div>
        <div className="topic-stamp" aria-hidden="true">
          {stamp}
          <span>{stampCaption}</span>
        </div>
      </header>
      <section
        className="recognition-banner"
        aria-label={`When to use ${title.toLowerCase()}`}
      >
        <span className="recognition-icon" aria-hidden="true">
          ↳
        </span>
        <div>
          <strong>The clue to look for</strong>
          <p>{clue}</p>
        </div>
      </section>
      <div className="lesson-layout">
        <nav className="pattern-navigation" aria-label={`${title} patterns`}>
          <div className="section-topline">
            <span className="eyebrow">Recognize the pattern</span>
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
                <strong>{item.title}</strong>
                <small>{item.cue}</small>
              </span>
              <span className="pattern-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
          <div className="margin-note">
            <span aria-hidden="true">✳</span>
            <p>
              New to this?
              <br />
              Start with patterns 01–03.
              <br />
              The rest build on them.
            </p>
          </div>
        </nav>
        <article
          key={pattern.id}
          className="pattern-content"
          aria-label={pattern.title}
        >
          <div className="pattern-heading">
            <span className="eyebrow accent">
              Pattern {String(patternIndex + 1).padStart(2, '0')}
            </span>
            <span
              className={`level-badge ${pattern.level === 'Start here' ? 'beginner' : ''}`}
            >
              {pattern.level}
            </span>
          </div>
          <h2>{pattern.title}</h2>
          <p className="example-question">{pattern.question}</p>
          <div className="idea-block">
            <h3>The idea</h3>
            <p>{pattern.idea}</p>
          </div>
          <ol className="steps-list">
            {pattern.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          {diagrams[pattern.id] ?? (
            <figure className="static-diagram">
              <span className="eyebrow">A tiny example</span>
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
                  {row.label && <p className="diagram-label">{row.label}</p>}
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
              <figcaption>{pattern.caption}</figcaption>
            </figure>
          )}
          <section className="code-section" aria-label="Pseudocode">
            <div className="code-title">
              <span>Pseudocode</span>
              <span>Plain logic · any language</span>
            </div>
            <pre tabIndex={0} aria-label={`${pattern.title} pseudocode`}>
              <code>
                {pattern.code.split('\n').map((line, index) => (
                  <span className="code-line" key={index}>
                    <span className="line-number" aria-hidden="true">
                      {index + 1}
                    </span>
                    <span
                      className={
                        line.trim().startsWith('//') ? 'code-comment' : ''
                      }
                    >
                      {line || ' '}
                    </span>
                  </span>
                ))}
              </code>
            </pre>
            <div className="code-footnote">
              {pattern.codeNote ??
                'A = array · indices start at 0 · floor = round down'}
            </div>
          </section>
          <div className="complexity-row">
            <span>
              <b>{pattern.time}</b> time
            </span>
            <span>
              <b>{pattern.space ?? 'O(1)'}</b> extra space
            </span>
          </div>
          <p className="complexity-note">
            {pattern.timeNote}{' '}
            {pattern.spaceNote ??
              'O(1) means a fixed number of extra variables.'}
          </p>
          <aside className="pitfall">
            <span aria-hidden="true">!</span>
            <div>
              <strong>Watch out</strong>
              <p>{pattern.trap}</p>
            </div>
          </aside>
          <section className="practice-section">
            <div className="section-topline">
              <h3>Put it into practice</h3>
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
                  {task.difficulty}
                </span>
                <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </section>
          <div className="lesson-footer">
            <span>
              {patternIndex + 1} / {patterns.length} patterns
            </span>
            {patterns[patternIndex + 1] ? (
              <button
                className="text-button"
                onClick={() => {
                  setParams({ pattern: patterns[patternIndex + 1]!.id })
                  window.scrollTo({ top: 0 })
                }}
              >
                Next: {patterns[patternIndex + 1]!.title} →
              </button>
            ) : (
              <button
                className="text-button"
                onClick={() => {
                  setParams({ pattern: patterns[0]!.id })
                  window.scrollTo({ top: 0 })
                }}
              >
                Back to the basics ↑
              </button>
            )}
          </div>
        </article>
      </div>
    </>
  )
}
