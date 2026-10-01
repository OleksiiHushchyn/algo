import { java, type CodeExamples } from '../shared/code-examples.ts'

export const codeExamples: Record<string, CodeExamples> = {
  exact: {
    javascript: `function binarySearch(a, target) {
  let left = 0, right = a.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (a[mid] === target) return mid;
    if (a[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    java: java(`static int binarySearch(int[] a, int target) {
  int left = 0, right = a.length - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (a[mid] == target) return mid;
    if (a[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`),
  },
  boundary: {
    javascript: `function lowerBound(a, target) {
  let left = 0, right = a.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (a[mid] >= target) right = mid;
    else left = mid + 1;
  }
  return left;
}`,
    java: java(`static int lowerBound(int[] a, int target) {
  int left = 0, right = a.length;
  while (left < right) {
    int mid = left + (right - left) / 2;
    if (a[mid] >= target) right = mid;
    else left = mid + 1;
  }
  return left;
}`),
  },
  range: {
    javascript: `function boundary(a, target, strict) {
  let left = 0, right = a.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    const matches = strict ? a[mid] > target : a[mid] >= target;
    if (matches) right = mid;
    else left = mid + 1;
  }
  return left;
}

function searchRange(a, target) {
  const start = boundary(a, target, false);
  const end = boundary(a, target, true);
  return start === end ? [-1, -1] : [start, end - 1];
}`,
    java: java(`static int boundary(int[] a, int target, boolean strict) {
  int left = 0, right = a.length;
  while (left < right) {
    int mid = left + (right - left) / 2;
    boolean matches = strict ? a[mid] > target : a[mid] >= target;
    if (matches) right = mid;
    else left = mid + 1;
  }
  return left;
}

static int[] searchRange(int[] a, int target) {
  int start = boundary(a, target, false);
  int end = boundary(a, target, true);
  return start == end ? new int[]{-1, -1} : new int[]{start, end - 1};
}`),
  },
  rotated: {
    javascript: `// Sorted then rotated; values must be distinct.
function searchRotated(a, target) {
  let left = 0, right = a.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (a[mid] === target) return mid;
    if (a[left] <= a[mid]) {
      if (a[left] <= target && target < a[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (a[mid] < target && target <= a[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}`,
    java: java(`// Sorted then rotated; values must be distinct.
static int searchRotated(int[] a, int target) {
  int left = 0, right = a.length - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (a[mid] == target) return mid;
    if (a[left] <= a[mid]) {
      if (a[left] <= target && target < a[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (a[mid] < target && target <= a[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}`),
  },
  minimum: {
    javascript: `// Nonempty rotated sorted array; distinct values.
function findMin(a) {
  let left = 0, right = a.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (a[mid] > a[right]) left = mid + 1;
    else right = mid;
  }
  return a[left];
}`,
    java: java(`// Nonempty rotated sorted array; distinct values.
static int findMin(int[] a) {
  int left = 0, right = a.length - 1;
  while (left < right) {
    int mid = left + (right - left) / 2;
    if (a[mid] > a[right]) left = mid + 1;
    else right = mid;
  }
  return a[left];
}`),
  },
  answer: {
    javascript: `// Positive, nonempty piles; hours >= piles.length.
function minSpeed(piles, hours) {
  let left = 1, right = 0;
  for (const pile of piles) right = Math.max(right, pile);
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    let needed = 0;
    for (const pile of piles) needed += Math.ceil(pile / mid);
    if (needed <= hours) right = mid;
    else left = mid + 1;
  }
  return left;
}`,
    java: java(`// Positive, nonempty piles; hours >= piles.length.
static int minSpeed(int[] piles, int hours) {
  int left = 1, right = 0;
  for (int pile : piles) right = Math.max(right, pile);
  while (left < right) {
    int mid = left + (right - left) / 2;
    long needed = 0; // long prevents overflow of the total.
    for (int pile : piles) needed += (pile + (long) mid - 1) / mid;
    if (needed <= hours) right = mid;
    else left = mid + 1;
  }
  return left;
}`),
  },
  peak: {
    javascript: `// Nonempty array; adjacent values are unequal.
function findPeak(a) {
  let left = 0, right = a.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (a[mid] < a[mid + 1]) left = mid + 1;
    else right = mid;
  }
  return left; // Index of a peak, including possible endpoints.
}`,
    java: java(`// Nonempty array; adjacent values are unequal.
static int findPeak(int[] a) {
  int left = 0, right = a.length - 1;
  while (left < right) {
    int mid = left + (right - left) / 2;
    if (a[mid] < a[mid + 1]) left = mid + 1;
    else right = mid;
  }
  return left; // Index of a peak, including possible endpoints.
}`),
  },
}
