function ProgressBar({ progress = 0, label = '', showPercentage = true, color = 'primary', animated = true }) {
    const colorMap = {
        primary: 'var(--gradient-primary)',
        cyan: 'linear-gradient(90deg, #06b6d4 0%, #22d3ee 100%)',
        emerald: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
        amber: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'
    };

    const barBackground = colorMap[color] || colorMap.primary;

    return (
        <div className="progress-bar-container">
            {(label || showPercentage) && (
                <div className="progress-bar-header">
                    {label && <span className="progress-bar-label">{label}</span>}
                    {showPercentage && <span className="progress-bar-percentage">{progress}%</span>}
                </div>
            )}
            <div className="progress-bar-track">
                <div
                    className={`progress-bar-fill ${animated ? 'animated' : ''}`}
                    style={{
                        width: `${Math.min(Math.max(progress, 0), 100)}%`,
                        background: barBackground
                    }}
                >
                    <div className="progress-bar-glow"></div>
                </div>
            </div>

            <style>{`
        .progress-bar-container {
          width: 100%;
        }

        .progress-bar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }

        .progress-bar-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .progress-bar-percentage {
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 600;
          font-family: var(--font-mono);
        }

        .progress-bar-track {
          height: 12px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-full);
          overflow: hidden;
          position: relative;
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: var(--radius-full);
          position: relative;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .progress-bar-fill.animated {
          animation: progressPulse 2s ease-in-out infinite;
        }

        .progress-bar-glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 30px;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4));
          animation: progressShine 1.5s ease-in-out infinite;
        }

        @keyframes progressPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }

        @keyframes progressShine {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
}

export default ProgressBar;
