import { useLanguage } from '@/i18n/context'
import { useState } from 'react'
import { tracePair } from './trace'

const values = [1, 3, 4, 6, 8, 11]

export function PairVisualizer() {
  const { t } = useLanguage()

  const [target, setTarget] = useState(10)
  const [stepIndex, setStepIndex] = useState(0)
  const steps = tracePair(values, target, t)
  const step = steps[stepIndex]!
  return (
    <section className="visualizer" aria-label={t('Interactive two pointers')}>
      <div className="section-topline">
        <span className="eyebrow">{t('See it happen')}</span>
        <label className="target-select">
          {t('Target sum ')}
          <select
            value={target}
            onChange={(event) => {
              setTarget(Number(event.target.value))
              setStepIndex(0)
            }}
          >
            <option value={10}>{t('10 · pair exists')}</option>
            <option value={20}>{t('20 · no pair')}</option>
            <option value={2}>{t('2 · no reusing 1')}</option>
          </select>
        </label>
      </div>
      <div className="array-scroll">
        <div className="array-row">
          {values.map((value, index) => (
            <div
              key={value}
              className={`array-item ${index < step.left || index > step.right ? 'eliminated' : ''}`}
            >
              <span className="array-index">{index}</span>
              <span
                className={`array-value ${index === step.left || index === step.right ? (step.found ? 'found' : 'middle') : ''}`}
              >
                {value}
              </span>
              <span className="array-pointer">
                {[
                  index === step.left ? 'L →' : '',
                  index === step.right ? '← R' : '',
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="trace-message" role="status">
        {step.message}
      </p>
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
            disabled={stepIndex === steps.length - 1}
          >
            {t('Next step ')}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <p className="legend">
        {t(
          'L = left pointer · R = right pointer · faded = ruled out as a partner ',
        )}
      </p>
    </section>
  )
}
