import { useLanguage } from '@/i18n/context'
import { TopicPage } from '../shared/topic-page'
import { MapTable, MapVisualizer } from './map-visualizer'
import { patterns } from './patterns'

export function HashMapsPage() {
  const { t } = useLanguage()

  return (
    <TopicPage
      title="Hash maps"
      number="04"
      category="Remember what matters"
      description="Save a useful fact. Find it again in one lookup."
      stamp="#"
      stampCaption="key → value"
      clue="Think hash map when you repeatedly ask: have I seen this, how many copies, or where is its partner? Choose what to remember: key → count, index, or group. Use a set when you only need yes or no."
      patterns={patterns}
      diagrams={{
        partner: <MapVisualizer mode="pair" />,
        prefix: <MapVisualizer mode="prefix" />,
        frequency: (
          <figure className="static-diagram">
            <span className="eyebrow">
              {t('Count “aab”, then spend “aba”')}
            </span>
            <MapTable
              columns={['Key · letter', 'Value · copies left']}
              entries={[
                ['a', '2 → 1 → 1 → 0'],
                ['b', '1 → 1 → 0 → 0'],
              ]}
            />
            <figcaption>
              {t(
                'Spend a, then b, then a. Every lookup has a copy available; both counts end at 0. ',
              )}
            </figcaption>
          </figure>
        ),
        group: (
          <figure className="static-diagram">
            <span className="eyebrow">{t('Different words, shared key')}</span>
            <MapTable
              columns={['Key · sorted letters', 'Value · original words']}
              entries={[
                ['aet', 'eat, tea'],
                ['abt', 'bat'],
              ]}
            />
            <figcaption>
              {t(
                'The key “aet” leads to one list. Adding “ate” would append it to that same list. ',
              )}
            </figcaption>
          </figure>
        ),
        mapping: (
          <figure className="static-diagram">
            <span className="eyebrow">“egg” → “add”</span>
            <MapTable
              columns={['Forward · s → t', 'Backward · t → s']}
              entries={[
                ['e → a', 'a → e'],
                ['g → d', 'd → g'],
              ]}
            />
            <figcaption>
              {t(
                'The second g → d agrees with both maps. But “ab” → “cc” fails: c is already paired with a when b tries to claim it. ',
              )}
            </figcaption>
          </figure>
        ),
      }}
    />
  )
}
