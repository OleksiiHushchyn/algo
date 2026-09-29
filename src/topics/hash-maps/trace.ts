export type MapStep = {
  index: number
  entries: [number, number][]
  message: string
  pair?: [number, number]
  sum?: number
  answer?: number
}

export function tracePair(values: number[], target: number): MapStep[] {
  const seen = new Map<number, number>()
  const steps: MapStep[] = [
    {
      index: -1,
      entries: [],
      message:
        'Start with an empty map. Each entry will remember number → earlier index.',
    },
  ]
  for (let index = 0; index < values.length; index++) {
    const value = values[index]!
    const need = target - value
    const previous = seen.get(need)
    if (previous !== undefined) {
      steps.push({
        index,
        entries: [...seen],
        pair: [previous, index],
        message: `Need ${target} − (${value}) = ${need}. Found it at index ${previous}. Answer: indices ${previous} and ${index}; ${need} + (${value}) = ${target}.`,
      })
      return steps
    }
    steps.push({
      index,
      entries: [...seen],
      message: `Look up ${target} − (${value}) = ${need}. It is not in the map. Check first; we have not stored index ${index} yet.`,
    })
    seen.set(value, index)
    steps.push({
      index,
      entries: [...seen],
      message: `Now store ${value} → ${index}. Later numbers can use this index as their partner.`,
    })
  }
  steps.push({
    index: -1,
    entries: [...seen],
    message: 'Done. No pair of different indices adds up to the target.',
  })
  return steps
}

export function tracePrefix(values: number[], target: number): MapStep[] {
  const freq = new Map<number, number>([[0, 1]])
  let sum = 0
  let answer = 0
  const steps: MapStep[] = [
    {
      index: -1,
      entries: [...freq],
      sum,
      answer,
      message:
        'Seed 0 → 1: one empty prefix exists before index 0. It lets us count stretches starting at the first item.',
    },
  ]
  for (let index = 0; index < values.length; index++) {
    sum += values[index]!
    const need = sum - target
    const matches = freq.get(need) ?? 0
    answer += matches
    steps.push({
      index,
      entries: [...freq],
      sum,
      answer,
      message: `Prefix is ${sum}. Need an earlier prefix of ${sum} − (${target}) = ${need}. Found ${matches}: add ${matches} to the answer. This table still contains only earlier prefixes.`,
    })
    freq.set(sum, (freq.get(sum) ?? 0) + 1)
    steps.push({
      index,
      entries: [...freq],
      sum,
      answer,
      message: `Now record prefix ${sum}: it has appeared ${freq.get(sum)!} time(s). ${index === values.length - 1 ? `Done. ${answer} subarrays sum to ${target}.` : 'Move to the next number.'}`,
    })
  }
  return steps
}
