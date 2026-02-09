import { Link } from 'react-router-dom';

function About() {
    return (
        <div className="about-page">
            <div className="about-container">
                {/* Hero Section */}
                <div className="about-header">
                    <h1 className="about-title">About <span className="gradient-text">Fog Compute Grid</span></h1>
                    <p className="about-subtitle">
                        A next-generation distributed computing platform that transforms web browsers
                        into a collaborative supercomputer
                    </p>
                </div>

                {/* How It Works */}
                <section className="about-section">
                    <div className="section-header">
                        <span className="section-label">Overview</span>
                        <h2 className="section-title">How It Works</h2>
                    </div>

                    <div className="architecture-diagram">
                        <div className="arch-layer">
                            <div className="arch-box client">
                                <div className="arch-icon">🌐</div>
                                <h4>Browser Clients</h4>
                                <p>Worker nodes running in web browsers</p>
                            </div>
                            <div className="arch-arrow">↓↑</div>
                            <div className="arch-box server">
                                <div className="arch-icon">🖥️</div>
                                <h4>Coordination Server</h4>
                                <p>Task distribution and result aggregation</p>
                            </div>
                        </div>
                        <div className="arch-features">
                            <div className="arch-feature">
                                <span className="feature-badge">WebSocket</span>
                                <span>Real-time communication</span>
                            </div>
                            <div className="arch-feature">
                                <span className="feature-badge">WebRTC</span>
                                <span>Peer-to-peer data channels</span>
                            </div>
                            <div className="arch-feature">
                                <span className="feature-badge">WASM</span>
                                <span>High-performance compute</span>
                            </div>
                        </div>
                    </div>

                    <div className="process-flow">
                        <div className="process-step">
                            <div className="step-circle">1</div>
                            <h4>Task Submission</h4>
                            <p>A compute task is submitted to the coordination server</p>
                        </div>
                        <div className="process-connector"></div>
                        <div className="process-step">
                            <div className="step-circle">2</div>
                            <h4>Task Splitting</h4>
                            <p>The task is divided into smaller chunks for parallel processing</p>
                        </div>
                        <div className="process-connector"></div>
                        <div className="process-step">
                            <div className="step-circle">3</div>
                            <h4>Distribution</h4>
                            <p>Chunks are distributed to available browser workers</p>
                        </div>
                        <div className="process-connector"></div>
                        <div className="process-step">
                            <div className="step-circle">4</div>
                            <h4>Aggregation</h4>
                            <p>Results are collected and combined into the final output</p>
                        </div>
                    </div>
                </section>

                {/* Phases Section */}
                <section className="about-section">
                    <div className="section-header">
                        <span className="section-label">Development</span>
                        <h2 className="section-title">Project Phases</h2>
                    </div>

                    <div className="phases-grid">
                        <div className="phase-card current">
                            <div className="phase-badge">Current</div>
                            <h3>Phase 1: Centralized Model</h3>
                            <p className="phase-desc">
                                Server-coordinated distributed computing with WebSocket communication
                            </p>
                            <ul className="phase-features">
                                <li>✓ Central Node.js + Express server</li>
                                <li>✓ Socket.io for real-time messaging</li>
                                <li>✓ Dynamic task chunking</li>
                                <li>✓ JavaScript compute engine</li>
                                <li>✓ Worker health monitoring</li>
                                <li>✓ Basic failure recovery</li>
                            </ul>
                        </div>

                        <div className="phase-card">
                            <div className="phase-badge upcoming">Upcoming</div>
                            <h3>Phase 2: Decentralized P2P</h3>
                            <p className="phase-desc">
                                True peer-to-peer fog computing with WebRTC and WebAssembly
                            </p>
                            <ul className="phase-features">
                                <li>○ WebRTC data channels</li>
                                <li>○ Browser-to-browser messaging</li>
                                <li>○ WebAssembly compute engine</li>
                                <li>○ AI-powered task scheduling</li>
                                <li>○ Advanced load balancing</li>
                                <li>○ Result verification</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Future Scope */}
                <section className="about-section">
                    <div className="section-header">
                        <span className="section-label">Roadmap</span>
                        <h2 className="section-title">Future Scope</h2>
                    </div>

                    <div className="roadmap-grid">
                        <div className="roadmap-card">
                            <div className="roadmap-icon">🤖</div>
                            <h4>AI Scheduler</h4>
                            <p>Machine learning-based task distribution that optimizes for device capabilities and network topology</p>
                        </div>
                        <div className="roadmap-card">
                            <div className="roadmap-icon">⚡</div>
                            <h4>WebAssembly Engine</h4>
                            <p>High-performance compute engine using compiled WASM modules for 3-10x performance gains</p>
                        </div>
                        <div className="roadmap-card">
                            <div className="roadmap-icon">🔗</div>
                            <h4>Full P2P Mesh</h4>
                            <p>Complete decentralization with browser-to-browser communication eliminating server bottlenecks</p>
                        </div>
                        <div className="roadmap-card">
                            <div className="roadmap-icon">🌍</div>
                            <h4>Global Scale</h4>
                            <p>Geographic-aware routing and edge caching for worldwide deployment</p>
                        </div>
                        <div className="roadmap-card">
                            <div className="roadmap-icon">🔐</div>
                            <h4>Secure Enclaves</h4>
                            <p>Isolated execution environments for sensitive computations</p>
                        </div>
                        <div className="roadmap-card">
                            <div className="roadmap-icon">📊</div>
                            <h4>Advanced Analytics</h4>
                            <p>Real-time performance monitoring and predictive scaling</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="about-cta">
                    <h2>Ready to Contribute Computing Power?</h2>
                    <p>Join the network and help solve complex problems using distributed computing</p>
                    <Link to="/dashboard" className="cta-button">
                        ⚡ Start Computing
                    </Link>
                </section>
            </div>

            <style>{`
        .about-page {
          padding: var(--spacing-2xl) var(--spacing-lg);
          min-height: calc(100vh - 80px);
        }

        .about-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .about-header {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
        }

        .about-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          margin-bottom: var(--spacing-md);
        }

        .about-subtitle {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .about-section {
          margin-bottom: var(--spacing-3xl);
        }

        .section-header {
          margin-bottom: var(--spacing-xl);
        }

        .section-label {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-primary);
          margin-bottom: var(--spacing-sm);
        }

        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
        }

        /* Architecture Diagram */
        .architecture-diagram {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: var(--spacing-xl);
          margin-bottom: var(--spacing-xl);
        }

        .arch-layer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-xl);
        }

        .arch-box {
          background: var(--bg-tertiary);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          text-align: center;
          width: 100%;
          max-width: 300px;
          border: 1px solid var(--glass-border);
        }

        .arch-box.client {
          border-color: var(--accent-primary);
        }

        .arch-box.server {
          border-color: var(--accent-emerald);
        }

        .arch-icon {
          font-size: 2rem;
          margin-bottom: var(--spacing-sm);
        }

        .arch-box h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: var(--spacing-xs);
        }

        .arch-box p {
          font-size: 0.8125rem;
          color: var(--text-muted);
        }

        .arch-arrow {
          font-size: 1.5rem;
          color: var(--accent-primary);
        }

        .arch-features {
          display: flex;
          justify-content: center;
          gap: var(--spacing-xl);
          flex-wrap: wrap;
        }

        .arch-feature {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .feature-badge {
          padding: 4px 10px;
          background: rgba(99, 102, 241, 0.15);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-primary);
        }

        /* Process Flow */
        .process-flow {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: var(--spacing-md);
          flex-wrap: wrap;
        }

        .process-step {
          flex: 1;
          min-width: 180px;
          max-width: 220px;
          text-align: center;
        }

        .step-circle {
          width: 40px;
          height: 40px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 700;
          margin: 0 auto var(--spacing-md);
        }

        .process-step h4 {
          font-size: 0.9375rem;
          font-weight: 600;
          margin-bottom: var(--spacing-xs);
        }

        .process-step p {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .process-connector {
          width: 40px;
          height: 2px;
          background: var(--accent-primary);
          margin-top: 20px;
          opacity: 0.3;
        }

        @media (max-width: 768px) {
          .process-connector {
            display: none;
          }
        }

        /* Phases */
        .phases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--spacing-xl);
        }

        .phase-card {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: var(--spacing-xl);
          position: relative;
        }

        .phase-card.current {
          border-color: var(--accent-primary);
        }

        .phase-badge {
          position: absolute;
          top: var(--spacing-md);
          right: var(--spacing-md);
          padding: 4px 12px;
          background: var(--accent-primary);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
        }

        .phase-badge.upcoming {
          background: var(--text-muted);
        }

        .phase-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: var(--spacing-sm);
          padding-right: 80px;
        }

        .phase-desc {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: var(--spacing-lg);
          line-height: 1.6;
        }

        .phase-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .phase-features li {
          font-size: 0.875rem;
          color: var(--text-secondary);
          padding-left: var(--spacing-sm);
        }

        /* Roadmap */
        .roadmap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-lg);
        }

        .roadmap-card {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: var(--spacing-lg);
          transition: var(--transition-base);
        }

        .roadmap-card:hover {
          transform: translateY(-4px);
          border-color: rgba(99, 102, 241, 0.3);
        }

        .roadmap-icon {
          font-size: 2rem;
          margin-bottom: var(--spacing-md);
        }

        .roadmap-card h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: var(--spacing-sm);
        }

        .roadmap-card p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* CTA Section */
        .about-cta {
          text-align: center;
          padding: var(--spacing-3xl);
          background: var(--gradient-glow);
          border-radius: var(--radius-xl);
          border: 1px solid var(--glass-border);
        }

        .about-cta h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: var(--spacing-sm);
        }

        .about-cta p {
          color: var(--text-secondary);
          margin-bottom: var(--spacing-xl);
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md) var(--spacing-2xl);
          background: var(--gradient-primary);
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-weight: 600;
          color: white;
          transition: var(--transition-base);
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
        }
      `}</style>
        </div>
    );
}

export default About;
