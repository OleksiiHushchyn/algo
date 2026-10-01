import { useLanguage } from '@/i18n/context'
import { useState } from 'react'
import { traceFixedWindow, traceUniqueWindow } from './trace'

const values = [2, 1, 5, 1, 3, 2]
const text = 'abcaac'

export function WindowVisualizer({ mode }: { mode: 'fixed' | 'unique' }) {
  const { t } = useLanguage()

  const [size, setSize] = useState(3)
  const [stepIndex, setStepIndex] = useState(0)
  const fixed = mode === 'fixed'
  const items = fixed ? values : [...text]
  const steps = fixed
    ? traceFixedWindow(values, size, t)
    : traceUniqueWindow(text, t)
  const step = steps[stepIndex]!
  const complete = stepIndex === steps.length - 1
  return (
    <section
      className="visualizer"
      aria-label={t(
        fixed
          ? 'Interactive fixed-size window'
          : 'Interactive unique-character window',
      )}
    >
      <div className="section-topline">
        <span className="eyebrow">{t('See it happen')}</span>
        {fixed ? (
          <label className="target-select">
            {t('Window size ')}
            <select
              value={size}
              onChange={(event) => {
                setSize(Number(event.target.value))
                setStepIndex(0)
              }}
            >
              <option value={3}>{t('3 items')}</option>
              <option value={2}>{t('2 items')}</option>
              <option value={6}>{t('6 · whole array')}</option>
            </select>
          </label>
        ) : (
          <span className={`window-state ${step.valid ? 'valid' : 'invalid'}`}>
            {t(step.valid ? 'Unique · can measure' : 'Repeat · must shrink')}
          </span>
        )}
      </div>
      <div className="array-scroll">
        <div className="array-row">
          {items.map((value, index) => (
            <div className="array-item" key={index}>
              <span className="array-index">{index}</span>
              <span
                className={`array-value ${index >= step.left && index <= step.right ? (step.valid ? 'highlight' : 'window-invalid') : ''}`}
              >
                {value}
              </span>
              <span className="array-pointer">
                {[
                  index === step.left ? 'L' : '',
                  index === step.right ? 'R' : '',
                ]
                  .filter(Boolean)
                  .join('·')}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="window-metrics">
        <span>
          {t(fixed ? 'Current sum' : 'Current length')} <b>{step.value}</b>
        </span>
        <span>
          {t(fixed ? 'Best sum' : 'Best length')} <b>{step.best}</b>
        </span>
      </div>
      <p className="trace-message" role="status">
        {step.message}
        {complete
          ? t(
              fixed
                ? ' Done. Maximum sum: {best}.'
                : ' Done. Longest unique length: {best}.',
              { best: step.best },
            )
          : ''}
      </p>
      {complete && (
        <p className="window-result">
          {t('Best window: [{values}] · indices {left}–{right}', {
            values: items.slice(step.bestLeft, step.bestRight + 1).join(', '),
            left: step.bestLeft,
            right: step.bestRight,
          })}
        </p>
      )}
      <div className="visualizer-controls">
        <span className="small muted">
          {t('Step {current} of {total}', {
            current: stepIndex + 1,
            total: steps.length,
          })}
        </span>
        <div className="control-buttons">
          <button
            className="text-button"
            onClick={() => setStepIndex(0)}
            disabled={stepIndex === 0}
          >
            {t('Reset ')}
          </button>
          <button
            className="icon-button"
            aria-label={t('Previous step')}
            onClick={() => setStepIndex((index) => index - 1)}
            disabled={stepIndex === 0}
          >
            ←
          </button>
          <button
            className="primary-button"
            onClick={() => setStepIndex((index) => index + 1)}
            disabled={complete}
          >
            {t('Next step ')}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <p className="legend">
        {t('L = left edge · R = right edge · colored cells = current window ')}
        {!fixed && t(' · amber = repeat present')}
      </p>
    </section>
  )
}
