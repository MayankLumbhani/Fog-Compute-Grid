import { Link } from 'react-router-dom';
import '../styles/landing.css';

function Landing() {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background">
                    <div className="hero-grid"></div>
                    <div className="hero-glow"></div>
                    <div className="hero-nodes">
                        <div className="floating-node"></div>
                        <div className="floating-node"></div>
                        <div className="floating-node"></div>
                        <div className="floating-node"></div>
                        <div className="floating-node"></div>
                        <div className="floating-node"></div>
                    </div>
                </div>

                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        Distributed Computing Platform
                    </div>

                    <h1 className="hero-title">
                        <span className="gradient-text">Fog Compute</span> Grid
                    </h1>

                    <p className="hero-subtitle">
                        Turn idle browsers into a collaborative supercomputer.
                        Harness the power of distributed computing directly from your web browser.
                    </p>

                    <div className="hero-cta">
                        <Link to="/dashboard" className="cta-primary">
                            ⚡ Start Computing
                        </Link>
                        <Link to="/about" className="cta-secondary">
                            Learn More →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="features-container">
                    <div className="section-header">
                        <span className="section-label">Core Features</span>
                        <h2 className="section-title">
                            The Future of Distributed Computing
                        </h2>
                        <p className="section-description">
                            Leverage browser-based fog computing to distribute workloads across a network of connected nodes.
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🌐</div>
                            <h3 className="feature-title">Browser-Based Compute</h3>
                            <p className="feature-description">
                                No downloads required. Transform any modern web browser into a powerful compute node with WebAssembly acceleration.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🔗</div>
                            <h3 className="feature-title">Peer-to-Peer Fog Computing</h3>
                            <p className="feature-description">
                                Direct browser-to-browser connections using WebRTC for low-latency task distribution and result aggregation.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">☁️</div>
                            <h3 className="feature-title">No Cloud Dependency</h3>
                            <p className="feature-description">
                                Operate independently from traditional cloud infrastructure. Your compute grid runs entirely on edge devices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-value">10×</div>
                            <div className="stat-label">Faster with Distributed</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">50ms</div>
                            <div className="stat-label">Average Latency</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">3.2×</div>
                            <div className="stat-label">WASM Speedup</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">99.9%</div>
                            <div className="stat-label">Uptime</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Landing;
