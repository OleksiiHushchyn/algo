import { describe, expect, it } from 'vitest'
import { traceFixedWindow, traceUniqueWindow } from './trace'

describe('fixed-size window walkthrough', () => {
  it.each([
    { values: [2, 1, 5, 1, 3, 2], size: 3 },
    { values: [2, 1, 5, 1, 3, 2], size: 2 },
    { values: [2, 1, 5, 1, 3, 2], size: 6 },
    { values: [-5, -2, -7, -1, -3], size: 2 },
    { values: [-5, -2, -7], size: 1 },
    { values: [0, 0, 0], size: 2 },
    { values: [7], size: 1 },
  ])(
    'matches sums recalculated from scratch for $values, k=$size',
    ({ values, size }) => {
      const steps = traceFixedWindow(values, size)
      const sums = Array.from({ length: values.length - size + 1 }, (_, left) =>
        values.slice(left, left + size).reduce((sum, value) => sum + value, 0),
      )
      expect(steps.map((step) => step.value)).toEqual(sums)
      for (const [index, step] of steps.entries()) {
        expect(step.right - step.left + 1).toBe(size)
        expect(step.best).toBe(Math.max(...sums.slice(0, index + 1)))
        expect(
          values
            .slice(step.bestLeft, step.bestRight + 1)
            .reduce((sum, value) => sum + value, 0),
        ).toBe(step.best)
      }
      expect(steps.at(-1)!.best).toBe(Math.max(...sums))
    },
  )

  it.each([0, -1, 4, 1.5, Number.NaN])('rejects an invalid size %s', (size) => {
    expect(() => traceFixedWindow([1, 2, 3], size)).toThrow(RangeError)
  })

  it('rejects an empty array', () => {
    expect(() => traceFixedWindow([], 1)).toThrow(RangeError)
  })
})

describe('unique-character window walkthrough', () => {
  it.each(['', 'a', 'aaaa', 'abcaac', 'abba', 'abcabc', 'tmmzuxt', 'a b a'])(
    'matches a brute-force search for "%s"',
    (text) => {
      let expected = 0
      for (let left = 0; left < text.length; left += 1) {
        for (let end = left + 1; end <= text.length; end += 1) {
          const part = text.slice(left, end)
          if (new Set(part).size === part.length)
            expected = Math.max(expected, part.length)
        }
      }
      const steps = traceUniqueWindow(text)
      expect(steps.at(-1)!.best).toBe(expected)
      let bestSeen = 0
      for (const [index, step] of steps.entries()) {
        const part = text.slice(step.left, step.right + 1)
        expect(step.valid).toBe(new Set(part).size === part.length)
        expect(step.value).toBe(part.length)
        if (step.valid) bestSeen = Math.max(bestSeen, part.length)
        expect(step.best).toBe(bestSeen)
        if (index > 0) {
          expect(step.left).toBeGreaterThanOrEqual(steps[index - 1]!.left)
          expect(step.right).toBeGreaterThanOrEqual(steps[index - 1]!.right)
        }
      }
    },
  )

  it('shows why shrinking can require more than one move', () => {
    const steps = traceUniqueWindow('abcaac')
    expect(steps.some((step) => step.phase === 'shrink' && !step.valid)).toBe(
      true,
    )
    expect(steps.at(-1)).toMatchObject({
      best: 3,
      bestLeft: 0,
      bestRight: 2,
      valid: true,
    })
  })
})
