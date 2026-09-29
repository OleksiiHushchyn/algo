import { TopicPage } from '@/topics/shared/topic-page'
import { patterns } from './patterns'
import { PairVisualizer } from './pair-visualizer'
import { ContainerDiagram, CycleDiagram } from './diagrams'

export function TwoPointersPage() {
  return (
    <TopicPage
      title="Two pointers"
      number="02"
      category="Move with a reason"
      description="Track two positions. Skip the unnecessary work."
      stamp="⇄"
      stampCaption="two positions"
      clue="Can two positions move without going back? Look for pairs in sorted data, matching ends, keeping items in place, or two sequences to compare. Each move needs a reason."
      patterns={patterns}
      diagrams={{
        pair: <PairVisualizer />,
        container: <ContainerDiagram />,
        'fast-slow': <CycleDiagram />,
      }}
    />
  )
}
