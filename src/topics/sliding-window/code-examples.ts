import { java, type CodeExamples } from '../shared/code-examples.ts'

export const codeExamples: Record<string, CodeExamples> = {
  fixed: {
    javascript: `// Requires 1 <= k <= a.length.
function maxWindowSum(a, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += a[i];
  let best = sum;
  for (let right = k; right < a.length; right++) {
    sum -= a[right - k];
    sum += a[right];
    best = Math.max(best, sum);
  }
  return best; // For maximum average, return best / k.
}`,
    java: java(`// Requires 1 <= k <= a.length.
static long maxWindowSum(int[] a, int k) {
  long sum = 0;
  for (int i = 0; i < k; i++) sum += a[i];
  long best = sum;
  for (int right = k; right < a.length; right++) {
    sum -= a[right - k];
    sum += a[right];
    best = Math.max(best, sum);
  }
  return best; // For maximum average, use (double) best / k.
}`),
  },
  unique: {
    javascript: `function longestUnique(s) {
  const count = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    count.set(c, (count.get(c) ?? 0) + 1);
    while (count.get(c) > 1) {
      count.set(s[left], count.get(s[left]) - 1);
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
    java: java(`static int longestUnique(String s) {
  Map<Character, Integer> count = new HashMap<>();
  int left = 0, best = 0;
  for (int right = 0; right < s.length(); right++) {
    char c = s.charAt(right);
    count.put(c, count.getOrDefault(c, 0) + 1);
    while (count.get(c) > 1) {
      char leaving = s.charAt(left++);
      count.put(leaving, count.get(leaving) - 1);
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`),
  },
  'minimum-sum': {
    javascript: `// All numbers and target must be positive.
function minLength(a, target) {
  let left = 0, sum = 0, best = Infinity;
  for (let right = 0; right < a.length; right++) {
    sum += a[right];
    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= a[left++];
    }
  }
  return best === Infinity ? 0 : best;
}`,
    java: java(`// All numbers and target must be positive.
static int minLength(int[] a, long target) {
  int left = 0, best = Integer.MAX_VALUE;
  long sum = 0;
  for (int right = 0; right < a.length; right++) {
    sum += a[right];
    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= a[left++];
    }
  }
  return best == Integer.MAX_VALUE ? 0 : best;
}`),
  },
  budget: {
    javascript: `// a contains only 0 and 1; k >= 0.
function longestOnes(a, k) {
  let left = 0, zeros = 0, best = 0;
  for (let right = 0; right < a.length; right++) {
    if (a[right] === 0) zeros++;
    while (zeros > k) {
      if (a[left] === 0) zeros--;
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
    java: java(`// a contains only 0 and 1; k >= 0.
static int longestOnes(int[] a, int k) {
  int left = 0, zeros = 0, best = 0;
  for (int right = 0; right < a.length; right++) {
    if (a[right] == 0) zeros++;
    while (zeros > k) {
      if (a[left] == 0) zeros--;
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`),
  },
  distinct: {
    javascript: `// k >= 0. Use k = 2 for Fruit Into Baskets.
function longestTypes(a, k) {
  const count = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < a.length; right++) {
    count.set(a[right], (count.get(a[right]) ?? 0) + 1);
    while (count.size > k) {
      const leaving = a[left++];
      count.set(leaving, count.get(leaving) - 1);
      if (count.get(leaving) === 0) count.delete(leaving);
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
    java: java(`// k >= 0. Use k = 2 for Fruit Into Baskets.
static int longestTypes(int[] a, int k) {
  Map<Integer, Integer> count = new HashMap<>();
  int left = 0, best = 0;
  for (int right = 0; right < a.length; right++) {
    count.put(a[right], count.getOrDefault(a[right], 0) + 1);
    while (count.size() > k) {
      int leaving = a[left++];
      count.put(leaving, count.get(leaving) - 1);
      if (count.get(leaving) == 0) count.remove(leaving);
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`),
  },
  anagrams: {
    javascript: `// Nonempty p; both strings use lowercase English letters.
function containsPermutation(s, p) {
  const k = p.length;
  if (k > s.length) return false;
  const need = Array(26).fill(0), have = Array(26).fill(0);
  for (let i = 0; i < k; i++) need[p.charCodeAt(i) - 97]++;
  for (let right = 0; right < s.length; right++) {
    have[s.charCodeAt(right) - 97]++;
    if (right >= k) have[s.charCodeAt(right - k) - 97]--;
    if (right >= k - 1 && have.every((n, i) => n === need[i])) {
      return true;
    }
  }
  return false;
}`,
    java: java(`// Nonempty p; both strings use lowercase English letters.
static boolean containsPermutation(String s, String p) {
  int k = p.length();
  if (k > s.length()) return false;
  int[] need = new int[26], have = new int[26];
  for (int i = 0; i < k; i++) need[p.charAt(i) - 'a']++;
  for (int right = 0; right < s.length(); right++) {
    have[s.charAt(right) - 'a']++;
    if (right >= k) have[s.charAt(right - k) - 'a']--;
    if (right >= k - 1 && Arrays.equals(have, need)) return true;
  }
  return false;
}`),
  },
  cover: {
    javascript: `function minWindow(s, t) {
  if (t.length === 0) return "";
  const need = new Map(), have = new Map();
  for (let i = 0; i < t.length; i++) {
    need.set(t[i], (need.get(t[i]) ?? 0) + 1);
  }
  let missing = t.length, left = 0;
  let bestStart = 0, bestLength = Infinity;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (need.has(c)) {
      have.set(c, (have.get(c) ?? 0) + 1);
      if (have.get(c) <= need.get(c)) missing--;
    }
    while (missing === 0) {
      if (right - left + 1 < bestLength) {
        bestStart = left;
        bestLength = right - left + 1;
      }
      const leaving = s[left++];
      if (need.has(leaving)) {
        have.set(leaving, have.get(leaving) - 1);
        if (have.get(leaving) < need.get(leaving)) missing++;
      }
    }
  }
  return bestLength === Infinity ? "" : s.slice(bestStart, bestStart + bestLength);
}`,
    java: java(`static String minWindow(String s, String t) {
  if (t.isEmpty()) return "";
  Map<Character, Integer> need = new HashMap<>(), have = new HashMap<>();
  for (int i = 0; i < t.length(); i++) {
    char c = t.charAt(i);
    need.put(c, need.getOrDefault(c, 0) + 1);
  }
  int missing = t.length(), left = 0;
  int bestStart = 0, bestLength = Integer.MAX_VALUE;
  for (int right = 0; right < s.length(); right++) {
    char c = s.charAt(right);
    if (need.containsKey(c)) {
      have.put(c, have.getOrDefault(c, 0) + 1);
      if (have.get(c) <= need.get(c)) missing--;
    }
    while (missing == 0) {
      if (right - left + 1 < bestLength) {
        bestStart = left;
        bestLength = right - left + 1;
      }
      char leaving = s.charAt(left++);
      if (need.containsKey(leaving)) {
        have.put(leaving, have.get(leaving) - 1);
        if (have.get(leaving) < need.get(leaving)) missing++;
      }
    }
  }
  return bestLength == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLength);
}`),
  },
}
