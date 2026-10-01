import { java, type CodeExamples } from '../shared/code-examples.ts'

export const codeExamples: Record<string, CodeExamples> = {
  pair: {
    javascript: `// Sorted ascending. Returns zero-based indices.
function findPair(a, target) {
  let left = 0, right = a.length - 1;
  while (left < right) {
    const sum = a[left] + a[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [];
}`,
    java: java(`// Sorted ascending. Returns zero-based indices.
static int[] findPair(int[] a, long target) {
  int left = 0, right = a.length - 1;
  while (left < right) {
    long sum = (long) a[left] + a[right];
    if (sum == target) return new int[]{left, right};
    if (sum < target) left++;
    else right--;
  }
  return new int[0];
}`),
  },
  palindrome: {
    javascript: `// ASCII letters and digits only; ignore other characters.
function isPalindrome(text) {
  const isUseful = c => /[a-z0-9]/i.test(c);
  let left = 0, right = text.length - 1;
  while (left < right) {
    while (left < right && !isUseful(text[left])) left++;
    while (left < right && !isUseful(text[right])) right--;
    if (text[left].toLowerCase() !== text[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}`,
    java: java(`static boolean isUseful(char c) {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')
      || (c >= '0' && c <= '9');
}

// ASCII letters and digits only; ignore other characters.
static boolean isPalindrome(String text) {
  int left = 0, right = text.length() - 1;
  while (left < right) {
    while (left < right && !isUseful(text.charAt(left))) left++;
    while (left < right && !isUseful(text.charAt(right))) right--;
    if (Character.toLowerCase(text.charAt(left)) !=
        Character.toLowerCase(text.charAt(right))) return false;
    left++;
    right--;
  }
  return true;
}`),
  },
  'read-write': {
    javascript: `// Sorted ascending; modifies a. Only the returned prefix matters.
function removeDuplicates(a) {
  let write = 0;
  for (let read = 0; read < a.length; read++) {
    if (write === 0 || a[read] !== a[write - 1]) {
      a[write] = a[read];
      write++;
    }
  }
  return write;
}`,
    java: java(`// Sorted ascending; modifies a. Only the returned prefix matters.
static int removeDuplicates(int[] a) {
  int write = 0;
  for (int read = 0; read < a.length; read++) {
    if (write == 0 || a[read] != a[write - 1]) {
      a[write] = a[read];
      write++;
    }
  }
  return write;
}`),
  },
  subsequence: {
    javascript: `function isSubsequence(s, t) {
  let wanted = 0, scan = 0;
  while (wanted < s.length && scan < t.length) {
    if (s[wanted] === t[scan]) wanted++;
    scan++;
  }
  return wanted === s.length;
}`,
    java: java(`static boolean isSubsequence(String s, String t) {
  int wanted = 0, scan = 0;
  while (wanted < s.length() && scan < t.length()) {
    if (s.charAt(wanted) == t.charAt(scan)) wanted++;
    scan++;
  }
  return wanted == s.length();
}`),
  },
  merge: {
    javascript: `// a has m sorted values plus b.length spare slots; b is sorted.
function merge(a, m, b) {
  let i = m - 1, j = b.length - 1;
  let write = m + b.length - 1;
  while (j >= 0) {
    if (i >= 0 && a[i] > b[j]) a[write--] = a[i--];
    else a[write--] = b[j--];
  }
  // Result is in a; no new array is created.
}`,
    java: java(`// a has m sorted values plus b.length spare slots; b is sorted.
static void merge(int[] a, int m, int[] b) {
  int i = m - 1, j = b.length - 1;
  int write = m + b.length - 1;
  while (j >= 0) {
    if (i >= 0 && a[i] > b[j]) a[write--] = a[i--];
    else a[write--] = b[j--];
  }
  // Result is in a; no new array is created.
}`),
  },
  triplets: {
    javascript: `function threeSum(a) {
  a.sort((x, y) => x - y); // Numeric sort; changes a.
  const result = [];
  for (let fixed = 0; fixed < a.length - 2; fixed++) {
    if (fixed > 0 && a[fixed] === a[fixed - 1]) continue;
    let left = fixed + 1, right = a.length - 1;
    while (left < right) {
      const sum = a[fixed] + a[left] + a[right];
      if (sum < 0) left++;
      else if (sum > 0) right--;
      else {
        result.push([a[fixed], a[left], a[right]]);
        left++;
        right--;
        while (left < right && a[left] === a[left - 1]) left++;
        while (left < right && a[right] === a[right + 1]) right--;
      }
    }
  }
  return result;
}`,
    java: java(`static List<List<Integer>> threeSum(int[] a) {
  Arrays.sort(a); // Changes a.
  List<List<Integer>> result = new ArrayList<>();
  for (int fixed = 0; fixed < a.length - 2; fixed++) {
    if (fixed > 0 && a[fixed] == a[fixed - 1]) continue;
    int left = fixed + 1, right = a.length - 1;
    while (left < right) {
      long sum = (long) a[fixed] + a[left] + a[right];
      if (sum < 0) left++;
      else if (sum > 0) right--;
      else {
        result.add(Arrays.asList(a[fixed], a[left], a[right]));
        left++;
        right--;
        while (left < right && a[left] == a[left - 1]) left++;
        while (left < right && a[right] == a[right + 1]) right--;
      }
    }
  }
  return result;
}`),
  },
  container: {
    javascript: `// Heights are nonnegative.
function maxArea(height) {
  let left = 0, right = height.length - 1, best = 0;
  while (left < right) {
    const area = (right - left) * Math.min(height[left], height[right]);
    best = Math.max(best, area);
    if (height[left] <= height[right]) left++;
    else right--;
  }
  return best;
}`,
    java: java(`// Heights are nonnegative.
static long maxArea(int[] height) {
  int left = 0, right = height.length - 1;
  long best = 0;
  while (left < right) {
    long area = (long) (right - left) * Math.min(height[left], height[right]);
    best = Math.max(best, area);
    if (height[left] <= height[right]) left++;
    else right--;
  }
  return best;
}`),
  },
  'fast-slow': {
    javascript: `// Each node is { val: number, next: anotherNodeOrNull }.
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true; // Same object, not same value.
  }
  return false;
}`,
    java: java(`static class ListNode {
  int val;
  ListNode next;
  ListNode(int val) { this.val = val; }
}

static boolean hasCycle(ListNode head) {
  ListNode slow = head, fast = head;
  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow == fast) return true; // Same node, not same value.
  }
  return false;
}`),
  },
}
