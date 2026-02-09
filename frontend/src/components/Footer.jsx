import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <span className="footer-logo-icon">⬡</span>
                            Fog Compute Grid
                        </Link>
                        <p className="footer-tagline">
                            Turn idle browsers into a collaborative supercomputer
                        </p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-section">
                            <h4>Platform</h4>
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/network">Network</Link>
                            <Link to="/analytics">Analytics</Link>
                        </div>
                        <div className="footer-section">
                            <h4>Resources</h4>
                            <Link to="/about">About</Link>
                            <Link to="/about">Documentation</Link>
                            <Link to="/about">Architecture</Link>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2025 Fog Compute Grid. Built for the future of distributed computing.</p>
                    <div className="footer-status">
                        <span className="status-dot"></span>
                        System Operational
                    </div>
                </div>
            </div>

            <style>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--glass-border);
          padding: var(--spacing-3xl) 0 var(--spacing-lg);
          margin-top: auto;
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 var(--spacing-lg);
        }

        .footer-main {
          display: flex;
          justify-content: space-between;
          gap: var(--spacing-3xl);
          padding-bottom: var(--spacing-2xl);
          border-bottom: 1px solid var(--glass-border);
        }

        .footer-brand {
          max-width: 300px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--spacing-md);
        }

        .footer-logo-icon {
          width: 32px;
          height: 32px;
          background: var(--gradient-primary);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .footer-tagline {
          color: var(--text-muted);
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .footer-links {
          display: flex;
          gap: var(--spacing-3xl);
        }

        .footer-section h4 {
          color: var(--text-primary);
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: var(--spacing-md);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-section a {
          display: block;
          color: var(--text-muted);
          font-size: 0.875rem;
          padding: var(--spacing-xs) 0;
          transition: var(--transition-base);
        }

        .footer-section a:hover {
          color: var(--accent-primary);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--spacing-lg);
        }

        .footer-bottom p {
          color: var(--text-muted);
          font-size: 0.8125rem;
        }

        .footer-status {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--accent-emerald);
          font-size: 0.8125rem;
          font-weight: 500;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-emerald);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .footer-main {
            flex-direction: column;
            gap: var(--spacing-2xl);
          }

          .footer-links {
            gap: var(--spacing-2xl);
          }

          .footer-bottom {
            flex-direction: column;
            gap: var(--spacing-md);
            text-align: center;
          }
        }
      `}</style>
        </footer>
    );
}

export default Footer;
