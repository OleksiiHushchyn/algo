import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { runInNewContext } from 'node:vm'
import { codeExamples as binary } from '../src/topics/binary-search/code-examples.ts'
import { codeExamples as pointers } from '../src/topics/two-pointers/code-examples.ts'
import { codeExamples as windows } from '../src/topics/sliding-window/code-examples.ts'
import { codeExamples as maps } from '../src/topics/hash-maps/code-examples.ts'

// Each row checks the displayed source itself, including helpers and mutations.
// C is replaced with the corresponding Java example's isolated class name.
const cases = [
  [
    binary,
    'exact',
    'binarySearch([2,4,7], 4) === 1 && binarySearch([], 1) === -1 && binarySearch([2], 3) === -1',
    'check(C.binarySearch(new int[]{2,4,7},4)==1 && C.binarySearch(new int[]{},1)==-1 && C.binarySearch(new int[]{2},3)==-1);',
  ],
  [
    binary,
    'boundary',
    'lowerBound([2,4,4,7],4) === 1 && lowerBound([2,4],9) === 2 && lowerBound([],0) === 0',
    'check(C.lowerBound(new int[]{2,4,4,7},4)==1 && C.lowerBound(new int[]{2,4},9)==2 && C.lowerBound(new int[]{},0)==0);',
  ],
  [
    binary,
    'range',
    'JSON.stringify(searchRange([1,4,4,4,7],4)) === "[1,3]" && JSON.stringify(searchRange([],4)) === "[-1,-1]"',
    'check(Arrays.equals(C.searchRange(new int[]{1,4,4,4,7},4),new int[]{1,3}) && Arrays.equals(C.searchRange(new int[]{},4),new int[]{-1,-1}));',
  ],
  [
    binary,
    'rotated',
    'searchRotated([8,11,15,19,1,3,6],3) === 5 && searchRotated([3,1],3) === 0 && searchRotated([],3) === -1',
    'check(C.searchRotated(new int[]{8,11,15,19,1,3,6},3)==5 && C.searchRotated(new int[]{3,1},3)==0 && C.searchRotated(new int[]{},3)==-1);',
  ],
  [
    binary,
    'minimum',
    'findMin([8,11,15,19,1,3,6]) === 1 && findMin([2,4]) === 2 && findMin([7]) === 7',
    'check(C.findMin(new int[]{8,11,15,19,1,3,6})==1 && C.findMin(new int[]{2,4})==2 && C.findMin(new int[]{7})==7);',
  ],
  [
    binary,
    'answer',
    'minSpeed([4,6],3) === 4 && minSpeed([1000000000,1000000000,1000000000],3) === 1000000000',
    'check(C.minSpeed(new int[]{4,6},3)==4 && C.minSpeed(new int[]{1000000000,1000000000,1000000000},3)==1000000000);',
  ],
  [
    binary,
    'peak',
    'findPeak([2,6,3,5,9,4]) === 4 && findPeak([1]) === 0 && findPeak([3,2,1]) === 0',
    'check(C.findPeak(new int[]{2,6,3,5,9,4})==4 && C.findPeak(new int[]{1})==0 && C.findPeak(new int[]{3,2,1})==0);',
  ],
  [
    pointers,
    'pair',
    'JSON.stringify(findPair([1,3,7,9],10)) === "[0,3]" && findPair([5],10).length === 0',
    'check(Arrays.equals(C.findPair(new int[]{1,3,7,9},10),new int[]{0,3}) && C.findPair(new int[]{5},10).length==0 && C.findPair(new int[]{2147483647,2147483647},4294967294L).length==2);',
  ],
  [
    pointers,
    'palindrome',
    'isPalindrome("Level!") && isPalindrome("") && isPalindrome("!?") && !isPalindrome("race a car")',
    'check(C.isPalindrome("Level!") && C.isPalindrome("") && C.isPalindrome("!?") && !C.isPalindrome("race a car"));',
  ],
  [
    pointers,
    'read-write',
    '(() => { const a=[2,2,5,5,8]; const k=removeDuplicates(a); return k===3 && JSON.stringify(a.slice(0,k))==="[2,5,8]" && removeDuplicates([])===0; })()',
    'int[] a={2,2,5,5,8}; int k=C.removeDuplicates(a); check(k==3 && Arrays.equals(Arrays.copyOf(a,k),new int[]{2,5,8}) && C.removeDuplicates(new int[]{})==0);',
  ],
  [
    pointers,
    'subsequence',
    'isSubsequence("cat","coat") && isSubsequence("","a") && !isSubsequence("tac","coat")',
    'check(C.isSubsequence("cat","coat") && C.isSubsequence("","a") && !C.isSubsequence("tac","coat"));',
  ],
  [
    pointers,
    'merge',
    '(() => { const a=[1,5,9,0,0,0]; merge(a,3,[2,6,8]); const b=[0]; merge(b,0,[1]); return JSON.stringify(a)==="[1,2,5,6,8,9]" && b[0]===1; })()',
    'int[] a={1,5,9,0,0,0}; C.merge(a,3,new int[]{2,6,8}); int[] b={0}; C.merge(b,0,new int[]{1}); check(Arrays.equals(a,new int[]{1,2,5,6,8,9}) && b[0]==1);',
  ],
  [
    pointers,
    'triplets',
    'JSON.stringify(threeSum([-1,0,1,2,-1,-4])) === "[[-1,-1,2],[-1,0,1]]" && JSON.stringify(threeSum([0,0,0,0])) === "[[0,0,0]]" && threeSum([]).length === 0',
    'check(C.threeSum(new int[]{-1,0,1,2,-1,-4}).toString().equals("[[-1, -1, 2], [-1, 0, 1]]") && C.threeSum(new int[]{0,0,0,0}).size()==1 && C.threeSum(new int[]{}).isEmpty());',
  ],
  [
    pointers,
    'container',
    'maxArea([1,8,6,2,5,4,8,3,7]) === 49 && maxArea([]) === 0',
    'check(C.maxArea(new int[]{1,8,6,2,5,4,8,3,7})==49 && C.maxArea(new int[]{})==0 && C.maxArea(new int[]{2147483647,0,2147483647})==4294967294L);',
  ],
  [
    pointers,
    'fast-slow',
    '(() => { const a={val:1,next:null}; a.next=a; return hasCycle(a) && !hasCycle(null) && !hasCycle({val:1,next:{val:1,next:null}}); })()',
    'C.ListNode a=new C.ListNode(1); a.next=a; C.ListNode b=new C.ListNode(1); b.next=new C.ListNode(1); check(C.hasCycle(a) && !C.hasCycle(null) && !C.hasCycle(b));',
  ],
  [
    windows,
    'fixed',
    'maxWindowSum([2,1,5,1,3,2],3) === 9 && maxWindowSum([-4,-2,-7],2) === -6',
    'check(C.maxWindowSum(new int[]{2,1,5,1,3,2},3)==9 && C.maxWindowSum(new int[]{-4,-2,-7},2)==-6);',
  ],
  [
    windows,
    'unique',
    'longestUnique("abcaac") === 3 && longestUnique("abba") === 2 && longestUnique("") === 0',
    'check(C.longestUnique("abcaac")==3 && C.longestUnique("abba")==2 && C.longestUnique("")==0);',
  ],
  [
    windows,
    'minimum-sum',
    'minLength([2,1,5,3],8) === 2 && minLength([1,2],9) === 0 && minLength([],1) === 0',
    'check(C.minLength(new int[]{2,1,5,3},8)==2 && C.minLength(new int[]{1,2},9)==0 && C.minLength(new int[]{},1)==0);',
  ],
  [
    windows,
    'budget',
    'longestOnes([1,0,1,1,0,1],1) === 4 && longestOnes([0,0],0) === 0 && longestOnes([],2) === 0',
    'check(C.longestOnes(new int[]{1,0,1,1,0,1},1)==4 && C.longestOnes(new int[]{0,0},0)==0 && C.longestOnes(new int[]{},2)==0);',
  ],
  [
    windows,
    'distinct',
    'longestTypes([1,2,1,3,3,2],2) === 3 && longestTypes([1],0) === 0 && longestTypes([],2) === 0',
    'check(C.longestTypes(new int[]{1,2,1,3,3,2},2)==3 && C.longestTypes(new int[]{1},0)==0 && C.longestTypes(new int[]{},2)==0);',
  ],
  [
    windows,
    'anagrams',
    'containsPermutation("zbacx","cba") && !containsPermutation("abb","aab") && !containsPermutation("a","aa")',
    'check(C.containsPermutation("zbacx","cba") && !C.containsPermutation("abb","aab") && !C.containsPermutation("a","aa"));',
  ],
  [
    windows,
    'cover',
    'minWindow("XAYBAZ","AAB") === "AYBA" && minWindow("ADOBECODEBANC","ABC") === "BANC" && minWindow("a","aa") === "" && minWindow("a","") === ""',
    'check(C.minWindow("XAYBAZ","AAB").equals("AYBA") && C.minWindow("ADOBECODEBANC","ABC").equals("BANC") && C.minWindow("a","aa").isEmpty() && C.minWindow("a","").isEmpty());',
  ],
  [
    maps,
    'seen',
    'containsDuplicate([4,1,7,4]) && !containsDuplicate([]) && !containsDuplicate([1,2])',
    'check(C.containsDuplicate(new int[]{4,1,7,4}) && !C.containsDuplicate(new int[]{}) && !C.containsDuplicate(new int[]{1,2}));',
  ],
  [
    maps,
    'partner',
    'JSON.stringify(twoSum([4,1,7,3],5)) === "[0,1]" && JSON.stringify(twoSum([3,3],6)) === "[0,1]" && twoSum([3],6).length === 0',
    'check(Arrays.equals(C.twoSum(new int[]{4,1,7,3},5),new int[]{0,1}) && Arrays.equals(C.twoSum(new int[]{3,3},6),new int[]{0,1}) && C.twoSum(new int[]{3},6).length==0);',
  ],
  [
    maps,
    'frequency',
    'isAnagram("aab","aba") && !isAnagram("aab","abb") && isAnagram("","")',
    'check(C.isAnagram("aab","aba") && !C.isAnagram("aab","abb") && C.isAnagram("",""));',
  ],
  [
    maps,
    'unique',
    'firstUnique("swiss") === 1 && firstUnique("aabb") === -1 && firstUnique("") === -1',
    'check(C.firstUnique("swiss")==1 && C.firstUnique("aabb")==-1 && C.firstUnique("")==-1);',
  ],
  [
    maps,
    'group',
    'JSON.stringify(groupAnagrams(["eat","tea","bat"])) === \'[["eat","tea"],["bat"]]\' && JSON.stringify(groupAnagrams(["",""])) === \'[["",""]]\'',
    'List<List<String>> groups=C.groupAnagrams(new String[]{"eat","tea","bat"}); check(groups.size()==2 && groups.contains(Arrays.asList("eat","tea")) && groups.contains(Arrays.asList("bat")) && C.groupAnagrams(new String[]{"",""}).get(0).size()==2);',
  ],
  [
    maps,
    'mapping',
    'isIsomorphic("egg","add") && !isIsomorphic("ab","cc") && !isIsomorphic("aa","bc") && isIsomorphic("","")',
    'check(C.isIsomorphic("egg","add") && !C.isIsomorphic("ab","cc") && !C.isIsomorphic("aa","bc") && C.isIsomorphic("",""));',
  ],
  [
    maps,
    'prefix',
    'countSubarrays([1,-1,1],1) === 3 && countSubarrays([0,0,0],0) === 6 && countSubarrays([],0) === 0',
    'check(C.countSubarrays(new int[]{1,-1,1},1)==3 && C.countSubarrays(new int[]{0,0,0},0)==6 && C.countSubarrays(new int[]{},0)==0);',
  ],
  [
    maps,
    'consecutive',
    'longestConsecutive([100,4,200,1,3,2,1]) === 4 && longestConsecutive([]) === 0 && longestConsecutive([-1,0,1]) === 3',
    'check(C.longestConsecutive(new int[]{100,4,200,1,3,2,1})==4 && C.longestConsecutive(new int[]{})==0 && C.longestConsecutive(new int[]{Integer.MIN_VALUE,Integer.MAX_VALUE})==1);',
  ],
]

