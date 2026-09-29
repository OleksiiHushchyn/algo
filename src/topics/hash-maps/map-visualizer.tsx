import { useState } from 'react'
import { tracePair, tracePrefix } from './trace'

const pairExamples = [
  { label: 'Target 10 · find a pair', values: [4, 1, 7, 3], target: 10 },
  { label: 'Target 5 · index zero', values: [4, 1, 7, 3], target: 5 },
  { label: 'Target 6 · equal values', values: [3, 3], target: 6 },
  { label: 'Target 6 · only one 3', values: [3, 1, 7], target: 6 },
]
const prefixExamples = [
  { label: 'Target 1 · mixed signs', values: [1, -1, 1], target: 1 },
  { label: 'Target 0 · mixed signs', values: [1, -1, 1], target: 0 },
  { label: 'Target 0 · all zeros', values: [0, 0, 0], target: 0 },
]

export function MapTable({
  columns,
  entries,
}: {
  columns: [string, string]
  entries: [string | number, string | number][]
}) {
  return (
    <table className="hash-table">
      <thead>
        <tr>
          <th scope="col">{columns[0]}</th>
          <th scope="col">{columns[1]}</th>
        </tr>
      </thead>
      <tbody>
        {entries.length ? (
          entries.map(([key, value]) => (
            <tr key={key}>
              <th scope="row">{key}</th>
              <td>{value}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={2} className="muted">
              Empty map — nothing stored yet
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export function MapVisualizer({ mode }: { mode: 'pair' | 'prefix' }) {
  const [exampleIndex, setExampleIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const prefix = mode === 'prefix'
  const examples = prefix ? prefixExamples : pairExamples
  const example = examples[exampleIndex]!
  const steps = prefix
    ? tracePrefix(example.values, example.target)
    : tracePair(example.values, example.target)
  const step = steps[stepIndex]!
  const complete = stepIndex === steps.length - 1
  return (
    <section
      className="visualizer"
      aria-label={
        prefix ? 'Interactive prefix-sum map' : 'Interactive pair lookup'
      }
    >
      <div className="section-topline hash-controls-top">
        <span className="eyebrow">See it happen</span>
        <label className="target-select">
          Example
          <select
            value={exampleIndex}
            onChange={(event) => {
              setExampleIndex(Number(event.target.value))
              setStepIndex(0)
            }}
          >
            {examples.map((item, index) => (
              <option key={item.label} value={index}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="array-scroll">
        <div className="array-row">
          {example.values.map((value, index) => (
            <div className="array-item" key={index}>
              <span className="array-index">{index}</span>
              <span
                className={`array-value ${step.pair?.includes(index) ? 'found' : index === step.index ? 'middle' : prefix && index < step.index ? 'highlight' : ''}`}
              >
                {value}
              </span>
              <span className="array-pointer">
                {index === step.index
                  ? 'now'
                  : step.pair?.includes(index)
                    ? 'pair'
                    : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
      {prefix && (
        <div className="window-metrics">
          <span>
            Prefix sum <b>{step.sum}</b>
          </span>
          <span>
            Subarrays found <b>{step.answer}</b>
          </span>
        </div>
      )}
      <MapTable
        columns={
          prefix
            ? ['Key · prefix sum', 'Value · times seen']
            : ['Key · number', 'Value · earlier index']
        }
        entries={step.entries}
      />
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
            disabled={complete}
          >
            Next step <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <p className="legend">
        {prefix
          ? 'Purple = current item · pale cells = earlier items in the prefix'
          : 'Purple = current item · green = matched pair'}{' '}
        · table = stored key → value entries
      </p>
    </section>
  )
}
