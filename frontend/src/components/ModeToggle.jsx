import { useState } from 'react';

function ModeToggle({ defaultMode = 'centralized', onModeChange }) {
    const [mode, setMode] = useState(defaultMode);

    const handleToggle = (newMode) => {
        setMode(newMode);
        if (onModeChange) onModeChange(newMode);
    };

    return (
        <div className="mode-toggle-container">
            <span className="mode-toggle-label">Compute Mode</span>
            <div className="mode-toggle">
                <button
                    className={`mode-toggle-option ${mode === 'centralized' ? 'active' : ''}`}
                    onClick={() => handleToggle('centralized')}
                >
                    <span className="mode-icon">🖥️</span>
                    Centralized
                </button>
                <button
                    className={`mode-toggle-option ${mode === 'p2p' ? 'active' : ''}`}
                    onClick={() => handleToggle('p2p')}
                >
                    <span className="mode-icon">🔗</span>
                    P2P
                </button>
                <div
                    className="mode-toggle-slider"
                    style={{ transform: mode === 'p2p' ? 'translateX(100%)' : 'translateX(0)' }}
                ></div>
            </div>

            <style>{`
        .mode-toggle-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .mode-toggle-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .mode-toggle {
          display: flex;
          position: relative;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          padding: 4px;
          width: fit-content;
        }

        .mode-toggle-option {
          position: relative;
          z-index: 2;
          padding: var(--spacing-sm) var(--spacing-lg);
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          transition: var(--transition-base);
          min-width: 130px;
          justify-content: center;
        }

        .mode-toggle-option:hover {
          color: var(--text-secondary);
        }

        .mode-toggle-option.active {
          color: var(--text-primary);
        }

        .mode-icon {
          font-size: 1rem;
        }

        .mode-toggle-slider {
          position: absolute;
          top: 4px;
          left: 4px;
          width: calc(50% - 4px);
          height: calc(100% - 8px);
          background: var(--gradient-primary);
          border-radius: var(--radius-sm);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
        }
      `}</style>
        </div>
    );
}

export default ModeToggle;
