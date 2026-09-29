export type SearchStep = {
  left: number
  right: number
  mid: number | null
  message: string
  found: boolean
}

export function traceSearch(
  values: readonly number[],
  target: number,
): SearchStep[] {
  const steps: SearchStep[] = []
  let left = 0
  let right = values.length - 1
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    const value = values[mid]!
    const found = value === target
    steps.push({
      left,
      right,
      mid,
      found,
      message: found
        ? `${value} = ${target}. Found at index ${mid}.`
        : value < target
          ? `${value} < ${target}. Discard the middle and everything to its left.`
          : `${value} > ${target}. Discard the middle and everything to its right.`,
    })
    if (found) return steps
    if (value < target) left = mid + 1
    else right = mid - 1
  }
  steps.push({
    left,
    right,
    mid: null,
    found: false,
    message: 'Left passed right. No items remain: return −1 (not found).',
  })
  return steps
}