for (const topic of [binary, pointers, windows, maps]) {
  assert.deepEqual(
    cases
      .filter(([source]) => source === topic)
      .map(([, id]) => id)
      .sort(),
    Object.keys(topic).sort(),
    'Every example needs executable checks',
  )
}
const classes = [],
  checks = []
cases.forEach(([topic, id, jsCheck, javaCheck], index) => {
  const example = topic[id]
  assert.equal(
    runInNewContext(`${example.javascript}\n${jsCheck}`, {}, { timeout: 1000 }),
    true,
    `JavaScript: ${id}`,
  )
  classes.push(
    example.java
      .replace('import java.util.*;', '')
      .replace('class Solution {', `class Example${index} {`),
  )
  checks.push(`// ${id}\n{ ${javaCheck.replaceAll('C.', `Example${index}.`)} }`)
})
console.log(
  `JavaScript: all ${cases.length} examples passed normal and edge cases.`,
)
const directory = mkdtempSync(join(tmpdir(), 'algo-code-examples-'))
try {
  writeFileSync(
    join(directory, 'ExampleChecks.java'),
    `import java.util.*;\n${classes.join('\n')}\nclass ExampleChecks {\nstatic void check(boolean ok) { if (!ok) throw new AssertionError(); }\npublic static void main(String[] args) {\n${checks.join('\n')}\n}\n}`,
  )
  execFileSync('javac', ['ExampleChecks.java'], {
    cwd: directory,
    timeout: 30000,
    stdio: 'pipe',
  })
  execFileSync('java', ['-cp', directory, 'ExampleChecks'], {
    timeout: 30000,
    stdio: 'pipe',
  })
  console.log(
    `Java: all ${cases.length} examples compiled and passed normal and edge cases.`,
  )
} finally {
  rmSync(directory, { recursive: true, force: true })
}
