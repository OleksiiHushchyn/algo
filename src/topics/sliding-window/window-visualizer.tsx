import { useState } from 'react'
import { traceFixedWindow, traceUniqueWindow } from './trace'

const values = [2, 1, 5, 1, 3, 2]
const text = 'abcaac'

export function WindowVisualizer({ mode }: { mode: 'fixed' | 'unique' }) {
  const [size, setSize] = useState(3)
  const [stepIndex, setStepIndex] = useState(0)
  const fixed = mode === 'fixed'
  const items = fixed ? values : [...text]
  const steps = fixed ? traceFixedWindow(values, size) : traceUniqueWindow(text)
  const step = steps[stepIndex]!
  const complete = stepIndex === steps.length - 1
  return (
    <section
      className="visualizer"
      aria-label={
        fixed
          ? 'Interactive fixed-size window'
          : 'Interactive unique-character window'
      }
    >
      <div className="section-topline">
        <span className="eyebrow">See it happen</span>
        {fixed ? (
          <label className="target-select">
            Window size
            <select
              value={size}
              onChange={(event) => {
                setSize(Number(event.target.value))
                setStepIndex(0)
              }}
            >
              <option value={3}>3 items</option>
              <option value={2}>2 items</option>
              <option value={6}>6 · whole array</option>
            </select>
          </label>
        ) : (
          <span className={`window-state ${step.valid ? 'valid' : 'invalid'}`}>
            {step.valid ? 'Unique · can measure' : 'Repeat · must shrink'}
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
          Current {fixed ? 'sum' : 'length'} <b>{step.value}</b>
        </span>
        <span>
          Best {fixed ? 'sum' : 'length'} <b>{step.best}</b>
        </span>
      </div>
      <p className="trace-message" role="status">
        {step.message}
        {complete
          ? ` Done. ${fixed ? 'Maximum sum' : 'Longest unique length'}: ${step.best}.`
          : ''}
      </p>
      {complete && (
        <p className="window-result">
          Best window: [
          {items.slice(step.bestLeft, step.bestRight + 1).join(', ')}] · indices{' '}
          {step.bestLeft}–{step.bestRight}
        </p>
      )}
      <div className="visualizer-controls">
        <span className="small muted">
          Step {stepIndex + 1} of {steps.length}
        </span>
        <div className="control-buttons">
          <button
            className="text-button"
            onClick={() => setStepIndex(0)}
            disabled={stepIndex === 0}
          >
            Reset
          </button>
          <button
            className="icon-button"
            aria-label="Previous step"
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
            Next step <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <p className="legend">
        L = left edge · R = right edge · colored cells = current window
        {!fixed && ' · amber = repeat present'}
      </p>
    </section>
  )
}
