import React from 'react';
import { useSocket } from './SocketProvider';
import '../styles/dashboard.css';

const WorkerStats = () => {
    const { localPerformance, workerStatus, isConnected } = useSocket();

    return (
        <div className="worker-performance-stats">
            <div className="perf-grid">
                <div className="perf-metric">
                    <span className="perf-label">Last Task</span>
                    <span className="perf-value">{localPerformance.lastTime > 0 ? `${localPerformance.lastTime}ms` : '---'}</span>
                </div>
                <div className="perf-metric">
                    <span className="perf-label">Avg Speed</span>
                    <span className="perf-value">{localPerformance.avgTime > 0 ? `${Math.round(localPerformance.avgTime)}ms` : '---'}</span>
                </div>
                <div className="perf-metric">
                    <span className="perf-label">Tasks Done</span>
                    <span className="perf-value">{localPerformance.count}</span>
                </div>
                <div className="perf-metric">
                    <span className="perf-label">Node Efficiency</span>
                    <span className="perf-value" style={{ color: 'var(--accent-emerald)' }}>
                        {localPerformance.avgTime > 0 ? 'Optimal' : (isConnected ? 'Ready' : 'Offline')}
                    </span>
                </div>
            </div>

            <style>{`
                .worker-performance-stats {
                    margin-top: var(--spacing-md);
                    padding-top: var(--spacing-md);
                    border-top: 1px solid var(--glass-border);
                }
                .perf-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-md);
                }
                .perf-metric {
                    display: flex;
                    flex-direction: column;
                }
                .perf-label {
                    font-size: 0.70rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .perf-value {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    font-family: var(--font-mono);
                }
            `}</style>
        </div>
    );
};

export default WorkerStats;
