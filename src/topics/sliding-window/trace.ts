export type WindowStep = {
  left: number
  right: number
  value: number
  best: number
  bestLeft: number
  bestRight: number
  valid: boolean
  phase: 'slide' | 'expand' | 'shrink'
  message: string
}

// Stores extra snapshots for teaching; the algorithm itself uses O(1) space.
export function traceFixedWindow(
  values: readonly number[],
  size: number,
): WindowStep[] {
  if (!Number.isInteger(size) || size < 1 || size > values.length) {
    throw new RangeError(
      'Window size must be an integer between 1 and the array length.',
    )
  }
  const steps: WindowStep[] = []
  let sum = 0
  for (let index = 0; index < size; index += 1) sum += values[index]!
  let best = sum
  let bestLeft = 0
  for (let left = 0; left <= values.length - size; left += 1) {
    const right = left + size - 1
    const previousSum = sum
    if (left > 0) sum = sum - values[left - 1]! + values[right]!
    if (sum > best) {
      best = sum
      bestLeft = left
    }
    steps.push({
      left,
      right,
      value: sum,
      best,
      bestLeft,
      bestRight: bestLeft + size - 1,
      valid: true,
      phase: 'slide',
      message:
        left === 0
          ? `First ${size} items: sum = ${sum}. Save this as the best so far.`
          : `${previousSum} − (${values[left - 1]}) + (${values[right]}) = ${sum}. One item out, one in. Best sum so far: ${best}.`,
    })
  }
  return steps
}

// Expand and shrink are separate frames so the reason for each move is visible.
export function traceUniqueWindow(text: string): WindowStep[] {
  const characters = [...text]
  const steps: WindowStep[] = []
  const count = new Map<string, number>()
  let left = 0
  let best = 0
  let bestLeft = 0
  let bestRight = -1
  const record = (
    right: number,
    phase: WindowStep['phase'],
    message: string,
  ) => {
    const valid = count.get(characters[right]!)! <= 1
    const size = right - left + 1
    if (valid && size > best) {
      best = size
      bestLeft = left
      bestRight = right
    }
    steps.push({
      left,
      right,
      value: size,
      best,
      bestLeft,
      bestRight,
      valid,
      phase,
      message,
    })
  }
  for (let right = 0; right < characters.length; right += 1) {
    const character = characters[right]!
    count.set(character, (count.get(character) ?? 0) + 1)
    record(
      right,
      'expand',
      count.get(character)! > 1
        ? `Add “${character}”. It now repeats: shrink from the left before measuring.`
        : `Add “${character}”. All characters are unique: measure this window.`,
    )
    while (count.get(character)! > 1) {
      const removed = characters[left]!
      count.set(removed, count.get(removed)! - 1)
      left += 1
      record(
        right,
        'shrink',
        count.get(character)! > 1
          ? `Remove “${removed}” from the left. “${character}” still repeats: shrink again.`
          : `Remove “${removed}” from the left. The repeat is gone: measure the valid window.`,
      )
    }
  }
  if (steps.length === 0) {
    steps.push({
      left: 0,
      right: -1,
      value: 0,
      best: 0,
      bestLeft: 0,
      bestRight: -1,
      valid: true,
      phase: 'expand',
      message: 'Empty text has no characters. Longest unique window: 0.',
    })
  }
  return steps
}
