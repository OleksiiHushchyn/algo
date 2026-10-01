import { english, type Translate } from '@/i18n/messages'
export type PairStep = {
  left: number
  right: number
  found: boolean
  message: string
}

// Teaching trace for an array sorted in ascending order.
export function tracePair(
  values: readonly number[],
  target: number,
  t: Translate = english,
): PairStep[] {
  const steps: PairStep[] = []
  let left = 0
  let right = values.length - 1
  while (left < right) {
    const sum = values[left]! + values[right]!
    const found = sum === target
    const comparison = `${values[left]} + ${values[right]} = ${sum}`
    steps.push({
      left,
      right,
      found,
      message: found
        ? t('{comparison}. Found a pair at indices {left} and {right}.', {
            comparison,
            left,
            right,
          })
        : sum < target
          ? t(
              '{comparison} < {target}. Move L right: even the largest partner is too small for {value2}.',
              { comparison, target, value2: values[left] },
            )
          : t(
              '{comparison} > {target}. Move R left: even the smallest partner is too large for {value2}.',
              { comparison, target, value2: values[right] },
            ),
    })
    if (found) return steps
    if (sum < target) left += 1
    else right -= 1
  }
  steps.push({
    left,
    right,
    found: false,
    message: t('Fewer than two items remain. No pair found; return [].'),
  })
  return steps
}
