import type { Pattern } from '@/topics/shared/types'

const content: Pattern[] = [
  {
    id: 'fixed',
    title: 'Keep a fixed-size window',
    cue: 'Exactly k consecutive items',
    level: 'Start here',
    question: '“Which 3 neighboring numbers have the largest sum?”',
    idea: 'A window is a continuous stretch of items, with no gaps. Slide it one place: subtract the item leaving, then add the new one. Reuse the work.',
    steps: [
      'Add up the first k items. That is your first window.',
      'Move both edges one place: one item out, one item in.',
      'Keep the largest sum. For an average, divide it by k.',
    ],
    code: `// Requires 1 <= k <= length(A)
sum = 0
for i = 0 to k - 1: sum += A[i]
best = sum
for right = k to length(A) - 1:
  sum -= A[right - k]  // old left item leaves
  sum += A[right]      // new right item enters
  best = max(best, sum)
return best  // return best / k for maximum average`,
    values: [],
    highlight: [],
    caption: '',
    trap: 'Start best with the first window’s sum, not 0: every sum could be negative. Do not sort the array; neighboring positions matter.',
    time: 'O(n)',
    timeNote:
      'n = items. Each item enters once and leaves at most once; recomputing each sum would take O(n × k).',
    tasks: [
      {
        id: 643,
        title: 'Maximum Average Subarray I',
        slug: 'maximum-average-subarray-i',
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: 'unique',
    title: 'Keep characters unique',
    cue: 'Longest substring, no repeats',
    level: 'Core',
    question: '“What is the longest stretch with no repeated character?”',
    idea: 'Grow the right edge. If the new character repeats, move the left edge until the repeat is gone. Then measure the valid window.',
    steps: [
      'Count the new character as it enters the window.',
      'While it appears twice, remove characters from the left.',
      'Once valid, update the best length: right − left + 1.',
    ],
    code: `left = 0; best = 0
count = map with default value 0
for right = 0 to length(s) - 1:
  count[s[right]] += 1
  while count[s[right]] > 1:
    count[s[left]] -= 1
    left += 1
  best = max(best, right - left + 1)
return best`,
    values: [],
    highlight: [],
    caption: '',
    trap: 'Use while, not if: the earlier copy may be several positions away. A substring has no gaps; a subsequence can skip characters.',
    time: 'O(n)',
    timeNote:
      'n = characters. Both edges only move forward, so the nested loop still does linear total work.',
    space: 'O(min(n, Σ))',
    spaceNote:
      'Σ is the number of possible characters. The map holds counts; map operations are assumed O(1) on average.',
    tasks: [
      {
        id: 3,
        title: 'Longest Substring Without Repeating Characters',
        slug: 'longest-substring-without-repeating-characters',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'minimum-sum',
    title: 'Shrink to the shortest sum',
    cue: 'Smallest subarray with sum ≥ target',
    level: 'Core',
    question: '“How few neighboring numbers can total at least 8?”',
    idea: 'With positive numbers, growing the window increases the sum. Once it is big enough, keep removing from the left to see how short it can get.',
    steps: [
      'Add the next number to the running sum.',
      'While the sum reaches the target, save the length first.',
      'Remove the left item, then try the smaller window.',
    ],
    code: `// All A values and target must be positive
left = 0; sum = 0; best = infinity
for right = 0 to length(A) - 1:
  sum += A[right]
  while sum >= target:
    best = min(best, right - left + 1)
    sum -= A[left]
    left += 1
return 0 if best == infinity else best`,
    values: [],
    highlight: [],
    diagramRows: [
      {
        label: 'Target 8 · valid, but can it be shorter?',
        values: ['2', '1', '5', '3'],
        highlight: [0, 1, 2],
      },
      {
        label: 'Later · shortest valid window',
        values: ['2', '1', '5', '3'],
        highlight: [2, 3],
      },
    ],
    caption:
      '[2, 1, 5] reaches 8 with 3 items. Later [5, 3] reaches 8 with just 2. No single item reaches 8 → answer 2.',
    trap: 'This sum rule needs positive values. Negative numbers can make the sum fall when you grow or rise when you shrink. For the shortest window, record while valid, before shrinking.',
    time: 'O(n)',
    timeNote: 'n = items. Each number is added once and removed at most once.',
    tasks: [
      {
        id: 209,
        title: 'Minimum Size Subarray Sum',
        slug: 'minimum-size-subarray-sum',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'budget',
    title: 'Stay within a budget',
    cue: 'Longest stretch, at most k changes',
    level: 'Core',
    question: '“If we can flip one 0, how long can the run of 1s be?”',
    idea: 'Treat each zero as one change you would need to spend. Keep a window that contains at most k zeros. You do not need to actually flip the array.',
    steps: [
      'Grow right and count any zero that enters.',
      'While over budget, move left and remove its contribution.',
      'Measure only after the window is back within budget.',
    ],
    code: `// A contains only 0 and 1; k >= 0
left = 0; zeros = 0; best = 0
for right = 0 to length(A) - 1:
  if A[right] == 0: zeros += 1
  while zeros > k:
    if A[left] == 0: zeros -= 1
    left += 1
  best = max(best, right - left + 1)
return best`,
    values: ['1', '0', '1', '1', '0', '1'],
    highlight: [0, 1, 2, 3],
    caption:
      'k = 1. Window [1, 0, 1, 1] needs one flip and has length 4. Adding the next 0 would exceed the budget.',
    trap: 'Count zeros inside the current window, not across the whole array. k = 0 is valid: then you are finding an existing run of 1s.',
    time: 'O(n)',
    timeNote: 'n = items. Both edges move forward at most n times.',
    tasks: [
      {
        id: 1004,
        title: 'Max Consecutive Ones III',
        slug: 'max-consecutive-ones-iii',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'distinct',
    title: 'Limit the number of types',
    cue: 'At most k distinct values',
    level: 'Next step',
    question: '“What is the longest stretch with only two fruit types?”',
    idea: 'Count how often each type appears in the window. The number of nonzero counts tells you how many different types you are holding.',
    steps: [
      'Add the new item to a frequency map.',
      'If there are too many types, remove items from the left.',
      'Delete a type when its count reaches zero, then measure.',
    ],
    code: `// k >= 0; use k = 2 for Fruit Into Baskets
left = 0; best = 0
count = map with default value 0
for right = 0 to length(A) - 1:
  count[A[right]] += 1
  while numberOfKeys(count) > k:
    count[A[left]] -= 1
    if count[A[left]] == 0: delete A[left] from count
    left += 1
  best = max(best, right - left + 1)
return best`,
    values: ['1', '2', '1', '3', '3', '2'],
    highlight: [0, 1, 2],
    caption:
      'With k = 2, [1, 2, 1] fits. Adding 3 creates a third type: remove 1, then 2, leaving [1, 3].',
    trap: 'Count different types, not total items. Zero-count keys must be deleted. “At most k” includes windows with fewer types; “exactly k” needs different bookkeeping.',
    time: 'O(n)',
    timeNote: 'n = items, assuming average O(1) map updates.',
    space: 'O(k + 1)',
    spaceNote:
      'At most k types remain after shrinking; adding one new type can temporarily create k + 1. For two baskets, this is constant space.',
    tasks: [
      {
        id: 904,
        title: 'Fruit Into Baskets',
        slug: 'fruit-into-baskets',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'anagrams',
    title: 'Match a bag of letters',
    cue: 'Anagram or permutation in a string',
    level: 'Next step',
    question: '“Does ‘cba’ appear here in any letter order?”',
    idea: 'An anagram uses exactly the same letters with the same counts, possibly in a different order. Slide a window as long as the pattern and compare counts.',
    steps: [
      'Count the pattern’s letters. Its length is the window size.',
      'Add the entering letter and remove the leaving letter.',
      'Equal counts in a full window mean you found a match.',
    ],
    code: `// Nonempty pattern p; lowercase English letters only
k = length(p)
if k > length(s): return false
need = letterCounts(p)  // 26 counters, indexed by letter
have = 26 zero counters
for right = 0 to length(s) - 1:
  have[s[right]] += 1
  if right >= k: have[s[right - k]] -= 1
  if right >= k - 1 and have == need:
    return true  // compare all 26 counters
return false`,
    values: ['z', 'b', 'a', 'c', 'x'],
    highlight: [1, 2, 3],
    caption:
      'Pattern cba → a:1, b:1, c:1. The window bac has those exact counts → true, starting at index 1.',
    trap: 'Counts matter: aab and abb have the same letter types but are not anagrams. For Find All Anagrams, collect right − k + 1 at each match and keep scanning.',
    time: 'O(n + m)',
    timeNote:
      'n = text length; m = pattern length. Comparing 26 counters is fixed work, not a scan of the whole window.',
    spaceNote:
      'Two arrays of 26 counters use O(1) space for this fixed alphabet. Collecting all match indices additionally uses O(r) space for r results.',
    tasks: [
      {
        id: 567,
        title: 'Permutation in String',
        slug: 'permutation-in-string',
        difficulty: 'Medium',
      },
      {
        id: 438,
        title: 'Find All Anagrams in a String',
        slug: 'find-all-anagrams-in-a-string',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'cover',
    title: 'Cover every required character',
    cue: 'Smallest substring containing all of t',
    level: 'Next step',
    question: '“What is the smallest stretch containing A, A, and B?”',
    idea: 'Grow until nothing is missing. Then shrink while all required characters are still covered, saving each smaller answer. Extra characters are allowed.',
    steps: [
      'Track missing characters, including repeated requirements.',
      'When missing reaches zero, save the window and shrink.',
      'Stop shrinking as soon as a required copy is lost.',
    ],
    code: `if t is empty: return ""
need = frequencyMap(t); have = map with default 0
missing = length(t); left = 0
bestStart = 0; bestLength = infinity
for right = 0 to length(s) - 1:
  c = s[right]
  if c in need:
    have[c] += 1
    if have[c] <= need[c]: missing -= 1
  while missing == 0:
    if right - left + 1 < bestLength:
      bestStart = left; bestLength = right - left + 1
    c = s[left]
    if c in need:
      have[c] -= 1
      if have[c] < need[c]: missing += 1
    left += 1
if bestLength == infinity: return ""
return s[bestStart : bestStart + bestLength]`,
    values: ['X', 'A', 'Y', 'B', 'A', 'Z'],
    highlight: [1, 2, 3, 4],
    caption:
      'Need AAB. AYBA contains two As and one B. Drop its first A and it stops working → shortest answer AYBA.',
    trap: 'Save while the window is valid, before removing the left character. Repeated requirements count separately. This is the stretch challenge—try patterns 01–06 first.',
    time: 'O(n + m)',
    timeNote:
      'n = text length; m = required-string length. Counts use average O(1) map operations; save indices instead of copying every candidate.',
    space: 'O(d + w)',
    spaceNote:
      'd = different required characters in the maps; w = length of the returned string. The window bookkeeping itself uses O(d).',
    codeNote:
      'frequencyMap counts each character · slice start:end excludes end · infinity means no answer yet',
    tasks: [
      {
        id: 76,
        title: 'Minimum Window Substring',
        slug: 'minimum-window-substring',
        difficulty: 'Hard',
      },
    ],
  },
]

export const patterns = content.map((pattern) => ({
  ...pattern,
  codeNote:
    pattern.codeNote ??
    'Indices start at 0 · window length = right − left + 1 · count maps default to 0',
}))
