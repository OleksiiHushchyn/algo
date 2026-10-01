import { useLanguage } from '@/i18n/context'
import { isCodeLanguage, useCodeLanguage } from './code-language'
import type { Pattern } from './types'

export function CodeBlock({ pattern }: { pattern: Pattern }) {
  const { t } = useLanguage()
  const { language, setLanguage } = useCodeLanguage()
  const name =
    language === 'pseudocode'
      ? t('Pseudocode')
      : language === 'javascript'
        ? 'JavaScript'
        : 'Java'
  const code =
    language === 'pseudocode' ? pattern.code : pattern.codeExamples[language]
  const note =
    language === 'pseudocode'
      ? t(
          pattern.codeNote ??
            'A = array · indices start at 0 · floor = round down',
        )
      : language === 'javascript'
        ? t(
            'JavaScript function · indices start at 0 · use safe integer inputs and totals. String indexing uses UTF-16 units; examples use basic letters.',
          )
        : t(
            'Save as Solution.java · call the static method from your own main or tests. String indexing uses UTF-16 units; examples use basic letters.',
          )
  return (
    <section className="code-section" aria-label={name}>
      <div className="code-title code-toolbar">
        <label className="code-language-selector">
          {t('Code language')}
          <select
            value={language}
            onChange={(event) => {
              if (isCodeLanguage(event.target.value))
                setLanguage(event.target.value)
            }}
          >
            <option value="pseudocode">{t('Pseudocode')}</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
          </select>
        </label>
        <span>
          {language === 'pseudocode'
            ? t('Plain logic · any language')
            : t('Same pattern · real code')}
        </span>
      </div>
      <pre
        tabIndex={0}
        aria-label={
          language === 'pseudocode'
            ? t('{title} pseudocode', { title: t(pattern.title) })
            : t('{title} · {language} code', {
                title: t(pattern.title),
                language: name,
              })
        }
      >
        <code>
          {code.split('\n').map((line, index) => (
            <span className="code-line" key={index}>
              <span className="line-number" aria-hidden="true">
                {index + 1}
              </span>
              <span
                className={line.trim().startsWith('//') ? 'code-comment' : ''}
              >
                {line || ' '}
              </span>
            </span>
          ))}
        </code>
      </pre>
      <div className="code-footnote">{note}</div>
    </section>
  )
}
