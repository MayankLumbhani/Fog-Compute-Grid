function StatCard({ title, value, icon, trend, color = 'primary' }) {
    const colorMap = {
        primary: 'var(--accent-primary)',
        secondary: 'var(--accent-secondary)',
        cyan: 'var(--accent-cyan)',
        emerald: 'var(--accent-emerald)',
        amber: 'var(--accent-amber)'
    };

    const accentColor = colorMap[color] || colorMap.primary;

    return (
        <div className="stat-card">
            <div className="stat-card-header">
                <span className="stat-card-icon" style={{ background: `${accentColor}20`, color: accentColor }}>
                    {icon}
                </span>
                {trend && (
                    <span className={`stat-card-trend ${trend > 0 ? 'positive' : 'negative'}`}>
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </span>
                )}
            </div>
            <div className="stat-card-value" style={{ color: accentColor }}>
                {value}
            </div>
            <div className="stat-card-title">{title}</div>

            <style>{`
        .stat-card {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          transition: var(--transition-base);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: ${accentColor};
          opacity: 0.8;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: ${accentColor}40;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        }

        .stat-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-md);
        }

        .stat-card-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .stat-card-trend {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
        }

        .stat-card-trend.positive {
          background: rgba(16, 185, 129, 0.15);
          color: var(--accent-emerald);
        }

        .stat-card-trend.negative {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
        }

        .stat-card-value {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: var(--spacing-xs);
          letter-spacing: -0.02em;
        }

        .stat-card-title {
          font-size: 0.875rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>
        </div>
    );
}

export default StatCard;
