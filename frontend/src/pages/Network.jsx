import NetworkGraph from '../components/NetworkGraph';
import '../styles/network.css';

function Network() {
    return (
        <div className="network-page">
            <div className="network-container">
                <div className="network-header">
                    <h1 className="network-title">Network Topology</h1>
                    <p className="network-subtitle">
                        Visualize the fog computing network with real-time peer-to-peer connections
                        between browser nodes
                    </p>
                </div>

                <div className="network-grid">
                    {/* Network Graph */}
                    <div className="network-graph-section">
                        <div className="graph-header">
                            <h3 className="graph-title">Live Network View</h3>
                            <div className="graph-controls">
                                <button className="graph-control-btn active">All Nodes</button>
                                <button className="graph-control-btn">Active Only</button>
                                <button className="graph-control-btn">My Peers</button>
                            </div>
                        </div>
                        <NetworkGraph />
                    </div>

                    {/* Network Info Panel */}
                    <div className="network-info-panel">
                        {/* Network Stats */}
                        <div className="info-card">
                            <div className="info-card-header">
                                <div className="info-card-icon">📊</div>
                                <h4 className="info-card-title">Network Statistics</h4>
                            </div>
                            <div className="network-stats-grid">
                                <div className="network-stat">
                                    <div className="network-stat-value">8</div>
                                    <div className="network-stat-label">Active Nodes</div>
                                </div>
                                <div className="network-stat">
                                    <div className="network-stat-value">12</div>
                                    <div className="network-stat-label">Connections</div>
                                </div>
                                <div className="network-stat">
                                    <div className="network-stat-value">23ms</div>
                                    <div className="network-stat-label">Avg Latency</div>
                                </div>
                                <div className="network-stat">
                                    <div className="network-stat-value">99.2%</div>
                                    <div className="network-stat-label">Uptime</div>
                                </div>
                            </div>
                        </div>

                        {/* Connection Types */}
                        <div className="info-card">
                            <div className="info-card-header">
                                <div className="info-card-icon">🔗</div>
                                <h4 className="info-card-title">Connection Types</h4>
                            </div>
                            <div className="connection-types">
                                <div className="connection-type-item">
                                    <div className="connection-indicator webrtc"></div>
                                    <div className="connection-info">
                                        <div className="connection-name">WebRTC Data Channels</div>
                                        <div className="connection-desc">Direct peer-to-peer</div>
                                    </div>
                                    <div className="connection-count">8</div>
                                </div>
                                <div className="connection-type-item">
                                    <div className="connection-indicator websocket"></div>
                                    <div className="connection-info">
                                        <div className="connection-name">WebSocket Fallback</div>
                                        <div className="connection-desc">Server-relayed</div>
                                    </div>
                                    <div className="connection-count">4</div>
                                </div>
                            </div>
                        </div>

                        {/* How P2P Works */}
                        <div className="info-card">
                            <div className="info-card-header">
                                <div className="info-card-icon">💡</div>
                                <h4 className="info-card-title">Peer-to-Peer Explained</h4>
                            </div>
                            <p className="info-card-content">
                                Each browser node connects directly to other nodes using WebRTC,
                                enabling low-latency task distribution without requiring all data
                                to pass through a central server.
                            </p>
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="how-it-works">
                    <h2 className="how-it-works-title">How Fog Computing Works</h2>
                    <div className="steps-grid">
                        <div className="step-card">
                            <span className="step-number">1</span>
                            <div className="step-icon">🌐</div>
                            <h4 className="step-title">Node Discovery</h4>
                            <p className="step-description">
                                Browsers connect to the signaling server and discover available
                                peers in the network.
                            </p>
                        </div>
                        <div className="step-card">
                            <span className="step-number">2</span>
                            <div className="step-icon">🤝</div>
                            <h4 className="step-title">Peer Connection</h4>
                            <p className="step-description">
                                WebRTC establishes direct connections between browsers using
                                ICE candidates and SDP exchange.
                            </p>
                        </div>
                        <div className="step-card">
                            <span className="step-number">3</span>
                            <div className="step-icon">📦</div>
                            <h4 className="step-title">Task Distribution</h4>
                            <p className="step-description">
                                Compute tasks are split into chunks and distributed across
                                connected peer nodes.
                            </p>
                        </div>
                        <div className="step-card">
                            <span className="step-number">4</span>
                            <div className="step-icon">⚡</div>
                            <h4 className="step-title">Parallel Processing</h4>
                            <p className="step-description">
                                Each node processes its assigned chunk using JavaScript or
                                WebAssembly engines.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Network;
