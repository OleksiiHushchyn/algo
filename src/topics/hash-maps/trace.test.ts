import { describe, expect, it } from 'vitest'
import { tracePair, tracePrefix } from './trace'

// Exhaust small inputs against a deliberately simple independent reference.
function arrays(maxLength: number): number[][] {
  const result: number[][] = [[]]
  let level: number[][] = [[]]
  for (let length = 1; length <= maxLength; length++) {
    level = level.flatMap((values) => [-1, 0, 1].map((x) => [...values, x]))
    result.push(...level)
  }
  return result
}

describe('hash-map walkthroughs', () => {
  it('finds exactly the valid pair cases, including duplicates and index zero', () => {
    for (const values of arrays(5)) {
      for (const target of [-2, -1, 0, 1, 2]) {
        const exists = values.some((a, i) =>
          values.some((b, j) => j > i && a + b === target),
        )
        const pair = tracePair(values, target).at(-1)!.pair
        expect(Boolean(pair)).toBe(exists)
        if (pair) {
          expect(pair[0]).toBeLessThan(pair[1])
          expect(values[pair[0]]! + values[pair[1]]!).toBe(target)
        }
      }
    }
  })

  it('shows lookup before insert and preserves earlier table snapshots', () => {
    const steps = tracePair([3, 3], 6)
    expect(steps[1]!.entries).toEqual([])
    expect(steps[2]!.entries).toEqual([[3, 0]])
    expect(steps[3]!.pair).toEqual([0, 1])
    expect(tracePair([3], 6).at(-1)!.pair).toBeUndefined()
  })

  it('counts all nonempty subarrays correctly with zeros and negative numbers', () => {
    for (const values of arrays(5)) {
      for (const target of [-2, -1, 0, 1, 2]) {
        let expected = 0
        for (let left = 0; left < values.length; left++) {
          for (let right = left + 1; right <= values.length; right++) {
            if (
              values.slice(left, right).reduce((sum, x) => sum + x, 0) ===
              target
            )
              expected++
          }
        }
        expect(tracePrefix(values, target).at(-1)!.answer).toBe(expected)
      }
    }
  })

  it('uses prefix frequencies and counts before recording the current prefix', () => {
    const steps = tracePrefix([0, 0, 0], 0)
    expect(steps[0]!.entries).toEqual([[0, 1]])
    expect(steps[1]!.entries).toEqual([[0, 1]])
    expect(steps[1]!.answer).toBe(1)
    expect(steps[2]!.entries).toEqual([[0, 2]])
    expect(steps.at(-1)!.answer).toBe(6)
    expect(steps.at(-1)!.entries).toEqual([[0, 4]])
  })
})
