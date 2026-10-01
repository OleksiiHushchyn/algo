import { useLanguage } from './context'
import { normalizeLocale } from './messages'
export function LanguageSelector() {
  const { locale, setLocale, t } = useLanguage()
  return (
    <label className="language-selector">
      <span>{t('Language')}</span>
      <select
        value={locale}
        onChange={(event) =>
          setLocale(normalizeLocale(event.target.value) ?? 'en')
        }
      >
        <option value="en" lang="en">
          English
        </option>
        <option value="ru" lang="ru">
          Русский
        </option>
        <option value="uk" lang="uk">
          Українська
        </option>
      </select>
    </label>
  )
}
