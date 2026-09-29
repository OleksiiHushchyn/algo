import { TopicPage } from '@/topics/shared/topic-page'
import { patterns } from './patterns'
import { WindowVisualizer } from './window-visualizer'

export function SlidingWindowPage() {
  return (
    <TopicPage
      title="Sliding window"
      number="03"
      category="Reuse the work"
      description="Keep a stretch. Move its edges. Reuse what you know."
      stamp="▭"
      stampCaption="one stretch"
      clue="Look for a continuous stretch—no gaps—with a size, sum, or frequency rule. Both pointers move forward, tracking everything between them. The array does not need to be sorted."
      patterns={patterns}
      diagrams={{
        fixed: <WindowVisualizer mode="fixed" />,
        unique: <WindowVisualizer mode="unique" />,
      }}
    />
  )
}
