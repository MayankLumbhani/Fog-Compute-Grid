import { useState } from 'react';

function NetworkGraph({ activeWorkers = 0, leaderboard = [] }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Static node layout
  const nodeLayout = [
    { id: 1, x: 50, y: 50, label: 'Central Hub' },
    { id: 2, x: 80, y: 30, label: 'Node Beta' },
    { id: 3, x: 20, y: 35, label: 'Node Gamma' },
    { id: 4, x: 35, y: 70, label: 'Node Delta' },
    { id: 5, x: 70, y: 75, label: 'Node Epsilon' },
    { id: 6, x: 15, y: 65, label: 'Node Zeta' },
    { id: 7, x: 85, y: 55, label: 'Node Eta' },
    { id: 8, x: 50, y: 20, label: 'Node Theta' },
  ];

  // Map activeWorkers to node statuses. 
  // If activeWorkers > 0, at least the hub is active.
  // We'll activate nodes based on the count.
  const nodes = nodeLayout.map((node, index) => {
    const isWorkerActive = index < activeWorkers;
    const leaderboardData = isWorkerActive ? leaderboard[index] : null;

    let healthStatus = 'idle';
    if (isWorkerActive) {
      if (leaderboardData) {
        if (leaderboardData.stability > 90) healthStatus = 'healthy';
        else if (leaderboardData.stability > 70) healthStatus = 'unstable';
        else healthStatus = 'recovering';
      } else {
        healthStatus = 'scanning'; // Active but transitionary or not in top stats yet
      }
    }

    return {
      ...node,
      status: isWorkerActive ? 'active' : 'idle',
      health: healthStatus,
      tasks: leaderboardData ? leaderboardData.completed : (isWorkerActive ? Math.floor(Math.random() * 20) + 1 : 0),
      stability: leaderboardData ? leaderboardData.stability : 100
    };
  });

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
                className={`node-core ${node.status} ${node.health} ${hoveredNode === node.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              />
              {/* Pulse effect for scanning/active nodes */}
              {node.status === 'active' && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="2.5"
                  className={`node-pulse ${node.health === 'scanning' ? 'scanning' : ''}`}
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
                  <span>Status: {node.status === 'active' ? node.health : 'Idle'}</span>
                  <span>Tasks: {node.tasks}</span>
                  {node.status === 'active' && <span>Stability: {Math.round(node.stability)}%</span>}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Legend */}
      <div className="network-legend">
        <div className="legend-item">
          <span className="legend-dot scanning"></span>
          Scanning
        </div>
        <div className="legend-item">
          <span className="legend-dot healthy"></span>
          Healthy
        </div>
        <div className="legend-item">
          <span className="legend-dot unstable"></span>
          Unstable Node
        </div>
        <div className="legend-item">
          <span className="legend-dot recovering"></span>
          Recovering
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

        .node-core.healthy {
          fill: var(--accent-emerald);
          filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.4));
        }

        .node-core.scanning {
          fill: var(--accent-cyan);
          filter: drop-shadow(0 0 4px rgba(6, 182, 212, 0.4));
        }
        
        .node-core.unstable {
          fill: var(--accent-amber);
          filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.4));
        }

        .node-core.recovering {
          fill: #ef4444;
          filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.4));
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

        .node-pulse.scanning {
          stroke: var(--accent-cyan);
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

        .legend-dot.scanning {
          background: var(--accent-cyan);
        }

        .legend-dot.healthy {
          background: var(--accent-emerald);
        }

        .legend-dot.unstable {
          background: var(--accent-amber);
        }

        .legend-dot.recovering {
          background: #ef4444;
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
