import { useLanguage } from '@/i18n/context'
import type { LocalizedDetail } from './detailed-content'

export function DetailedExplanation({ content }: { content: LocalizedDetail }) {
  const { t, locale } = useLanguage()
  const lesson = content[locale]
  return (
    <section
      className="detailed-explanation"
      aria-label={t('Detailed explanation')}
    >
      <div className="detail-picture">
        <h3>{t('Picture it')}</h3>
        <p>{lesson.picture}</p>
      </div>
      <h3>{t('Let’s walk through it')}</h3>
      <ol className="steps-list detail-steps">
        {lesson.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <div className="detail-reason">
        <h3>{t('Why this works')}</h3>
        <p>{lesson.why}</p>
      </div>
      <div className="detail-code">
        <h3>{t('Connect it to the code')}</h3>
        <p>{lesson.code}</p>
      </div>
    </section>
  )
}
