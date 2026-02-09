import { useState } from 'react';

function NetworkGraph() {
    const [hoveredNode, setHoveredNode] = useState(null);

    // Static node data for visualization
    const nodes = [
        { id: 1, x: 50, y: 50, status: 'active', label: 'Node Alpha', tasks: 12 },
        { id: 2, x: 80, y: 30, status: 'active', label: 'Node Beta', tasks: 8 },
        { id: 3, x: 20, y: 35, status: 'active', label: 'Node Gamma', tasks: 15 },
        { id: 4, x: 35, y: 70, status: 'idle', label: 'Node Delta', tasks: 3 },
        { id: 5, x: 70, y: 75, status: 'active', label: 'Node Epsilon', tasks: 9 },
        { id: 6, x: 15, y: 65, status: 'idle', label: 'Node Zeta', tasks: 2 },
        { id: 7, x: 85, y: 55, status: 'active', label: 'Node Eta', tasks: 11 },
        { id: 8, x: 50, y: 20, status: 'active', label: 'Node Theta', tasks: 7 },
    ];

    // Connections between nodes
    const connections = [
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 7], [2, 8], [3, 4], [3, 6],
        [4, 5], [5, 7], [6, 4], [8, 2]
    ];

    return (
        <div className="network-graph">
            <svg viewBox="0 0 100 100" className="network-svg">
                {/* Connections */}
                <g className="connections">
                    {connections.map(([from, to], index) => {
                        const fromNode = nodes.find(n => n.id === from);
                        const toNode = nodes.find(n => n.id === to);
                        const isHighlighted = hoveredNode === from || hoveredNode === to;

                        return (
                            <line
                                key={index}
                                x1={fromNode.x}
                                y1={fromNode.y}
                                x2={toNode.x}
                                y2={toNode.y}
                                className={`connection-line ${isHighlighted ? 'highlighted' : ''}`}
                            />
                        );
                    })}
                </g>

                {/* Nodes */}
                <g className="nodes">
                    {nodes.map((node) => (
                        <g key={node.id} className="node-group">
                            {/* Node glow */}
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r="4"
                                className={`node-glow ${node.status}`}
                            />
                            {/* Node core */}
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r="2.5"
                                className={`node-core ${node.status} ${hoveredNode === node.id ? 'hovered' : ''}`}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                            />
                            {/* Pulse effect for active nodes */}
                            {node.status === 'active' && (
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r="2.5"
                                    className="node-pulse"
                                />
                            )}
                        </g>
                    ))}
                </g>
            </svg>

            {/* Node info tooltip */}
            {hoveredNode && (
                <div className="node-tooltip">
                    {(() => {
                        const node = nodes.find(n => n.id === hoveredNode);
                        return (
                            <>
                                <div className="tooltip-header">
                                    <span className={`tooltip-status ${node.status}`}></span>
                                    {node.label}
                                </div>
                                <div className="tooltip-stats">
                                    <span>Status: {node.status}</span>
                                    <span>Tasks: {node.tasks}</span>
                                </div>
                            </>
                        );
                    })()}
                </div>
            )}

            {/* Legend */}
            <div className="network-legend">
                <div className="legend-item">
                    <span className="legend-dot active"></span>
                    Active Node
                </div>
                <div className="legend-item">
                    <span className="legend-dot idle"></span>
                    Idle Node
                </div>
                <div className="legend-item">
                    <span className="legend-line"></span>
                    P2P Connection
                </div>
            </div>

            <style>{`
        .network-graph {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          background: var(--bg-tertiary);
          border-radius: var(--radius-xl);
          overflow: hidden;
          border: 1px solid var(--glass-border);
        }

        .network-svg {
          width: 100%;
          height: 100%;
        }

        .connection-line {
          stroke: var(--accent-primary);
          stroke-width: 0.3;
          stroke-opacity: 0.3;
          transition: all 0.3s ease;
        }

        .connection-line.highlighted {
          stroke-opacity: 0.8;
          stroke-width: 0.5;
        }

        .node-glow {
          fill: transparent;
          transition: all 0.3s ease;
        }

        .node-glow.active {
          fill: rgba(99, 102, 241, 0.2);
        }

        .node-glow.idle {
          fill: rgba(100, 116, 139, 0.15);
        }

        .node-core {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .node-core.active {
          fill: var(--accent-primary);
        }

        .node-core.idle {
          fill: var(--text-muted);
        }

        .node-core.hovered {
          r: 3.5;
          filter: drop-shadow(0 0 6px var(--accent-primary));
        }

        .node-pulse {
          fill: transparent;
          stroke: var(--accent-primary);
          stroke-width: 0.3;
          animation: nodePulse 2s ease-out infinite;
        }

        @keyframes nodePulse {
          0% {
            r: 2.5;
            stroke-opacity: 0.8;
          }
          100% {
            r: 6;
            stroke-opacity: 0;
          }
        }

        .node-tooltip {
          position: absolute;
          top: var(--spacing-lg);
          right: var(--spacing-lg);
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          min-width: 160px;
          animation: fadeIn 0.2s ease;
        }

        .tooltip-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--spacing-sm);
        }

        .tooltip-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .tooltip-status.active {
          background: var(--accent-emerald);
          box-shadow: 0 0 8px var(--accent-emerald);
        }

        .tooltip-status.idle {
          background: var(--text-muted);
        }

        .tooltip-stats {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }

        .network-legend {
          position: absolute;
          bottom: var(--spacing-lg);
          left: var(--spacing-lg);
          display: flex;
          gap: var(--spacing-lg);
          padding: var(--spacing-sm) var(--spacing-md);
          background: rgba(0, 0, 0, 0.4);
          border-radius: var(--radius-md);
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .legend-dot.active {
          background: var(--accent-primary);
        }

        .legend-dot.idle {
          background: var(--text-muted);
        }

        .legend-line {
          width: 20px;
          height: 2px;
          background: var(--accent-primary);
          opacity: 0.5;
        }
      `}</style>
        </div>
    );
}

export default NetworkGraph;
