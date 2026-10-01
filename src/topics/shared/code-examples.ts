export type CodeExamples = { javascript: string; java: string }

// Keep every Java example copyable as Solution.java, including helper methods.
export function java(methods: string): string {
  return `import java.util.*;\n\nclass Solution {\n${methods
    .split('\n')
    .map((line) => (line ? `  ${line}` : ''))
    .join('\n')}\n}`
}
