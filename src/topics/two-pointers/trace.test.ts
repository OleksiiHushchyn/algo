import { describe, expect, it } from 'vitest'
import { tracePair } from './trace'

describe('two-pointer pair walkthrough', () => {
  it.each([[], [1], [1, 1], [-5, -2, 0, 3, 7], [1, 3, 4, 6, 8, 11]])(
    'agrees with all-pairs search for %j',
    (...items: number[]) => {
      const values = items
      for (let target = -10; target <= 22; target += 1) {
        const exists = values.some((left, i) =>
          values.some((right, j) => i < j && left + right === target),
        )
        const steps = tracePair(values, target)
        const last = steps.at(-1)!
        expect(last.found).toBe(exists)
        if (last.found) {
          expect(last.left).toBeLessThan(last.right)
          expect(values[last.left]! + values[last.right]!).toBe(target)
        } else {
          expect(last.left).toBeGreaterThanOrEqual(last.right)
        }
        for (let i = 1; i < steps.length; i += 1) {
          const before = steps[i - 1]!
          const after = steps[i]!
          expect(after.right - after.left).toBe(before.right - before.left - 1)
        }
      }
    },
  )

  it('shows both movement directions before finding the example pair', () => {
    const steps = tracePair([1, 3, 4, 6, 8, 11], 10)
    expect(steps.some((step) => step.message.includes('Move L right'))).toBe(
      true,
    )
    expect(steps.some((step) => step.message.includes('Move R left'))).toBe(
      true,
    )
    expect(steps.at(-1)).toMatchObject({ left: 2, right: 3, found: true })
  })
})
