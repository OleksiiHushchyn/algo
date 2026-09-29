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
        ? `${comparison}. Found a pair at indices ${left} and ${right}.`
        : sum < target
          ? `${comparison} < ${target}. Move L right: even the largest partner is too small for ${values[left]}.`
          : `${comparison} > ${target}. Move R left: even the smallest partner is too large for ${values[right]}.`,
    })
    if (found) return steps
    if (sum < target) left += 1
    else right -= 1
  }
  steps.push({
    left,
    right,
    found: false,
    message: 'Fewer than two items remain. No pair found; return [].',
  })
  return steps
}
