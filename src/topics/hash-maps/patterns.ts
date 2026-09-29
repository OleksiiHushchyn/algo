import type { Pattern } from '../shared/types'

const content: Pattern[] = [
  {
    id: 'seen',
    title: 'Have I seen it before?',
    cue: 'Duplicates · membership · quick lookup',
    level: 'Start here',
    question: 'Does [4, 1, 7, 4] contain any duplicate?',
    idea: 'A hash set remembers unique values. Before adding each number, ask whether it is already there. A set stores just keys; a map stores a value beside each key, such as a count or index.',
    steps: [
      'Start with an empty set.',
      'If the current number is already in it, you found a repeat.',
      'Otherwise, add the number and continue.',
    ],
    code: `seen = empty set
for x in A:
  if seen contains x: return true
  add x to seen
return false`,
    values: ['4', '1', '7', '4'],
    highlight: [0, 3],
    caption:
      'Before the last 4, seen = {4, 1, 7}. The lookup succeeds: duplicate found.',
    trap: 'Check before adding. If you add first, the current value will always appear to be a repeat.',
    time: 'O(n)',
    timeNote: 'Expected: one pass with average O(1) set lookups.',
    space: 'O(n)',
    spaceNote:
      'In the worst case, every number is different and must be stored.',
    tasks: [
      {
        id: 217,
        title: 'Contains Duplicate',
        slug: 'contains-duplicate',
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: 'partner',
    title: 'Find the missing partner',
    cue: 'Unsorted pairs · target minus current',
    level: 'Start here',
    question: 'Which two indices in [4, 1, 7, 3] add up to 10?',
    idea: 'For each number x, the missing partner is target − x. Store earlier numbers as keys and their indices as values. One lookup replaces searching all earlier numbers. No sorting needed.',
    steps: [
      'Compute the partner you need.',
      'If it is in the map, return its index and the current index.',
      'Otherwise, store the current number → index.',
    ],
    code: `seen = empty map
for i from 0 to length(A) - 1:
  need = target - A[i]
  if seen has key need:
    return [seen[need], i]
  seen[A[i]] = i
return no pair`,
    values: [],
    highlight: [],
    caption: '',
    trap: 'Look up before storing so you cannot reuse one index. In JavaScript, use Map.has(need), not if (map.get(need)): index 0 is a valid answer but is falsy.',
    time: 'O(n)',
    timeNote: 'Expected: one lookup and at most one insert per number.',
    space: 'O(n)',
    spaceNote: 'The map stores up to n earlier numbers.',
    tasks: [{ id: 1, title: 'Two Sum', slug: 'two-sum', difficulty: 'Easy' }],
  },
  {
    id: 'frequency',
    title: 'Count and compare',
    cue: 'Same items · different order · enough copies',
    level: 'Start here',
    question: 'Are “aab” and “aba” made of the same letters?',
    idea: 'A frequency map stores letter → number of copies. Count the first string, then spend one copy for each letter in the second. Anagrams need the same counts, not the same order.',
    steps: [
      'Reject different lengths for anagrams.',
      'Count each letter in the first string.',
      'For each letter in the second, reject if no copies remain; otherwise subtract one.',
    ],
    code: `if length(s) != length(t): return false
count = empty map
for c in s:
  count[c] = count.get(c, 0) + 1
for c in t:
  if count.get(c, 0) == 0: return false
  count[c] -= 1
return true`,
    values: [],
    highlight: [],
    caption: '',
    trap: 'A set loses duplicate counts: “aab” and “abb” have the same set but are not anagrams. For Ransom Note, count the magazine and spend the note’s letters; skip the equal-length check because leftovers are allowed.',
    time: 'O(n + m)',
    timeNote: 'Expected: visit each string once; n and m are their lengths.',
    space: 'O(d)',
    spaceNote:
      'd = distinct letters stored. With a fixed 26-letter alphabet, this is O(1).',
    tasks: [
      {
        id: 242,
        title: 'Valid Anagram',
        slug: 'valid-anagram',
        difficulty: 'Easy',
      },
      {
        id: 383,
        title: 'Ransom Note',
        slug: 'ransom-note',
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: 'unique',
    title: 'Find the first unique item',
    cue: 'First occurrence · appears exactly once',
    level: 'Core',
    question: 'What is the first non-repeating character in “swiss”?',
    idea: 'You cannot know that a letter is unique until you have seen the whole string. Count everything first, then scan the original string again to keep its order.',
    steps: [
      'Build a letter → count map.',
      'Read the original string from left to right.',
      'Return the first index whose letter has count 1, or −1 if none does.',
    ],
    code: `count = empty map
for c in s:
  count[c] = count.get(c, 0) + 1
for i from 0 to length(s) - 1:
  if count[s[i]] == 1: return i
return -1`,
    values: ['s', 'w', 'i', 's', 's'],
    highlight: [1],
    caption:
      'Counts: s → 3, w → 1, i → 1. Scan the string: skip s, return w at index 1.',
    trap: 'Do not return the first letter as soon as its count reaches 1. It might appear again later. Scan the input, rather than relying on a map’s iteration order.',
    time: 'O(n)',
    timeNote: 'Expected: two passes are still linear, not O(n²).',
    space: 'O(d)',
    spaceNote: 'd = distinct letters. A fixed alphabet uses constant space.',
    tasks: [
      {
        id: 387,
        title: 'First Unique Character in a String',
        slug: 'first-unique-character-in-a-string',
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: 'group',
    title: 'Group by a shared key',
    cue: 'Buckets · same signature · anagram groups',
    level: 'Core',
    question: 'How do “eat”, “tea”, and “bat” fall into groups?',
    idea: 'Turn each word into a shared label, called a key. Sorting its letters makes anagrams share the same key: “eat” and “tea” both become “aet”. The map stores key → list of original words.',
    steps: [
      'Sort a copy of each word’s letters and join them into a string key.',
      'Create an empty list for a key the first time you see it.',
      'Append the original word; return all the lists.',
    ],
    code: `groups = empty map
for word in words:
  key = join(sort(letters(word)))
  if groups does not have key:
    groups[key] = empty list
  append word to groups[key]
return all values of groups`,
    values: [],
    highlight: [],
    caption: '',
    trap: 'Append instead of replacing the existing group. In JavaScript, use a string key: two separate arrays with identical letters are different Map keys.',
    time: 'O(n · k log k)',
    timeNote:
      'n = words, k = maximum word length (at least 2 for this bound). Sorting each word dominates; hash operations are expected constant time apart from reading keys.',
    space: 'O(n · k)',
    spaceNote:
      'Upper bound for stored keys, groups, and temporary letters; includes the output lists.',
    tasks: [
      {
        id: 49,
        title: 'Group Anagrams',
        slug: 'group-anagrams',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'mapping',
    title: 'Keep a one-to-one mapping',
    cue: 'Same shape · consistent replacements',
    level: 'Core',
    question: 'Can “egg” become “add” by consistently replacing letters?',
    idea: 'Store the replacement in both directions. A letter must always map to the same partner, and two different letters cannot claim the same partner.',
    steps: [
      'Reject different lengths.',
      'For each pair, check both existing mappings for a conflict.',
      'Store both directions if they agree.',
    ],
    code: `if length(s) != length(t): return false
forward = empty map; backward = empty map
for i from 0 to length(s) - 1:
  a = s[i]; b = t[i]
  if forward has a and forward[a] != b: return false
  if backward has b and backward[b] != a: return false
  forward[a] = b
  backward[b] = a
return true`,
    values: [],
    highlight: [],
    caption: '',
    trap: 'Checking only one direction wrongly accepts “ab” → “cc”. For Word Pattern, split the sentence into words first and pair each pattern letter with one word.',
    time: 'O(n)',
    timeNote: 'Expected: check each character pair once.',
    space: 'O(d)',
    spaceNote:
      'd = distinct characters across the two strings, stored in two maps.',
    tasks: [
      {
        id: 205,
        title: 'Isomorphic Strings',
        slug: 'isomorphic-strings',
        difficulty: 'Easy',
      },
      {
        id: 290,
        title: 'Word Pattern',
        slug: 'word-pattern',
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: 'prefix',
    title: 'Count target-sum subarrays',
    cue: 'Continuous sum · negatives · count all ways',
    level: 'Next step',
    question: 'How many continuous stretches of [1, −1, 1] sum to 1?',
    idea: 'A prefix sum is the total from the start up to now. A stretch’s sum is current prefix − an earlier prefix. So count earlier prefixes equal to current prefix − target, using a prefix → frequency map.',
    steps: [
      'Seed 0 → 1 for the empty prefix before the array.',
      'Add the next number. Look up how many earlier prefixes equal sum − target.',
      'Add that count to the answer, then record the current prefix.',
    ],
    code: `freq = map containing {0: 1}
sum = 0; answer = 0
for x in A:
  sum += x
  answer += freq.get(sum - target, 0)
  freq[sum] = freq.get(sum, 0) + 1
return answer`,
    values: [],
    highlight: [],
    caption: '',
    trap: 'Keep frequencies, not just a set: repeated prefixes represent different starts. Look up before recording to avoid counting an empty stretch when target = 0. With negative numbers, the usual sum-based sliding window is unreliable.',
    time: 'O(n)',
    timeNote: 'Expected: one pass with constant-average-time map operations.',
    space: 'O(n)',
    spaceNote: 'Up to n + 1 distinct prefix sums, including the empty prefix.',
    tasks: [
      {
        id: 560,
        title: 'Subarray Sum Equals K',
        slug: 'subarray-sum-equals-k',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'consecutive',
    title: 'Grow a consecutive run',
    cue: 'Unsorted numbers · longest value streak',
    level: 'Next step',
    question: 'What is the longest consecutive run in [100, 4, 200, 1, 3, 2]?',
    idea: 'Put numbers in a set for quick membership checks. Only start a run at a number whose predecessor is missing. Then walk upward: 1, 2, 3, 4. These values do not need to sit next to each other in the input.',
    steps: [
      'Build a set to remove duplicates.',
      'Skip x if x − 1 exists: a smaller number starts that run.',
      'Otherwise, count x, x + 1, … while present; keep the longest run.',
    ],
    code: `values = set of A
best = 0
for x in values:
  if values contains (x - 1): continue
  end = x
  while values contains end:
    end += 1
  best = max(best, end - x)
return best`,
    values: ['1', '2', '3', '4', '100', '200'],
    highlight: [0, 1, 2, 3],
    caption:
      'Rearranged here only to show the runs. The algorithm does not sort. Starts: 1, 100, 200. Longest run: 4 values.',
    trap: 'Iterate over the set, not the original array. Repeated starting values could otherwise make you recount the same long run many times.',
    time: 'O(n)',
    timeNote:
      'Expected: despite the nested loop, each unique number belongs to just one walked run.',
    space: 'O(n)',
    spaceNote: 'The set stores the distinct input numbers.',
    tasks: [
      {
        id: 128,
        title: 'Longest Consecutive Sequence',
        slug: 'longest-consecutive-sequence',
        difficulty: 'Medium',
      },
    ],
  },
]

export const patterns = content.map((pattern) => ({
  ...pattern,
  codeNote:
    'A = array · indices start at 0 · map.get(key, 0) means read or use 0 if missing (pseudocode). Hash lookups average O(1); worst cases can be slower.',
}))
