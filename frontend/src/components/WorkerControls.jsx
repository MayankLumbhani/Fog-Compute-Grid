import React from 'react';
import { useSocket } from './SocketProvider';
import StatCard from './StatCard';
import ProgressBar from './ProgressBar';

const WorkerControls = () => {
    const {
        isWorkerEnabled,
        toggleWorker,
        workerStatus,
        workerProgress,
        isConnected
    } = useSocket();

    return (
        <div className="worker-controls-container">
            <div className="worker-status-card">
                <StatCard
                    title="Browser Worker Status"
                    value={isWorkerEnabled ? workerStatus : 'DISABLED'}
                    icon="🤖"
                    color={isWorkerEnabled ? (workerStatus === 'BUSY' ? 'amber' : 'emerald') : 'secondary'}
                />
            </div>

            <div className="worker-actions">
                <button
                    className={`worker-btn ${isWorkerEnabled ? 'stop' : 'start'}`}
                    onClick={toggleWorker}
                    disabled={!isConnected && !isWorkerEnabled}
                >
                    {!isConnected ? '⌛ Connecting...' : (isWorkerEnabled ? '⏹ Stop Worker' : '▶ Start Worker')}
                </button>

                {!isConnected && (
                    <p className="worker-error-msg">Waiting for backend connection...</p>
                )}
            </div>

            {isWorkerEnabled && workerStatus === 'BUSY' && (
                <div className="worker-task-progress">
                    <ProgressBar
                        progress={workerProgress}
                        label="Local Task Progress"
                        color="cyan"
                    />
                </div>
            )}

            <style>{`
                .worker-controls-contai
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }
                .worker-actions {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-sm);
                }
                .worker-btn {
                    width: 100%;
                    padding: 12px;
                    border-radius: var(--radius-md);
                    border: none;
                    font-weight: 600;
                    cursor: pointer;
                    transition: var(--transition-base);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .worker-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .worker-btn.start {
                    background: var(--accent-primary);
                    color: white;
                }
                .worker-btn.start:hover:not(:disabled) {
                    filter: brightness(1.1);
                    transform: translateY(-2px);
                }
                .worker-btn.stop {
                    background: rgba(239, 68, 68, 0.2);
                    color: #ef4444;
                    border: 1px solid rgba(239, 68, 68, 0.4);
                }
                .worker-btn.stop:hover {
                    background: rgba(239, 68, 68, 0.3);
                }
                .worker-error-msg {
                    font-size: 0.75rem;
                    color: #ef4444;
                    text-align: center;
                }
                .worker-task-progress {
                    margin-top: var(--spacing-sm);
                    padding: var(--spacing-md);
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: var(--radius-md);
                }
            `}</style>
        </div>
    );
};

export default WorkerControls;
