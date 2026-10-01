import { java, type CodeExamples } from '../shared/code-examples.ts'

export const codeExamples: Record<string, CodeExamples> = {
  seen: {
    javascript: `function containsDuplicate(a) {
  const seen = new Set();
  for (const x of a) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}`,
    java: java(`static boolean containsDuplicate(int[] a) {
  Set<Integer> seen = new HashSet<>();
  for (int x : a) {
    if (seen.contains(x)) return true;
    seen.add(x);
  }
  return false;
}`),
  },
  partner: {
    javascript: `function twoSum(a, target) {
  const seen = new Map();
  for (let i = 0; i < a.length; i++) {
    const need = target - a[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(a[i], i); // Store only after checking.
  }
  return [];
}`,
    java: java(`static int[] twoSum(int[] a, long target) {
  Map<Long, Integer> seen = new HashMap<>();
  for (int i = 0; i < a.length; i++) {
    long need = target - a[i];
    if (seen.containsKey(need)) return new int[]{seen.get(need), i};
    seen.put((long) a[i], i); // Store only after checking.
  }
  return new int[0];
}`),
  },
  frequency: {
    javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Map();
  for (let i = 0; i < s.length; i++) {
    count.set(s[i], (count.get(s[i]) ?? 0) + 1);
  }
  for (let i = 0; i < t.length; i++) {
    const copies = count.get(t[i]) ?? 0;
    if (copies === 0) return false;
    count.set(t[i], copies - 1);
  }
  return true;
}`,
    java: java(`static boolean isAnagram(String s, String t) {
  if (s.length() != t.length()) return false;
  Map<Character, Integer> count = new HashMap<>();
  for (int i = 0; i < s.length(); i++) {
    char c = s.charAt(i);
    count.put(c, count.getOrDefault(c, 0) + 1);
  }
  for (int i = 0; i < t.length(); i++) {
    char c = t.charAt(i);
    int copies = count.getOrDefault(c, 0);
    if (copies == 0) return false;
    count.put(c, copies - 1);
  }
  return true;
}`),
  },
  unique: {
    javascript: `function firstUnique(s) {
  const count = new Map();
  for (let i = 0; i < s.length; i++) {
    count.set(s[i], (count.get(s[i]) ?? 0) + 1);
  }
  for (let i = 0; i < s.length; i++) {
    if (count.get(s[i]) === 1) return i;
  }
  return -1;
}`,
    java: java(`static int firstUnique(String s) {
  Map<Character, Integer> count = new HashMap<>();
  for (int i = 0; i < s.length(); i++) {
    char c = s.charAt(i);
    count.put(c, count.getOrDefault(c, 0) + 1);
  }
  for (int i = 0; i < s.length(); i++) {
    if (count.get(s.charAt(i)) == 1) return i;
  }
  return -1;
}`),
  },
  group: {
    javascript: `function groupAnagrams(words) {
  const groups = new Map();
  for (const word of words) {
    const key = word.split("").sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()];
}`,
    java: java(`static List<List<String>> groupAnagrams(String[] words) {
  Map<String, List<String>> groups = new HashMap<>();
  for (String word : words) {
    char[] letters = word.toCharArray();
    Arrays.sort(letters);
    String key = new String(letters);
    if (!groups.containsKey(key)) groups.put(key, new ArrayList<>());
    groups.get(key).add(word);
  }
  return new ArrayList<>(groups.values()); // Group order may vary.
}`),
  },
  mapping: {
    javascript: `function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  const forward = new Map(), backward = new Map();
  for (let i = 0; i < s.length; i++) {
    const a = s[i], b = t[i];
    if (forward.has(a) && forward.get(a) !== b) return false;
    if (backward.has(b) && backward.get(b) !== a) return false;
    forward.set(a, b);
    backward.set(b, a);
  }
  return true;
}`,
    java: java(`static boolean isIsomorphic(String s, String t) {
  if (s.length() != t.length()) return false;
  Map<Character, Character> forward = new HashMap<>(), backward = new HashMap<>();
  for (int i = 0; i < s.length(); i++) {
    char a = s.charAt(i), b = t.charAt(i);
    if (forward.containsKey(a) && forward.get(a) != b) return false;
    if (backward.containsKey(b) && backward.get(b) != a) return false;
    forward.put(a, b);
    backward.put(b, a);
  }
  return true;
}`),
  },
  prefix: {
    javascript: `function countSubarrays(a, target) {
  const freq = new Map([[0, 1]]);
  let sum = 0, answer = 0;
  for (const x of a) {
    sum += x;
    answer += freq.get(sum - target) ?? 0;
    freq.set(sum, (freq.get(sum) ?? 0) + 1);
  }
  return answer;
}`,
    java: java(`static long countSubarrays(int[] a, long target) {
  Map<Long, Long> freq = new HashMap<>();
  freq.put(0L, 1L); // Empty prefix.
  long sum = 0, answer = 0;
  for (int x : a) {
    sum += x;
    answer += freq.getOrDefault(sum - target, 0L);
    freq.put(sum, freq.getOrDefault(sum, 0L) + 1);
  }
  return answer;
}`),
  },
  consecutive: {
    javascript: `function longestConsecutive(a) {
  const values = new Set(a);
  let best = 0;
  for (const x of values) {
    if (values.has(x - 1)) continue;
    let end = x;
    while (values.has(end)) end++;
    best = Math.max(best, end - x);
  }
  return best;
}`,
    java: java(`static int longestConsecutive(int[] a) {
  // Long keys keep x - 1 and end++ safe at int boundaries.
  Set<Long> values = new HashSet<>();
  for (int x : a) values.add((long) x);
  int best = 0;
  for (long x : values) {
    if (values.contains(x - 1)) continue;
    long end = x;
    while (values.contains(end)) end++;
    best = Math.max(best, (int) (end - x));
  }
  return best;
}`),
  },
}
