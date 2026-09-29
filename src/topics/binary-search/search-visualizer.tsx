import { useState } from 'react'
import { traceSearch } from './trace'

const values = [2, 5, 8, 12, 16, 23, 38, 56, 72]

export function SearchVisualizer() {
  const [target, setTarget] = useState(23)
  const [stepIndex, setStepIndex] = useState(0)
  const steps = traceSearch(values, target)
  const step = steps[stepIndex]!

  return (
    <section className="visualizer" aria-label="Interactive binary search">
      <div className="section-topline">
        <span className="eyebrow">See it happen</span>
        <label className="target-select">
          Find
          <select
            value={target}
            onChange={(event) => {
              setTarget(Number(event.target.value))
              setStepIndex(0)
            }}
          >
            <option value={23}>23 · exists</option>
            <option value={13}>13 · missing</option>
            <option value={2}>2 · first item</option>
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
                className={`array-value ${index === step.mid ? (step.found ? 'found' : 'middle') : ''}`}
              >
                {value}
              </span>
              <span className="array-pointer">
                {[
                  index === step.left ? 'L' : '',
                  index === step.mid ? 'M' : '',
                  index === step.right ? 'R' : '',
                ]
                  .filter(Boolean)
                  .join('·')}
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
            disabled={stepIndex === steps.length - 1}
          >
            Next step <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <p className="legend">
        L = left bound · M = middle · R = right bound · faded = discarded
      </p>
    </section>
  )
}
