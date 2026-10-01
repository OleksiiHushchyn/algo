import type { Pattern } from '@/topics/shared/types'
import { codeExamples } from './code-examples'
import { details } from './details'

const content: Omit<Pattern, 'codeExamples' | 'detailed'>[] = [
  {
    id: 'exact',
    title: 'Find a value',
    cue: 'Sorted array + a target',
    level: 'Start here',
    question: '“Where is 23 in this sorted array?”',
    idea: 'Check the middle. The order tells you which half cannot contain the target. Keep searching the other half.',
    steps: [
      'Middle too small? Move left past it.',
      'Middle too big? Move right before it.',
      'Equal? Return its index (position).',
    ],
    code: `left = 0; right = length(A) - 1
while left <= right:
  mid = left + floor((right - left) / 2)
  if A[mid] == target: return mid
  if A[mid] < target:
    left = mid + 1
  else:
    right = mid - 1
return -1  // target is absent`,
    values: [],
    highlight: [],
    caption: '',
    trap: 'Use <= so the last remaining item gets checked. Move past mid: keeping it can cause an endless loop.',
    time: 'O(log n)',
    timeNote: 'n = number of items. Doubling the array adds about one check.',
    tasks: [
      {
        id: 704,
        title: 'Binary Search',
        slug: 'binary-search',
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: 'boundary',
    title: 'Find the first match',
    cue: 'First, insertion point, at least',
    level: 'Core',
    question: '“Where would 6 fit without breaking the order?”',
    idea: 'Find the first item greater than or equal to the target. Before this boundary, the answer is “no”; from it onward, “yes”.',
    steps: [
      'Start with right = n (one past the array).',
      'A match may have an earlier match: keep mid.',
      'Return left. It can be n, meaning insert at the end.',
    ],
    code: `// Sorted A; first index with A[index] >= target
left = 0; right = length(A)
while left < right:
  mid = left + floor((right - left) / 2)
  if A[mid] >= target:
    right = mid
  else:
    left = mid + 1
return left`,
    values: ['2', '4', '7', '9', '12'],
    highlight: [2, 3, 4],
    caption:
      'Target 6 → no, no, yes, yes, yes. The first yes is index 2; insert 6 there.',
    trap: 'This returns a boundary, not necessarily an exact match. For an exact match, also check index < n and A[index] == target.',
    time: 'O(log n)',
    timeNote: 'n = number of items. A yes/no test must switch only once.',
    tasks: [
      {
        id: 35,
        title: 'Search Insert Position',
        slug: 'search-insert-position',
        difficulty: 'Easy',
      },
      {
        id: 278,
        title: 'First Bad Version',
        slug: 'first-bad-version',
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: 'range',
    title: 'Find a duplicate range',
    cue: 'First and last, count occurrences',
    level: 'Core',
    question: '“Where do all the 4s start and end?”',
    idea: 'Finding one match is not enough. Find two boundaries: the first value ≥ target, then the first value > target.',
    steps: [
      'The first boundary is the start.',
      'One before the second boundary is the end.',
      'Count = second boundary − first boundary.',
    ],
    code: `function boundary(A, target, strict):
  left = 0; right = length(A)
  while left < right:
    mid = left + floor((right - left) / 2)
    matches = A[mid] > target if strict
              else A[mid] >= target
    if matches: right = mid
    else: left = mid + 1
  return left

start = boundary(A, target, false)
end = boundary(A, target, true)
if start == end: return [-1, -1]
return [start, end - 1]`,
    values: ['1', '4', '4', '4', '7', '9'],
    highlight: [1, 2, 3],
    caption:
      'Target 4 → first ≥ 4 is index 1; first > 4 is index 4. Range [1, 3], count 3.',
    trap: 'Do not scan outward from a match: many duplicates would turn the search into O(n). Two binary searches stay O(log n).',
    time: 'O(log n)',
    timeNote:
      'Two logarithmic searches are still O(log n). The array must be sorted.',
    tasks: [
      {
        id: 34,
        title: 'Find First and Last Position',
        slug: 'find-first-and-last-position-of-element-in-sorted-array',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'rotated',
    title: 'Search a rotated array',
    cue: 'Sorted, then shifted',
    level: 'Next step',
    question: '“The sorted array wraps around. Where is 3?”',
    idea: 'A rotation moves a chunk from one end to the other. With distinct values, at least one half around mid is still sorted.',
    steps: [
      'Check which half is sorted.',
      'If the target fits inside that half’s values, keep it.',
      'Otherwise, search the other half.',
    ],
    code: `left = 0; right = length(A) - 1
while left <= right:
  mid = left + floor((right - left) / 2)
  if A[mid] == target: return mid
  if A[left] <= A[mid]:  // left half is sorted
    if A[left] <= target < A[mid]:
      right = mid - 1
    else: left = mid + 1
  else:  // right half is sorted
    if A[mid] < target <= A[right]:
      left = mid + 1
    else: right = mid - 1
return -1`,
    values: ['8', '11', '15', '19', '1', '3', '6'],
    highlight: [4, 5, 6],
    caption:
      'Mid is 19. The left half [8…19] is sorted, but cannot contain 3. Keep the right half.',
    trap: 'This template assumes distinct values. Duplicates can hide which half is sorted and may require O(n) in the worst case.',
    time: 'O(log n)',
    timeNote: 'n = number of items, with distinct values.',
    tasks: [
      {
        id: 33,
        title: 'Search in Rotated Sorted Array',
        slug: 'search-in-rotated-sorted-array',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'minimum',
    title: 'Find the rotation point',
    cue: 'Smallest value in a rotated array',
    level: 'Next step',
    question: '“Where does this rotated array start over?”',
    idea: 'Compare the middle with the rightmost value. If the middle is larger, the smallest value must be after it.',
    steps: [
      'Middle > rightmost? Discard mid and everything before it.',
      'Otherwise, keep mid and the left side.',
      'When the bounds meet, that item is the minimum.',
    ],
    code: `// Nonempty rotated sorted A; distinct values
left = 0; right = length(A) - 1
while left < right:
  mid = left + floor((right - left) / 2)
  if A[mid] > A[right]:
    left = mid + 1
  else:
    right = mid
return A[left]`,
    values: ['8', '11', '15', '19', '1', '3', '6'],
    highlight: [4],
    caption:
      '19 > 6 → minimum is to the right. Continue narrowing until the bounds meet at 1.',
    trap: 'Use right = mid, not mid − 1: mid could be the minimum. Assumes a nonempty array with distinct values.',
    time: 'O(log n)',
    timeNote: 'Already sorted? This works too: the first item wins.',
    tasks: [
      {
        id: 153,
        title: 'Find Minimum in Rotated Sorted Array',
        slug: 'find-minimum-in-rotated-sorted-array',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'answer',
    title: 'Search the answer',
    cue: 'Minimum speed, capacity, or limit',
    level: 'Next step',
    question: '“What is the slowest speed that finishes on time?”',
    idea: 'Search possible answers instead of array positions. It works when a successful answer guarantees that every larger answer also succeeds.',
    steps: [
      'Choose the smallest and largest possible answers.',
      'Test the middle answer with a works() check.',
      'Works? Try smaller. Fails? You need larger.',
    ],
    code: `// Piles of bananas; one pile per hour
// Assumes hours >= number of piles
function works(speed):
  needed = 0
  for pile in piles:
    needed += ceil(pile / speed)
  return needed <= hours

left = 1; right = max(piles)
while left < right:
  mid = left + floor((right - left) / 2)
  if works(mid): right = mid
  else: left = mid + 1
return left`,
    values: ['1 ✕', '2 ✕', '3 ✕', '4 ✓', '5 ✓', '6 ✓'],
    highlight: [3, 4, 5],
    caption:
      'Piles [4, 6], 3 hours. Speed 3 needs 4 hours; speed 4 needs 3. Minimum working speed: 4.',
    trap: '“Find the minimum” alone is not enough. Prove that once an answer works, every larger one works too, and the upper bound is feasible.',
    time: 'O(n log M)',
    timeNote:
      'n = piles; M = largest pile. Each speed check visits all n piles. ceil means round up.',
    tasks: [
      {
        id: 875,
        title: 'Koko Eating Bananas',
        slug: 'koko-eating-bananas',
        difficulty: 'Medium',
      },
      {
        id: 1011,
        title: 'Capacity To Ship Packages Within D Days',
        slug: 'capacity-to-ship-packages-within-d-days',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'peak',
    title: 'Find a peak',
    cue: 'A value larger than its neighbors',
    level: 'Next step',
    question: '“Can you find any local high point?”',
    idea: 'Walk uphill by halves. The higher-neighbor side must contain a peak, even when the whole array is not sorted.',
    steps: [
      'Compare mid with mid + 1.',
      'Rising? Keep the right side. Falling? Keep mid and the left.',
      'Stop when the bounds meet at a peak.',
    ],
    code: `// Nonempty A; adjacent values are unequal
// Values outside the array count as -infinity
left = 0; right = length(A) - 1
while left < right:
  mid = left + floor((right - left) / 2)
  if A[mid] < A[mid + 1]:
    left = mid + 1
  else:
    right = mid
return left  // a peak's index`,
    values: ['2', '6', '3', '5', '9', '4'],
    highlight: [1, 4],
    caption:
      '6 and 9 are both peaks. This search returns index 4 (value 9); either peak would be a valid answer.',
    trap: 'A peak is not necessarily the overall maximum. This version needs unequal neighbors; an edge can be a peak too.',
    time: 'O(log n)',
    timeNote:
      'n = number of items. The uphill rule guarantees a peak remains in the chosen half.',
    tasks: [
      {
        id: 162,
        title: 'Find Peak Element',
        slug: 'find-peak-element',
        difficulty: 'Medium',
      },
    ],
  },
]

export const patterns: Pattern[] = content.map((pattern) => ({
  ...pattern,
  codeExamples: codeExamples[pattern.id]!,
  detailed: details[pattern.id]!,
}))
