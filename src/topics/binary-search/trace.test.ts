import { describe, expect, it } from 'vitest'
import { traceSearch } from './trace'

describe('binary search walkthrough', () => {
  it.each([
    { values: [], target: 4, index: -1 },
    { values: [4], target: 4, index: 0 },
    { values: [4], target: 9, index: -1 },
    { values: [2, 5, 8, 12, 16, 23, 38, 56, 72], target: 23, index: 5 },
    { values: [2, 5, 8, 12, 16, 23, 38, 56, 72], target: 13, index: -1 },
    { values: [2, 5, 8], target: 2, index: 0 },
    { values: [2, 5, 8], target: 8, index: 2 },
    { values: [2, 5, 8], target: 0, index: -1 },
    { values: [2, 5, 8], target: 10, index: -1 },
  ])('correctly searches $target in $values', ({ values, target, index }) => {
    const steps = traceSearch(values, target)
    const last = steps.at(-1)!
    expect(last.found ? last.mid : -1).toBe(index)
    if (index === -1) expect(last.left).toBeGreaterThan(last.right)
    for (const [i, step] of steps.entries()) {
      if (step.mid !== null) {
        expect(step.mid).toBeGreaterThanOrEqual(step.left)
        expect(step.mid).toBeLessThanOrEqual(step.right)
      }
      if (i > 0) {
        const previous = steps[i - 1]!
        expect(step.right - step.left).toBeLessThan(
          previous.right - previous.left,
        )
      }
    }
  })
})
