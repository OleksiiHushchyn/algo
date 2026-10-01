import { useId } from 'react'
import { useLanguage } from '@/i18n/context'
import { useExplanationMode } from './explanation-mode'

export function ExplanationSelector() {
  const { t } = useLanguage()
  const { mode, setMode } = useExplanationMode()
  const name = useId()
  return (
    <fieldset className="explanation-selector">
      <legend>{t('Explanation mode')}</legend>
      <div className="explanation-options">
        {(['compact', 'detailed'] as const).map((value) => (
          <label key={value} className={mode === value ? 'selected' : ''}>
            <input
              type="radio"
              name={name}
              value={value}
              checked={mode === value}
              onChange={() => setMode(value)}
            />
            {t(value === 'compact' ? 'Compact' : 'Detailed')}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
