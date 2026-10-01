import { english, type Translate } from '@/i18n/messages'
export type MapStep = {
  index: number
  entries: [number, number][]
  message: string
  pair?: [number, number]
  sum?: number
  answer?: number
}

export function tracePair(
  values: number[],
  target: number,
  t: Translate = english,
): MapStep[] {
  const seen = new Map<number, number>()
  const steps: MapStep[] = [
    {
      index: -1,
      entries: [],
      message: t(
        'Start with an empty map. Each entry will remember number → earlier index.',
      ),
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
        message: t(
          'Need {target} − ({value}) = {need}. Found it at index {previous}. Answer: indices {previous} and {index}; {need} + ({value}) = {target}.',
          {
            target,
            value,
            need,
            previous,
            index,
          },
        ),
      })
      return steps
    }
    steps.push({
      index,
      entries: [...seen],
      message: t(
        'Look up {target} − ({value}) = {need}. It is not in the map. Check first; we have not stored index {index} yet.',
        { target, value, need, index },
      ),
    })
    seen.set(value, index)
    steps.push({
      index,
      entries: [...seen],
      message: t(
        'Now store {value} → {index}. Later numbers can use this index as their partner.',
        { value, index },
      ),
    })
  }
  steps.push({
    index: -1,
    entries: [...seen],
    message: t('Done. No pair of different indices adds up to the target.'),
  })
  return steps
}

export function tracePrefix(
  values: number[],
  target: number,
  t: Translate = english,
): MapStep[] {
  const freq = new Map<number, number>([[0, 1]])
  let sum = 0
  let answer = 0
  const steps: MapStep[] = [
    {
      index: -1,
      entries: [...freq],
      sum,
      answer,
      message: t(
        'Seed 0 → 1: one empty prefix exists before index 0. It lets us count stretches starting at the first item.',
      ),
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
      message: t(
        'Prefix is {sum}. Need an earlier prefix of {sum} − ({target}) = {need}. Found {matches}: add {matches} to the answer. This table still contains only earlier prefixes.',
        { sum, target, need, matches },
      ),
    })
    freq.set(sum, (freq.get(sum) ?? 0) + 1)
    steps.push({
      index,
      entries: [...freq],
      sum,
      answer,
      message: t(
        'Now record prefix {sum}: it has appeared {value1} time(s). {value2}',
        {
          sum,
          value1: freq.get(sum)!,
          value2:
            index === values.length - 1
              ? t('Done. {answer} subarrays sum to {target}.', {
                  answer,
                  target,
                })
              : t('Move to the next number.'),
        },
      ),
    })
  }
  return steps
}
