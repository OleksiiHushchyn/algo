import type { Pattern } from '@/topics/shared/types'
import { codeExamples } from './code-examples'
import { details } from './details'

const content: Omit<Pattern, 'codeExamples' | 'detailed'>[] = [
  {
    id: 'pair',
    title: 'Find a pair',
    cue: 'Sorted array + a target sum',
    level: 'Start here',
    question: '“Which two numbers add up to 10?”',
    idea: 'A pointer is just a position you keep track of. Put one at each end of a sorted array. The sum tells you which pointer to move.',
    steps: [
      'Sum too small? Move left rightward to a larger value.',
      'Sum too large? Move right leftward to a smaller value.',
      'Equal? You found a pair. Stop before the pointers meet.',
    ],
    code: `// A is sorted from small to large
left = 0; right = length(A) - 1
while left < right:
  sum = A[left] + A[right]
  if sum == target: return [left, right]
  if sum < target: left += 1
  else: right -= 1
return []  // no pair`,
    values: [],
    highlight: [],
    caption: '',
    trap: 'This rule needs sorted values. Use left < right so you never reuse one item. LeetCode 167 expects 1-based positions: add 1 to both returned indices.',
    time: 'O(n)',
    timeNote:
      'n = items. Each move removes one possible endpoint, so there are at most n − 1 comparisons.',
    tasks: [
      {
        id: 167,
        title: 'Two Sum II — Input Array Is Sorted',
        slug: 'two-sum-ii-input-array-is-sorted',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'palindrome',
    title: 'Compare from both ends',
    cue: 'Palindrome, symmetry, reverse',
    level: 'Core',
    question: '“Does ‘Level!’ read the same backward?”',
    idea: 'A palindrome reads the same in both directions. Compare the first and last useful characters, then move inward.',
    steps: [
      'Skip characters that are not letters or digits.',
      'Compare the two characters in lowercase.',
      'A mismatch means false. Reaching the middle means true.',
    ],
    code: `left = 0; right = length(text) - 1
while left < right:
  while left < right and not isLetterOrDigit(text[left]):
    left += 1
  while left < right and not isLetterOrDigit(text[right]):
    right -= 1
  if lowercase(text[left]) != lowercase(text[right]):
    return false
  left += 1; right -= 1
return true`,
    values: ['L', 'e', 'v', 'e', 'l', '!'],
    highlight: [0, 4],
    caption:
      'Skip !. Compare L with l, then e with e. The middle v needs no partner → true.',
    trap: 'Do not sort the text: its order is the whole point. Empty text or only punctuation also counts as a palindrome. This example uses ASCII letters and digits.',
    time: 'O(n)',
    timeNote:
      'n = characters. Each character is visited at most once by a pointer.',
    tasks: [
      {
        id: 125,
        title: 'Valid Palindrome',
        slug: 'valid-palindrome',
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: 'read-write',
    title: 'Keep only useful items',
    cue: 'Remove in place, keep order',
    level: 'Core',
    question: '“Can we remove duplicates without another array?”',
    idea: 'One pointer reads every item. A second marks the next place to write a keeper. “In place” means changing the original array.',
    steps: [
      'Read from left to right through the sorted array.',
      'Copy a value only if it differs from the last kept value.',
      'Return write: the number of useful items at the front.',
    ],
    code: `// A is sorted; "or" stops if its first test is true
write = 0
for read = 0 to length(A) - 1:
  if write == 0 or A[read] != A[write - 1]:
    A[write] = A[read]
    write += 1
return write  // only A[0 .. write-1] matters`,
    values: [],
    highlight: [],
    diagramRows: [
      {
        label: 'Before',
        values: ['2', '2', '5', '5', '8'],
        highlight: [0, 2, 4],
      },
      {
        label: 'After · useful prefix',
        values: ['2', '5', '8', '·', '·'],
        highlight: [0, 1, 2],
      },
    ],
    caption:
      'Return 3. The first three slots hold [2, 5, 8]. Dots mean ignored slots, not deleted items.',
    trap: 'Duplicates must be adjacent, so this version needs sorting. For Move Zeroes, keep nonzero values instead, then fill the remaining slots with zeros.',
    time: 'O(n)',
    timeNote:
      'n = items. Read visits every slot; write never gets ahead of read.',
    tasks: [
      {
        id: 26,
        title: 'Remove Duplicates from Sorted Array',
        slug: 'remove-duplicates-from-sorted-array',
        difficulty: 'Easy',
      },
      {
        id: 283,
        title: 'Move Zeroes',
        slug: 'move-zeroes',
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: 'subsequence',
    title: 'Match in order',
    cue: 'Same order, gaps allowed',
    level: 'Core',
    question: '“Can we find ‘cat’ inside ‘coat’ in order?”',
    idea: 'A subsequence keeps the original order but may skip characters. Use one pointer for what you need and one for where you are looking.',
    steps: [
      'Scan the longer text one character at a time.',
      'Advance the wanted pointer only on a match.',
      'Success means every wanted character was matched.',
    ],
    code: `wanted = 0; scan = 0
while wanted < length(s) and scan < length(t):
  if s[wanted] == t[scan]:
    wanted += 1
  scan += 1
return wanted == length(s)`,
    values: [],
    highlight: [],
    diagramRows: [
      { label: 'Wanted: s', values: ['c', 'a', 't'], highlight: [0, 1, 2] },
      { label: 'Scan: t', values: ['c', 'o', 'a', 't'], highlight: [0, 2, 3] },
    ],
    caption:
      'Match c, skip o, match a, match t → true. “tac” would be false: the order is wrong.',
    trap: 'A subsequence can have gaps; a substring must be continuous. Never move the wanted pointer after a mismatch. An empty s always matches.',
    time: 'O(m + n)',
    timeNote: 'm and n = string lengths. The scan of t takes at most n steps.',
    tasks: [
      {
        id: 392,
        title: 'Is Subsequence',
        slug: 'is-subsequence',
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: 'merge',
    title: 'Merge two sorted arrays',
    cue: 'Two ordered lists → one',
    level: 'Next step',
    question: '“How can we combine two sorted arrays in place?”',
    idea: 'Compare the last unused value from each array. Write the larger one into the last free slot. Working backward protects unread values.',
    steps: [
      'A has m values plus n spare slots; B has n values.',
      'i and j compare values; write tracks the output slot.',
      'Stop when B is used up. Any remaining A values are already placed.',
    ],
    code: `i = m - 1; j = n - 1
write = m + n - 1
while j >= 0:
  if i >= 0 and A[i] > B[j]:
    A[write] = A[i]
    i -= 1
  else:
    A[write] = B[j]
    j -= 1
  write -= 1
// Result is now in A`,
    values: [],
    highlight: [],
    diagramRows: [
      {
        label: 'A: 3 values + 3 spare slots',
        values: ['1', '5', '9', '·', '·', '·'],
        highlight: [2],
      },
      { label: 'B: 3 values', values: ['2', '6', '8'], highlight: [2] },
      {
        label: 'Result in A',
        values: ['1', '2', '5', '6', '8', '9'],
        highlight: [5],
      },
    ],
    caption:
      'Compare 9 and 8. Write 9 into the last slot first; then continue backward.',
    trap: 'Filling A from the front can overwrite values you still need. The spare slots are capacity, not input values. This pattern uses two read pointers plus an output index.',
    time: 'O(m + n)',
    timeNote:
      'm and n = the two input lengths. Existing spare slots hold the output.',
    tasks: [
      {
        id: 88,
        title: 'Merge Sorted Array',
        slug: 'merge-sorted-array',
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: 'triplets',
    title: 'Fix one, find a pair',
    cue: 'Three values with a target sum',
    level: 'Next step',
    question: '“Which unique triples add up to zero?”',
    idea: 'Sort the array. Hold one value still, then solve a two-pointer pair search on the values after it. Repeat for each fixed value.',
    steps: [
      'Skip repeated fixed values to avoid duplicate triples.',
      'A negative total needs a bigger left value; a positive one needs a smaller right value.',
      'After a match, move both pointers and skip their duplicates.',
    ],
    code: `sort A ascending; result = []; n = length(A)
for fixed = 0; fixed < n - 2; fixed += 1:
  if fixed > 0 and A[fixed] == A[fixed - 1]: continue
  left = fixed + 1; right = n - 1
  while left < right:
    sum = A[fixed] + A[left] + A[right]
    if sum < 0: left += 1
    else if sum > 0: right -= 1
    else:
      append [A[fixed], A[left], A[right]] to result
      left += 1; right -= 1
      while left < right and A[left] == A[left - 1]:
        left += 1
      while left < right and A[right] == A[right + 1]:
        right -= 1
return result`,
    values: ['-3', '-1', '0', '1', '2', '4'],
    highlight: [0, 1, 5],
    caption:
      'Fix −3. A pair must total 3: −1 + 4 works. Triple [−3, −1, 4] sums to zero.',
    trap: 'Sorting changes original positions; this problem asks for values. Skipping duplicates is essential. One linear pair scan per fixed item makes the total quadratic.',
    time: 'O(n²)',
    timeNote:
      'n = items. About n fixed choices, each with at most n pointer moves.',
    space: 'O(s + k)',
    spaceNote:
      's = memory used by sorting; k = stored output triples. The pointer scan itself uses O(1).',
    tasks: [{ id: 15, title: '3Sum', slug: '3sum', difficulty: 'Medium' }],
  },
  {
    id: 'container',
    title: 'Move the limiting side',
    cue: 'Best area between two heights',
    level: 'Next step',
    question: '“Which two walls can hold the most water?”',
    idea: 'Area is width × the shorter wall. Start wide. Moving the taller wall only reduces width while the short wall still limits the water.',
    steps: [
      'Measure the current area and remember the best.',
      'Move the shorter wall inward to try a taller one.',
      'If the heights tie, either side can move.',
    ],
    code: `left = 0; right = length(height) - 1
best = 0
while left < right:
  width = right - left
  area = width * min(height[left], height[right])
  best = max(best, area)
  if height[left] <= height[right]:
    left += 1
  else:
    right -= 1
return best`,
    values: [],
    highlight: [],
    caption: '',
    trap: 'Do not sort the heights: their positions determine the width. This is water between two chosen walls, not the different Trapping Rain Water problem.',
    time: 'O(n)',
    timeNote:
      'n = walls. One pointer moves on every comparison, so there are at most n − 1 moves.',
    tasks: [
      {
        id: 11,
        title: 'Container With Most Water',
        slug: 'container-with-most-water',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'fast-slow',
    title: 'Use different speeds',
    cue: 'Linked-list cycle or middle',
    level: 'Next step',
    question: '“Does this chain of nodes loop forever?”',
    idea: 'A linked list is a chain of nodes, each pointing to the next. Move slow by one link and fast by two. In a cycle, fast eventually catches slow.',
    steps: [
      'Start both pointers at the head (the first node).',
      'Move first, then compare: sharing the start is not a cycle.',
      'If fast reaches the end, there is no cycle.',
    ],
    code: `slow = head; fast = head
while fast != null and fast.next != null:
  slow = slow.next
  fast = fast.next.next
  if slow == fast: return true
return false`,
    values: [],
    highlight: [],
    caption: '',
    trap: 'Compare node identity, not equal values. Check fast and fast.next before jumping. For the middle of a non-cyclic list, use the same moves and return slow when fast reaches the end (the second middle if even).',
    time: 'O(n)',
    timeNote:
      'n = distinct reachable nodes. No visited-node collection is needed.',
    tasks: [
      {
        id: 141,
        title: 'Linked List Cycle',
        slug: 'linked-list-cycle',
        difficulty: 'Easy',
      },
      {
        id: 876,
        title: 'Middle of the Linked List',
        slug: 'middle-of-the-linked-list',
        difficulty: 'Easy',
      },
    ],
  },
]

export const patterns = content.map((pattern) => ({
  ...pattern,
  codeExamples: codeExamples[pattern.id]!,
  detailed: details[pattern.id]!,
  codeNote: 'Indices start at 0 · += 1 moves forward · -= 1 moves backward',
}))
