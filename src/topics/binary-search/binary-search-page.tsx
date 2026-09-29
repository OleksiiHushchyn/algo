import { TopicPage } from '@/topics/shared/topic-page'
import { patterns } from './patterns'
import { SearchVisualizer } from './search-visualizer'

export function BinarySearchPage() {
  return (
    <TopicPage
      title="Binary search"
      number="01"
      category="Divide & conquer"
      description="Don’t check everything. Rule out half."
      stamp="½"
      stampCaption="less, each step"
      clue="Can one check rule out half the possibilities? Think sorted values, a no → yes boundary, or a direction guaranteed to contain an answer."
      patterns={patterns}
      diagrams={{ exact: <SearchVisualizer /> }}
    />
  )
}
