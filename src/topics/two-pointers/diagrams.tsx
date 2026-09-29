export function ContainerDiagram() {
  return (
    <figure className="static-diagram">
      <span className="eyebrow">A tiny example</span>
      <svg
        className="lesson-svg"
        viewBox="0 0 360 150"
        role="img"
        aria-label="Walls of heights 2, 7, 3, 6, 4. The first and last hold area 8; the walls at indices 1 and 4 hold area 12."
      >
        <rect x="92" y="74" width="204" height="52" fill="#e6def4" />
        {[2, 7, 3, 6, 4].map((height, index) => (
          <g key={index}>
            <rect
              x={20 + index * 68}
              y={126 - height * 13}
              width="12"
              height={height * 13}
              rx="3"
              fill={index === 1 || index === 4 ? '#8770b3' : '#c9c0d6'}
            />
            <text
              x={26 + index * 68}
              y={117 - height * 13}
              textAnchor="middle"
              fill="#67547b"
              fontSize="12"
            >
              {height}
            </text>
            <text
              x={26 + index * 68}
              y="145"
              textAnchor="middle"
              fill="#797080"
              fontSize="10"
            >
              {index}
            </text>
          </g>
        ))}
        <text x="194" y="95" textAnchor="middle" fill="#67547b" fontSize="12">
          3 × 4 = 12
        </text>
      </svg>
      <figcaption>
        Start at the ends: 4 × min(2, 4) = 8. Move the short left wall. Now 3 ×
        min(7, 4) = 12. Keep checking: the best area here is 12.
      </figcaption>
    </figure>
  )
}

export function CycleDiagram() {
  return (
    <figure className="static-diagram">
      <span className="eyebrow">A tiny example</span>
      <svg
        className="lesson-svg"
        viewBox="0 0 360 140"
        role="img"
        aria-label="A points to B, B to C, C to D, and D loops back to B. Slow and fast meet at D after three moves."
      >
        <defs>
          <marker
            id="cycle-arrow"
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6" fill="#9680b5" />
          </marker>
        </defs>
        {[0, 1, 2].map((index) => (
          <path
            key={index}
            d={`M ${60 + index * 85} 43 H ${104 + index * 85}`}
            fill="none"
            stroke="#9680b5"
            strokeWidth="2"
            markerEnd="url(#cycle-arrow)"
          />
        ))}
        <path
          d="M 300 60 V 100 H 130 V 66"
          fill="none"
          stroke="#9680b5"
          strokeWidth="2"
          markerEnd="url(#cycle-arrow)"
        />
        {['A', 'B', 'C', 'D'].map((name, index) => (
          <g key={name}>
            <circle
              cx={45 + index * 85}
              cy="43"
              r="20"
              fill={name === 'D' ? '#8770b3' : '#eee8f7'}
              stroke="#bba9d3"
            />
            <text
              x={45 + index * 85}
              y="47"
              textAnchor="middle"
              fontSize="13"
              fill={name === 'D' ? 'white' : '#67547b'}
            >
              {name}
            </text>
          </g>
        ))}
        <text x="45" y="12" textAnchor="middle" fontSize="10" fill="#797080">
          head
        </text>
        <text x="211" y="121" textAnchor="middle" fontSize="11" fill="#797080">
          D points back to B
        </text>
      </svg>
      <figcaption>
        After each move, (slow, fast) is (B, C) → (C, B) → (D, D). Same node: a
        cycle exists.
      </figcaption>
    </figure>
  )
}
